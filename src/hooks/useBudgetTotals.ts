import { useMemo } from "react";
import { budgetInfo } from "../types/global";

const useBudgetTotals = (budgets: budgetInfo[]) => {
  return useMemo(() => {
    const totals = {
      limit: 0,
      amountSpent: 0,
      categories: [] as Array<{
        amountSpent: number;
        color: string;
      }>,
    };

    if (budgets?.length > 0) {
      totals.limit = budgets.reduce((sum, b) => sum + Number(b.maximum), 0);
      totals.amountSpent = budgets.reduce(
        (sum, b) => sum + Number(b.amount_spent),
        0
      );

      totals.categories = budgets.map((budget) => {
        const limit = Number(budget.maximum);
        const amountSpent = Number(budget.amount_spent);

        return {
          limit,
          amountSpent,
          color: budget.theme,
        };
      });
    }

    return totals;
  }, [budgets]);
};

export default useBudgetTotals;
