import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { budgetInfo } from "../../types/global";

export const useDeleteBudget = () => {
  return useMutation<void, Error, string, { previousBudgets?: budgetInfo[] }>({
    mutationFn: async (budgetId: string) => {
      await deleteDoc(doc(db, "budgets", budgetId));
    },
  });
};
