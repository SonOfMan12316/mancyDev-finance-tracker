import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Query, onSnapshot } from "firebase/firestore";
import { transactionInterface } from "../types/global";

interface UseTransactionsProps {
  queryRef: Query;
  onSuccess?: (data: transactionInterface[]) => void;
  onError?: (error: Error) => void;
}

const useTransactions = ({
  queryRef,
  onSuccess,
  onError,
}: UseTransactionsProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["transactions", queryRef];
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const query = useQuery<transactionInterface[], Error>({
    queryKey,
    queryFn: () => [],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsInitialLoad(true);

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as transactionInterface[];

        queryClient.setQueryData(queryKey, data);
        setIsInitialLoad(false);

        onSuccess?.(data);
      },
      (error) => {
        setIsInitialLoad(false);
        onError?.(error);
      }
    );

    return () => unsubscribe();
  }, [queryRef]);

  return {
    data: query.data,
    isLoading: isInitialLoad,
    error: !!query.error,
  };
};

export default useTransactions;
