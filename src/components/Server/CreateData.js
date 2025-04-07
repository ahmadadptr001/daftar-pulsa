import { db } from "./FirebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

export const CreateData = async (nameTable, username, company, image) => {
  const colRef = collection(db, nameTable);

  // filter company - number user 
  const callData = await getDocs(colRef);
  const data = callData.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  data.map((user) => {
    const user_company = user.company;

    if (user_company === company) {
      throw new Error("Nomor sudah ada!");
    }
  })
  
  await addDoc(colRef, { username, company, image, createdAt : serverTimestamp() });
};
