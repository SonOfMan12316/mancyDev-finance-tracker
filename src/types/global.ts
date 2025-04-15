export interface OptionsInterface<T = string> {
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
