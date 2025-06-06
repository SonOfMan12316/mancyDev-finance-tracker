import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { budgetInfo } from "../types/global";
import { db } from "../firebase";
import { useEffect } from "react";

interface UseBudgetsProps {
  onSuccess?: (data: budgetInfo[]) => void;
  onError?: (error: Error) => void;
}

const useBudgets = ({ onSuccess, onError }: UseBudgetsProps = {}) => {
  const result = useQuery<budgetInfo[], Error>({
    queryKey: ["budgets"],
    queryFn: async () => {
        const snapshot = await getDocs(query(collection(db, "budgets"), orderBy("category", "asc")));
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as budgetInfo[];
    },
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (result.data && onSuccess) {
      onSuccess(result.data);
    }
  }, [result.data, onSuccess]);

  useEffect(() => {
    if (result.error && onError) {
      onError(result.error);
    }
  }, [result.error, onError]);

  return result;
};

export default useBudgets;