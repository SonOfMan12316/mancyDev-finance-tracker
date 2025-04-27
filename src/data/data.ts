import { budgetInterface } from "../types/global";

const budgets: budgetInterface[] = [
  {
    category: "Bills",
    maximum: 750.0,
    amount_spent: 250.0,
    theme: "ch-cyan",
  },
  {
    category: "Dining Out",
    maximum: 50.0,
    amount_spent: 50.0,
    theme: "ch-yellow",
  },
  {
    category: "Entertainment",
    maximum: 75.0,
    amount_spent: 67.0,
    theme: "ch-green",
  },
  {
    category: "Personal Care",
    maximum: 100.0,
    amount_spent: 65.0,
    theme: "ch-navy",
  },
];

export default budgets;
