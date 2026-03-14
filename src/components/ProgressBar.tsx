import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  limit: number;
  icon: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, limit, icon }) => {
  const percent = Math.min(100, (value / limit) * 100);
  
  const getColor = () => {
    if (percent > 90) return 'bg-red-500';
    if (percent > 70) return 'bg-orange-500';
    if (percent > 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <div className="text-right">
          <span className={`font-bold ${percent > 90 ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
            {value.toLocaleString('ru-RU')} ₽
          </span>
          <span className="text-gray-400 text-sm"> / {limit.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-right mt-1 text-xs text-gray-500">
        Осталось: {Math.max(0, limit - value).toLocaleString('ru-RU')} ₽
      </div>
    </div>
  );
};
