import { Employee } from '../types/employee';
import { ChevronDown, ChevronRight, Mail, Users } from 'lucide-react';
import { cn } from '../utils/cn';

interface EmployeeNodeProps {
  employee: Employee;
  isRoot?: boolean;
  searchQuery: string;
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
  highlightedPath: string[];
}

const departmentColors: Record<string, string> = {
  Executive: 'bg-purple-500',
  Technology: 'bg-blue-500',
  Engineering: 'bg-cyan-500',
  Product: 'bg-indigo-500',
  Finance: 'bg-emerald-500',
  Marketing: 'bg-pink-500',
  Sales: 'bg-orange-500',
  'Human Resources': 'bg-amber-500',
};

export function EmployeeNode({
  employee,
  isRoot = false,
  searchQuery,
  expandedNodes,
  toggleNode,
  highlightedPath,
}: EmployeeNodeProps) {
  const hasChildren = employee.children && employee.children.length > 0;
  const isExpanded = expandedNodes.has(employee.id);
  const isHighlighted = highlightedPath.includes(employee.id);
  const isSearchMatch =
    searchQuery &&
    (employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()));

  const avatarColor = departmentColors[employee.department] || 'bg-gray-500';

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 text-gray-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Employee Card */}
      <div
        className={cn(
          'relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 w-64',
          isHighlighted && 'ring-4 ring-blue-400 ring-opacity-50',
          isSearchMatch && 'ring-4 ring-yellow-400 ring-opacity-75 scale-105',
          isRoot ? 'border-purple-300' : 'border-gray-200',
          'hover:shadow-xl hover:scale-[1.02]'
        )}
      >
        {/* Department Badge */}
        <div
          className={cn(
            'absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium text-white shadow-md',
            avatarColor
          )}
        >
          {employee.department}
        </div>

        <div className="p-4 pt-5">
          {/* Avatar and Info */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md',
                avatarColor
              )}
            >
              {employee.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {highlightText(employee.name)}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {highlightText(employee.title)}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Mail className="w-3 h-3" />
            <span className="truncate">{employee.email}</span>
          </div>

          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={() => toggleNode(employee.id)}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors',
                isExpanded
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              )}
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Hide Reports
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <Users className="w-4 h-4" />
                  {employee.children?.length} Direct Report
                  {employee.children && employee.children.length > 1 ? 's' : ''}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative mt-8">
          {/* Vertical line from parent */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400" />

          {/* Horizontal line connecting children */}
          {employee.children && employee.children.length > 1 && (
            <div
              className="absolute top-0 h-0.5 bg-gray-300"
              style={{
                left: `calc(50% / ${employee.children.length})`,
                right: `calc(50% / ${employee.children.length})`,
              }}
            />
          )}

          {/* Children nodes */}
          <div className="flex gap-8">
            {employee.children?.map((child) => (
              <div key={child.id} className="relative">
                {/* Vertical line to child */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0 w-0.5 h-8 bg-gray-300" />
                <div className="pt-8">
                  <EmployeeNode
                    employee={child}
                    searchQuery={searchQuery}
                    expandedNodes={expandedNodes}
                    toggleNode={toggleNode}
                    highlightedPath={highlightedPath}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
