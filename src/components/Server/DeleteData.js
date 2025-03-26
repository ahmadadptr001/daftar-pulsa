import { db } from "./FirebaseConfig";
import { collection, deleteDoc, getDocs, query, where, doc } from "firebase/firestore";

export const DeleteData = async (nameTable, username) => {
  const colRef = collection(db, nameTable);
  const q = query(colRef, where("username", "==", username));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("Data tidak ditemukan!");
      return "not found";
    }

    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, nameTable, document.id);
      await deleteDoc(docRef);
      return "sukses";
    });
  } catch (error) {
      console.error("Gagal menghapus data:", error);
      return "gagal";
   }
};
