import { budgetInterface } from "../types/global";

const budgets: budgetInterface[] = [
  {
    category: "Bills",
    maximum: 750.0,
    amount_spent: 150.0,
    theme: "ch-cyan",
  },
  {
    category: "Dining Out",
    maximum: 75.0,
    amount_spent: 133.0,
    theme: "ch-yellow",
  },
  {
    category: "Entertainment",
    maximum: 50.0,
    amount_spent: 15.0,
    theme: "ch-green",
  },
  {
    category: "Personal Care",
    maximum: 100.0,
    amount_spent: 40.0,
    theme: "ch-navy",
  },
];

export default budgets;
