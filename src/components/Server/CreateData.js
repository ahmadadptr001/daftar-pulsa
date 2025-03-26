import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const CreateData = async (nameTable, username, company, image) => {
  const colRef = collection(db, nameTable);
  await addDoc(colRef, { username, company, image });
};
