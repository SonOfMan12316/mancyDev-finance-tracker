import { writeBatch, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { budgetInfo } from "../../types/global";

export const createBudget = async (data: budgetInfo) => {
  const budgetRef = collection(db, "budgets");
  const querySnapshot = await getDocs(budgetRef);

  const budgetExist = querySnapshot.docs.find(
    (doc) => doc.data().category === data.category
  );

  const budgetThemeExist = querySnapshot.docs.find(
    (doc) => doc.data().theme === data.theme
  );

  if (budgetExist) {
    throw new Error(`${data.category} budget already exists`);
  }
  if (budgetThemeExist) {
    throw new Error(`Chosen theme is already in use!`);
  }
  const batch = writeBatch(db);
  batch.set(doc(budgetRef), data);

  try {
    await batch.commit();
    return { success: true };
  } catch (error: any) {
    console.error("Error whilst creating budget:", error);
    throw new Error("Error whilst creating budget");
  }
};
