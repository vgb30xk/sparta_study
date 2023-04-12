// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyDw1RCE4O4AmWzyxpMN9u5-L_JHTbJLKqc",
  authDomain: "fir-spa-d160f.firebaseapp.com",
  projectId: "fir-spa-d160f",
  storageBucket: "fir-spa-d160f.appspot.com",
  messagingSenderId: "1016526399890",
  appId: "1:1016526399890:web:e86d8663bdb13abcbd394b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
