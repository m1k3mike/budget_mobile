export interface Subscriptions {
  anya: number;
  misha: number;
}

export interface Phone {
  anya: number;
  misha: number;
  mira: number;
}

export interface BudgetData {
  income: number;
  alimony: number;
  mortgage: number;
  carloan: number;
  food: number;
  gas: number;
  cat: number;
  hobb: number;
  grand: number;
  phone: Phone;
  subs: Subscriptions;
  notes: string;
  checks: Record<string, boolean>;
}

export interface Calculations {
  savings: number;
  mortNet: number;
  hobbNet: number;
  balance: number;
  daily: number;
  percent: number;
  totalExpenses: number;
  budgetAfterSavings: number;
}

export const defaultBudgetData: BudgetData = {
  income: 0,
  alimony: 10000,
  mortgage: 28000,
  carloan: 17000,
  food: 0,
  gas: 0,
  cat: 0,
  hobb: 0,
  grand: 0,
  phone: { anya: 0, misha: 0, mira: 0 },
  subs: { anya: 0, misha: 0 },
  notes: "",
  checks: {}
};
