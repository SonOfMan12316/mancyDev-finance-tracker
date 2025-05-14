export interface OptionsInterface<T> {
  value: T;
  label: string;
}

export interface transactionInterface {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface budgetInterface {
  category: string;
  maximum: number;
  amount_spent: number;
  theme: string;
}

export interface potInterface {
  name: string;
  target: number;
  total: number;
  theme: string;
}
