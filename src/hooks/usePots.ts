import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { potInfo } from "../types/global";
import { db } from "../firebase";
import { useEffect } from "react";

interface UsePotsProps {
  onSuccess?: (data: potInfo[]) => void;
  onError?: (error: Error) => void;
}

const usePots = ({ onSuccess, onError }: UsePotsProps = {}) => {
  const result = useQuery<potInfo[], Error>({
    queryKey: ["pots"],
    queryFn: async () => {
      const snapshot = await getDocs(
        query(collection(db, "pots"), orderBy("name", "asc"))
      );
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as potInfo[];
    },
    refetchOnWindowFocus: false,
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

export default usePots;
