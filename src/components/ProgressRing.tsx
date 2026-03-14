import React from 'react';

interface ProgressRingProps {
  percent: number;
  balance: number;
  daily: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ percent, balance, daily }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * Math.min(100, percent) / 100);
  
  const getColor = () => {
    if (percent < 10) return '#ef4444';
    if (percent < 20) return '#f97316';
    if (percent < 40) return '#eab308';
    return '#22c55e';
  };

  const color = getColor();

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="200" height="200" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {Math.round(percent)}%
        </span>
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {Math.round(balance).toLocaleString('ru-RU')} ₽
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(daily).toLocaleString('ru-RU')} ₽/день
        </span>
      </div>
    </div>
  );
};
