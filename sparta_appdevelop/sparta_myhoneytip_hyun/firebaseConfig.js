import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyAtr_YlcYnk-Gi9ced_hkO6gRpQ8B2o9uM",
  authDomain: "myhoneytip-hyun.firebaseapp.com",
  projectId: "myhoneytip-hyun",
  storageBucket: "myhoneytip-hyun.appspot.com",
  messagingSenderId: "959172470715",
  appId: "1:959172470715:web:94d8ce6d26f43c8323469e",
  measurementId: "G-M3ZE8DKQ87",
  databaseURL:
    "https://myhoneytip-hyun-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
