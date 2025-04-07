import { db } from "./FirebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

export const TransactionPembelian = async (nameTable, company, jumlahTransaksi) => {
   const colRefPembelian = collection(db, nameTable);
   const colRefRiwayat = collection(db, "riwayat-transaction");
   const colRefUsers = collection(db, "users");

   const datas = await getDocs(colRefUsers);
   const data = datas.docs.map(doc => ({ id: doc.id, ...doc.data() }))

   let dataTersedia = 0;
   let username = "";

   data.map((user) => {
      const user_company = user.company;
      
      if (user_company === company) {
         username = user.username;
         dataTersedia += 1;
      } 
   });
   
   if (dataTersedia === 0) {
      throw new Error ("Nomor belum belum ditambahkan/terdaftar!");
   }

   dataTersedia = 0;

   await  addDoc(colRefPembelian, { company, jumlahTransaksi,  createdAt: serverTimestamp() });
   await  addDoc(colRefRiwayat, { status: "pembelian", username : username, company, jumlahTransaksi, createdAt: serverTimestamp() });
}