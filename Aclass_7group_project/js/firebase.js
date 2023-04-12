// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyALdaiJgC9ekQBZxKBYAO5Qidmu-PKwlQY",
  authDomain: "cute7-7a04b.firebaseapp.com",
  projectId: "cute7-7a04b",
  storageBucket: "cute7-7a04b.appspot.com",
  messagingSenderId: "611186264324",
  appId: "1:611186264324:web:004da2c193562f71caa851",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
