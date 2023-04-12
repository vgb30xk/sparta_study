import { authService, dbService, storageService } from "../firebase.js";
import { ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { save_postImage } from "./post_writing.js";

export const getWritingObj = async () => {
  const docId = sessionStorage.getItem("v2");
  const docRef = doc(dbService, "post", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { userId, image, title, content } = docSnap.data();
    if (title) document.getElementById("write_title").value = title;
    if (content) document.getElementById("write_posting").value = content;
    if (image) document.getElementById("previewImg").src = image;
  } else {
    console.log("No such document!");
  }
};

// 수정버튼을 누르면 수정된 내용이 저장됨(타이틀, 콘텐츠, 이미지)
export const edit_posting = async (event) => {
  event.preventDefault();
  document.getElementById("btn_yes").disabled = true;
  // 수정버튼을 누르면 disabled 처리가 됨. 즉, 한 번 클릭 후 여러번 클릭할 수 없게 해놓은 부수적인 기능
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`,
  );

  const title = document.getElementById("write_title").value;
  const content = document.getElementById("write_posting").value;
  const imgDataUrl = document.getElementById("previewImg").src;
  let image = null;

  // 수정 안 된 이미지를
  if (!imgDataUrl.includes("https://firebasestorage.googleapis.com/")) {
    image = await save_postImage();
  }
  try {
    const docId = sessionStorage.getItem("v2");
    const docRef = doc(dbService, "post", docId);
    const updated = image ? { title, content, image } : { title, content };
    await updateDoc(docRef, updated);
    window.alert("수정이 완료되었습니다");
    location.hash = "";
  } catch (err) {
    console.error(err.message);
    window.alert("다시 시도해주세요");
  }
};

export const cancel_posting = () => {
  return history.back();
};
