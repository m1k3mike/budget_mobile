import React from 'react';

interface InputFieldProps {
  label: string;
  value: number;
  dataKey: string;
  onChange: (key: string, value: number) => void;
  icon?: string;
  checked?: boolean;
  onCheck?: (key: string, checked: boolean) => void;
  hint?: string;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  dataKey,
  onChange,
  icon,
  checked,
  onCheck,
  hint,
  disabled = false,
}) => {
  return (
    <div className={`flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all ${disabled ? 'opacity-50' : ''}`}>
      {onCheck !== undefined && (
        <input
          type="checkbox"
          checked={checked || false}
          onChange={(e) => onCheck(dataKey, e.target.checked)}
          className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer"
        />
      )}
      {icon && <span className="text-xl">{icon}</span>}
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
          {label}
        </label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          value={value || ''}
          onChange={(e) => onChange(dataKey, parseFloat(e.target.value) || 0)}
          disabled={disabled}
          placeholder="0"
          className={`w-28 px-3 py-2 text-right font-semibold bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${checked ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">₽</span>
      </div>
    </div>
  );
};
