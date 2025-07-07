import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { potInfo } from "../../types/global";

export const useDeletePot = () => {
  return useMutation<void, Error, string, { previousPotts?: potInfo[] }>({
    mutationFn: async (potId: string) => {
      await deleteDoc(doc(db, "pots", potId));
    },
  });
};
