import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Query, DocumentData, onSnapshot, getDocs } from "firebase/firestore";
import { transactionInterface } from "../types/global";

interface UseTransactionsProps {
  queryRef: Query<DocumentData>;
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

  const query = useQuery<transactionInterface[], Error>({
    queryKey,
    queryFn: async () => {
      const cachedData = queryClient.getQueryData<transactionInterface[]>(queryKey);
      if (cachedData) {
        return cachedData;
      }

      try {
        const snapshot = await getDocs(queryRef);
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as transactionInterface[];
        queryClient.setQueryData(queryKey, data);
        return data;
      } catch (err) {
        console.error("Initial getDocs failed:", err);
        throw err; 
      }
    },
    staleTime: Infinity,          
    refetchOnWindowFocus: false, 
    refetchOnReconnect: false,   
    retry: false,                
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as transactionInterface[];

        queryClient.setQueryData(queryKey, data);
      
        onSuccess?.(data);
      },
      (error) => {
        onError?.(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [queryRef]);

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError ,
  };
};

export default useTransactions;
