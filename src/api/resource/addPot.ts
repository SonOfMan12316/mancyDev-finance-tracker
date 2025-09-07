import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { potInfo } from "../../types/global";

export const createPot = async (data: Omit<potInfo, "id">): Promise<potInfo> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  const potWithUser = {
    ...data,
    userId: user.uid,
  }

  if (data.theme) {
    const themeQuery = query(
      collection(db, "pots"),
      where("userId", "==", user.uid),
      where("theme", "==", data.theme)
    );
    
    const themeSnapshot = await getDocs(themeQuery);
    if (!themeSnapshot.empty) {
      throw new Error("Chosen theme is already in use!");
    }
  }

  if (data.name) {
    const nameQuery = query(
      collection(db, "pots"),
      where("userId", "==", user.uid),
      where("theme", "==", data.name)
    );
    
    const nameSnapshot = await getDocs(nameQuery);
    if (!nameSnapshot.empty) {
      throw new Error(`${data.name} pot already exists`);
    }
  }

  const potRef = collection(db, "pots");
  const docRef = await addDoc(potRef, potWithUser);

  return {
    ...potWithUser,
    id: docRef.id
  }
};
