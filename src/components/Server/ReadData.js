import { db } from "./FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const ReadData = async (nameTable) => {
  const colRef = collection(db,  nameTable);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
