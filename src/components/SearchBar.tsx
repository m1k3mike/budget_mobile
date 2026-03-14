import { useState, useRef, useEffect } from 'react';
import { Search, X, User, Briefcase, Building } from 'lucide-react';
import { Employee } from '../types/employee';
import { cn } from '../utils/cn';

interface SearchBarProps {
  employees: Employee[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectEmployee: (employee: Employee) => void;
}

export function SearchBar({
  employees,
  searchQuery,
  setSearchQuery,
  onSelectEmployee,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredEmployees = searchQuery
    ? employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const showDropdown = isFocused && searchQuery && filteredEmployees.length > 0;

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredEmployees.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredEmployees[selectedIndex]) {
        onSelectEmployee(filteredEmployees[selectedIndex]);
        setIsFocused(false);
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div
        className={cn(
          'relative flex items-center bg-white rounded-xl shadow-lg border-2 transition-all duration-200',
          isFocused ? 'border-blue-400 shadow-blue-100' : 'border-gray-200'
        )}
      >
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search employees by name, title, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          className="w-full py-3 pl-12 pr-10 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50"
        >
          {filteredEmployees.map((emp, index) => (
            <button
              key={emp.id}
              onClick={() => {
                onSelectEmployee(emp);
                setIsFocused(false);
              }}
              className={cn(
                'w-full flex items-start gap-3 p-3 text-left transition-colors',
                index === selectedIndex
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50',
                index !== filteredEmployees.length - 1 && 'border-b border-gray-100'
              )}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {emp.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-gray-400" />
                  <span className="font-medium text-gray-900 truncate">
                    {emp.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-500 truncate">
                    {emp.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Building className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{emp.department}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isFocused && searchQuery && filteredEmployees.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-6 text-center z-50">
          <div className="text-gray-400 mb-2">
            <Search className="w-8 h-8 mx-auto opacity-50" />
          </div>
          <p className="text-gray-500">No employees found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try searching with a different term
          </p>
        </div>
      )}
    </div>
  );
}
