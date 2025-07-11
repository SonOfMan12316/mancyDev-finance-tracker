import { useMemo } from "react";
import { budgetInfo, potInfo } from "../types/global";

interface BudgetTotals {
  limit: number;
  amountSpent: number;
  categories: Array<{
    amountSpent: number;
    color: string;
  }>;
  usedPotThemes: Set<string>;
  usedBudgetThemes: Set<string>;
  usedCategories: Set<string>;
  usedPotName: Set<string>;
  potTotal: number;
}

const useBudgetTotals = (
  budgets?: budgetInfo[],
  pots?: potInfo[]
): BudgetTotals => {
  return useMemo(() => {
    const usedBudgetThemes = new Set<string>();
    const usedPotThemes = new Set<string>();
    const usedCategories = new Set<string>();
    const usedPotName = new Set<string>();
    const totals = {
      limit: 0,
      amountSpent: 0,
      categories: [] as Array<{
        amountSpent: number;
        color: string;
      }>,
      usedBudgetThemes,
      usedPotThemes,
      usedCategories,
      usedPotName,
      potTotal: 0
    };

    if (budgets && budgets?.length > 0) {
      totals.limit = budgets.reduce((sum, b) => sum + Number(b.maximum), 0);
      totals.amountSpent = budgets.reduce(
        (sum, b) => sum + Number(b.amount_spent),
        0
      );

      totals.categories = budgets.map((budget) => {
        usedBudgetThemes.add(budget.theme);
        usedCategories.add(budget.category);

        return {
          limit: Number(budget.maximum),
          amountSpent: Number(budget.amount_spent),
          color: budget.theme,
        };
      });
    }

    if (pots && pots.length > 0) {
      console.log("pots in useBudgetTotals:", pots);
      pots.forEach((pot) => {
        console.log("pot.total:", pot.total);
        usedPotThemes.add(pot.theme);
        usedPotName.add(pot.name);
        totals.potTotal += Number(pot.total);
      });
    }

    return totals;
  }, [budgets, pots]);
};

export default useBudgetTotals;
