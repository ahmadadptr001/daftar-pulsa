import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDb1cHUZ90lrTtpHzwHjyshZkvcAF_w9b0",
   authDomain: "database-jual-pulsa.firebaseapp.com",
   projectId: "database-jual-pulsa",
   storageBucket: "database-jual-pulsa.firebasestorage.app",
   messagingSenderId: "1032411361474",
   appId: "1:1032411361474:web:7363618db02113c5800b5b",
   measurementId: "G-JGXD2GBGPD"
 };
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
