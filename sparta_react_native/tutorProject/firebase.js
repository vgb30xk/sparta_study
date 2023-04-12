import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzlN_P40XoqG2Xl96LtQDgWrMrYRuoIS4",
  authDomain: "movieproject-cb7a0.firebaseapp.com",
  projectId: "movieproject-cb7a0",
  storageBucket: "movieproject-cb7a0.appspot.com",
  messagingSenderId: "880324778535",
  appId: "1:880324778535:web:3a3f1afd9bae5744bf8c02",
  measurementId: "G-M2J3BWJE56",
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
