import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0MikxYXJezp0gKwVgJHLJ5J12hVY8iJ4",
  authDomain: "daebak-8251c.firebaseapp.com",
  projectId: "daebak-8251c",
  storageBucket: "daebak-8251c.appspot.com",
  messagingSenderId: "328238660179",
  appId: "1:328238660179:web:d8873d4efd0c098b9464a6",
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
