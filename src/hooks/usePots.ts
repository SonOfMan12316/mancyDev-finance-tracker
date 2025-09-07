import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import { potInfo } from "../types/global";
import { db, auth, User } from "../firebase";
import { useEffect } from "react";

interface UsePotsProps {
  onSuccess?: (data: potInfo[]) => void;
  onError?: (error: Error) => void;
}

const usePots = ({ onSuccess, onError }: UsePotsProps = {}) => {
  const result = useQuery<potInfo[], Error>({
    queryKey: ["pots", auth.currentUser?.uid],
    queryFn: async () => {
      const user: User | null = auth.currentUser;
      const potsQuery = query(
        collection(db, "pots"),
        where("userId", "==", user?.uid),
        orderBy("name", "asc")
      );

      const snapshot = await getDocs(potsQuery);
      if (snapshot.empty) {
        return [];
      }
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as potInfo[];
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

export default usePots;
