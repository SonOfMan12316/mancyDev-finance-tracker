export interface OptionsInterface<T> {
  value: T;
  label: string;
}

export interface transactionInterface {
  avatar: string;
  id?: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface budgetInfo {
  id?: string;
  category: string;
  maximum: string;
  amount_spent: string;
  theme: string;
}

export interface potInfo {
  id?: string;
  name: string;
  target: string;
  total: string;
  theme: string;
}

export interface recurringbillInterface {
  avatar: string;
  header: string;
  amount: number;
  Duration: string;
}

export type pieChartCategory = {
  amountSpent: number;
  color: string;
};

export type Icon = {
  className: string;
  onClick: () => void;
};
