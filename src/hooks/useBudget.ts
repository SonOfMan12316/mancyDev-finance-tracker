import { useQuery } from "@tanstack/react-query";
import { Query, onSnapshot } from "firebase/firestore";
import { budgetInterface } from "../types/global";
import { queryClient } from "../main";
import { useState } from "react";

interface UseTransactionsProps {
  queryRef: Query;
  onSuccess?: (data: budgetInterface[]) => void;
  onError?: (error: Error) => void;
}

const useBudget = ({ queryRef, onSuccess, onError }: UseTransactionsProps) => {
  const queryKey = ["transactions", queryRef];
  const [loading, setLoading] = useState(true);

  const query = useQuery<budgetInterface[], Error>({
    queryKey,
    queryFn: () => [],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  setLoading(true);
  const unsubscribe = onSnapshot(
    queryRef,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as budgetInterface[];

      queryClient.setQueryData(queryKey, data);
      setLoading(false);
      onSuccess?.(data);
    },
    (error) => {
      onError?.(error);
      setLoading(false);
    }
  );

  return {
    data: query.data,
    isLoading: loading,
    error: !!query.error,
    return: unsubscribe(),
  };
  return () => unsubscribe();
};

export default useBudget;
