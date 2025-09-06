import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { budgetInfo } from "../../types/global";

export const createBudget = async (data: Omit<budgetInfo, 'id'>): Promise<budgetInfo> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  const budgetWithUser = {
    ...data,
    userId: user.uid,
  };

  const categoryQuery = query(
    collection(db, "budgets"),
    where("userId", "==", user.uid),
    where("category", "==", data.category)
  );
  
  const categorySnapshot = await getDocs(categoryQuery);
  if (!categorySnapshot.empty) {
    throw new Error(`${data.category} budget already exists`);
  }

  if (data.theme) {
    const themeQuery = query(
      collection(db, "budgets"),
      where("userId", "==", user.uid),
      where("theme", "==", data.theme)
    );
    
    const themeSnapshot = await getDocs(themeQuery);
    if (!themeSnapshot.empty) {
      throw new Error("Chosen theme is already in use!");
    }
  }

  const budgetsRef = collection(db, "budgets");
  const docRef = await addDoc(budgetsRef, budgetWithUser);

  return {
    ...budgetWithUser,
    id: docRef.id
  };
};