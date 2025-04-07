import { db } from "./FirebaseConfig";
import { collection, doc, getDocs , deleteDoc} from "firebase/firestore";

export const DeleteCollectionAll = async (namaCollection) => {
   const colRef = collection(db, namaCollection);
   const snapshot = await getDocs(colRef);

   const promises = snapshot.docs.map((docu) => deleteDoc(doc(db, namaCollection, docu.id)));
   await Promise.all(promises);
}