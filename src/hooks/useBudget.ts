import { useState, useEffect, useCallback } from 'react';
import { BudgetData, Calculations, defaultBudgetData } from '../types/budget';

const STORAGE_KEY = 'family_budget_react_v1';

export const LIMITS = {
  food: 40000,
  gas: 25000,
};

export function useBudget() {
  const [data, setData] = useState<BudgetData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultBudgetData, ...JSON.parse(saved) };
      } catch {
        return defaultBudgetData;
      }
    }
    return defaultBudgetData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const calculate = useCallback((): Calculations => {
    const { income, alimony, mortgage, carloan, food, gas, cat, hobb, grand, phone, subs } = data;

    const savings = income * 0.5;
    const mortNet = Math.max(0, mortgage - alimony);
    const hobbNet = Math.max(0, hobb - grand);

    const totalExpenses =
      mortNet + carloan + food + gas + cat +
      phone.anya + phone.misha + phone.mira +
      subs.anya + subs.misha + hobbNet;

    const budgetAfterSavings = income - savings;
    const balance = budgetAfterSavings - totalExpenses;
    const percent = budgetAfterSavings > 0 ? Math.max(0, (balance / budgetAfterSavings) * 100) : 0;

    return {
      savings,
      mortNet,
      hobbNet,
      balance,
      daily: balance / 30,
      percent,
      totalExpenses,
      budgetAfterSavings,
    };
  }, [data]);

  const updateField = useCallback((key: string, value: number | string) => {
    setData(prev => {
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: value,
          },
        };
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const updateCheck = useCallback((key: string, checked: boolean) => {
    setData(prev => ({
      ...prev,
      checks: { ...prev.checks, [key]: checked },
    }));
  }, []);

  const resetData = useCallback(() => {
    setData(defaultBudgetData);
  }, []);

  const shareReport = useCallback(async () => {
    const res = calculate();
    const reportText = `📈 СЕМЕЙНЫЙ БЮДЖЕТ (План 50/50)
━━━━━━━━━━━━━━━━━━━━
💰 Доход: ${Math.round(data.income).toLocaleString('ru-RU')} ₽
🏦 Подушка (50%): ${Math.round(res.savings).toLocaleString('ru-RU')} ₽
📊 Расходы: ${Math.round(res.totalExpenses).toLocaleString('ru-RU')} ₽
━━━━━━━━━━━━━━━━━━━━
✅ Остаток: ${Math.round(res.balance).toLocaleString('ru-RU')} ₽
📅 На день: ${Math.round(res.daily).toLocaleString('ru-RU')} ₽
📈 Запас: ${Math.round(res.percent)}%`;

    if (navigator.share) {
      try {
        await navigator.share({ text: reportText });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(reportText);
      alert('Отчет скопирован в буфер обмена!');
    }
  }, [calculate, data.income]);

  return {
    data,
    calculations: calculate(),
    updateField,
    updateCheck,
    resetData,
    shareReport,
  };
}
