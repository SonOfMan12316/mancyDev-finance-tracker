import { writeBatch, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { budgetInfo } from "../../types/global";
import toast from "react-hot-toast";

export const createBudget = async (data: budgetInfo) => {
  const budgetRef = collection(db, "budgets");
  const querySnapshot = await getDocs(budgetRef);

  const budgetExist = querySnapshot.docs.find(
    (doc) => doc.data().category === data.category
  );

  if (budgetExist) {
    toast.error(`${data.category} budget already exists`);
  } else {
    const batch = writeBatch(db);
    batch.set(doc(budgetRef), data);

    try {
      await batch.commit();
      return { success: true };
    } catch (error) {
      toast.error("Error whilst creating budget");
    }
  }
};
