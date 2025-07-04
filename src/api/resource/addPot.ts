import { writeBatch, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { potInfo } from "../../types/global";

export const createPot = async (
  data: Omit<potInfo, "id">
): Promise<potInfo> => {
  const potRef = collection(db, "pots");
  const querySnapshot = await getDocs(potRef);

  const potExist = querySnapshot.docs.find(
    (doc) => doc.data().name === data.name
  );

  const budgetThemeExist = querySnapshot.docs.find(
    (doc) => doc.data().theme === data.theme
  );

  if (potExist) {
    throw new Error(`${data.name} pot already exists`);
  }
  if (budgetThemeExist) {
    throw new Error("Chosen theme is already in use!");
  }

  const docRef = doc(potRef);

  const newPot: potInfo = {
    ...data,
    id: docRef.id,
  };

  const batch = writeBatch(db);
  batch.set(doc(potRef), data);

  try {
    await batch.commit();
    return newPot;
  } catch (error: any) {
    throw new Error("Error creating pot");
  }
};
