import { writeBatch, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { budgetInfo } from "../../types/global";
import toast from "react-hot-toast";

export const createBudget = async (data: budgetInfo) => {
    const batch = writeBatch(db);
    const budgetRef = collection(db, 'budgets')
    batch.set(doc(budgetRef), data)

    try {
        await batch.commit();
        return { success: true }
    } catch (error) {
        toast.error("Error whilst creating budget")
    }
}