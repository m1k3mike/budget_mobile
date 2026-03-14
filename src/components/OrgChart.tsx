import { useState, useCallback } from 'react';
import { Employee } from '../types/employee';
import { EmployeeNode } from './EmployeeNode';
import { SearchBar } from './SearchBar';
import { orgData, getAllEmployees, findEmployeePath } from '../data/orgData';
import { ZoomIn, ZoomOut, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';

export function OrgChart() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1']));
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const allEmployees = getAllEmployees(orgData);

  const toggleNode = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const expandAll = useCallback(() => {
    const allIds = allEmployees.map((emp) => emp.id);
    setExpandedNodes(new Set(allIds));
  }, [allEmployees]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set(['1']));
  }, []);

  const handleSelectEmployee = useCallback((employee: Employee) => {
    // Find path to employee and expand all nodes along the path
    const path = findEmployeePath(orgData, employee.id);
    if (path) {
      setHighlightedPath(path);
      setExpandedNodes((prev) => {
        const newSet = new Set(prev);
        path.forEach((id) => newSet.add(id));
        return newSet;
      });
      setSearchQuery(employee.name);

      // Clear highlight after 3 seconds
      setTimeout(() => {
        setHighlightedPath([]);
      }, 3000);
    }
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.3));
  const handleResetZoom = () => {
    setZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanPosition({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((prev) => Math.min(Math.max(prev + delta, 0.3), 2));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Organization Chart
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {allEmployees.length} employees across the organization
              </p>
            </div>
            <SearchBar
              employees={allEmployees}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectEmployee={handleSelectEmployee}
            />
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-[88px] z-40 flex justify-center py-3">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-2">
          <button
            onClick={expandAll}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            Collapse All
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-600 min-w-[4rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ minHeight: 'calc(100vh - 180px)' }}
      >
        <div
          className="flex justify-center py-12 px-8 transition-transform duration-100"
          style={{
            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoom})`,
            transformOrigin: 'top center',
          }}
        >
          <EmployeeNode
            employee={orgData}
            isRoot
            searchQuery={searchQuery}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
            highlightedPath={highlightedPath}
          />
        </div>
      </div>

      {/* Footer Hint */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-4 py-2 text-sm text-gray-500">
        💡 Drag to pan • Ctrl+Scroll to zoom • Click nodes to expand/collapse
      </div>
    </div>
  );
}
