import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import { budgetInfo } from "../types/global";
import { db, auth, User } from "../firebase";
import { useEffect } from "react";

interface UseBudgetsProps {
  onSuccess?: (data: budgetInfo[]) => void;
  onError?: (error: Error) => void;
}

const useBudgets = ({ onSuccess, onError }: UseBudgetsProps = {}) => {
  const result = useQuery<budgetInfo[], Error>({
    queryKey: ["budgets", auth.currentUser?.uid],
    queryFn: async () => {
        const user: User | null = auth.currentUser
        const budgetsQuery = query(
          collection(db, "budgets"),
          where("userId", "==", user?.uid),
          orderBy("category", "asc")
        );

        const snapshot = await getDocs(budgetsQuery);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as budgetInfo[];
    },
    refetchOnWindowFocus: false,
    enabled: !!auth.currentUser,
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