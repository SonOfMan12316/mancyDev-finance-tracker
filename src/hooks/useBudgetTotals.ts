import { useMemo } from "react";
import { budgetInfo } from "../types/global";

interface BudgetTotals {
  limit: number;
  amountSpent: number;
  categories: Array<{
    amountSpent: number;
    color: string;
  }>;
  usedThemes: Set<string>;
}

const useBudgetTotals = (budgets: budgetInfo[]): BudgetTotals => {
  return useMemo(() => {
    const usedThemes = new Set<string>();
    const totals = {
      limit: 0,
      amountSpent: 0,
      categories: [] as Array<{
        amountSpent: number;
        color: string;
      }>,
      usedThemes,
    };

    if (budgets?.length > 0) {
      totals.limit = budgets.reduce((sum, b) => sum + Number(b.maximum), 0);
      totals.amountSpent = budgets.reduce(
        (sum, b) => sum + Number(b.amount_spent),
        0
      );

      totals.categories = budgets.map((budget) => {
        usedThemes.add(budget.theme);

        return {
          limit: Number(budget.maximum),
          amountSpent: Number(budget.amount_spent),
          color: budget.theme,
        };
      });
    }

    return totals;
  }, [budgets]);
};

export default useBudgetTotals;
