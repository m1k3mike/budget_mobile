import React from 'react';
import { Calculations } from '../types/budget';

interface SummaryCardProps {
  calculations: Calculations;
  income: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ calculations, income }) => {
  const { savings, totalExpenses, balance, budgetAfterSavings } = calculations;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
        <div className="text-sm opacity-80">💰 Доход</div>
        <div className="text-xl font-bold">{income.toLocaleString('ru-RU')} ₽</div>
      </div>
      <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
        <div className="text-sm opacity-80">🏦 Подушка 50%</div>
        <div className="text-xl font-bold">{Math.round(savings).toLocaleString('ru-RU')} ₽</div>
      </div>
      <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white">
        <div className="text-sm opacity-80">📊 Расходы</div>
        <div className="text-xl font-bold">{Math.round(totalExpenses).toLocaleString('ru-RU')} ₽</div>
      </div>
      <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white">
        <div className="text-sm opacity-80">💳 Бюджет</div>
        <div className="text-xl font-bold">{Math.round(budgetAfterSavings).toLocaleString('ru-RU')} ₽</div>
      </div>
      <div className={`col-span-2 p-4 rounded-xl text-white ${balance >= 0 ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>
        <div className="text-sm opacity-80">✅ Остаток на месяц</div>
        <div className="text-2xl font-bold">{Math.round(balance).toLocaleString('ru-RU')} ₽</div>
      </div>
    </div>
  );
};
