import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { budgetInfo } from "../../types/global";

export const useEditBudget = () => {
  return useMutation<void, Error, { budgetId: string; updates: Partial<budgetInfo> }>({
    mutationFn: async ({ budgetId, updates }) => {
      const budgetRef = doc(db, "budgets", budgetId);
      await updateDoc(budgetRef, updates);
    },
  });
};
