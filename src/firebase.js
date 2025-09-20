import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCewkV85ELIhXmyU7e79r6wtipSnCSjZbM",
  authDomain: "metaverse-49556.firebaseapp.com",
  projectId: "metaverse-49556",
  storageBucket: "metaverse-49556.firebasestorage.app",
  messagingSenderId: "833840530745",
  appId: "1:833840530745:web:621888d554142c650854e8"
};
//make a new firebase proj
const app = initializeApp(firebaseConfig);
// make auty system
export const auth = getAuth(app);
export const db = getFirestore(app);