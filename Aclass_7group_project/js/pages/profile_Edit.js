import { doc, getDoc, getDocs, collection, query, where, updateDoc, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { authService, storageService, dbService } from "../firebase.js";
import { ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { getYYYYMMDD } from "../util.js";

const getUserProfile = async (uid) => {
  // try {
  const docRef = doc(dbService, "profile", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
  // } catch (err) {
  //   console.error(err);
  //   return alert("다시 시도해주세요");
  // }
};
/// 프로필 정보 불러오기
export const getProfileInfo = async () => {
  try {
    const { uid } = authService.currentUser;
    const { nickName, babyName, profileImage, description } = await getUserProfile(uid);

    if (nickName) document.getElementById("profile_nickName").value = nickName;
    if (babyName) document.getElementById("profile_babyName").value = babyName;
    if (description) document.getElementById("profile_description").value = description;
    if (profileImage) document.getElementById("profile_Image").src = profileImage;
  } catch (err) {
    console.error(err);
    // return alert("다시 시도해주세요.");
  }
};

/// 프로필 하단 포스트 불러오기
export const getProfilePostList = async () => {
  const postList = document.getElementById("profile_post_box");
  const { uid } = authService.currentUser;
  postList.innerHTML = "";

  // try {
  const docRef = collection(dbService, "post");
  const q = query(docRef, where("userId", "==", uid), orderBy("createdAt"));
  const querySnapShot = await getDocs(q);

  document.getElementById("profilepost_total").textContent = querySnapShot.size;

  querySnapShot.forEach(async (doc) => {
    const { userId, title, createdAt } = doc.data();
    const temp_html = `<div class="profile_post_side">
      <div class="profile_post">${title}&nbsp&nbsp&nbsp&nbsp&nbsp${getYYYYMMDD(createdAt)}</div>
      </div>`;

    const div = document.createElement("div");
    div.innerHTML = temp_html;
    postList.appendChild(div);
  });
  // } catch (err) {
  //   console.error(err);
  //   return alert("다시 시도해주세요오오오.");
  // }
};
///
///
///
//-------------   수정을 누르면 프로필 변경 구현   ------------    //

export const changeProfile = async () => {
  document.getElementById("profile_edit").disabled = true;
  const imgRef = ref(storageService, `${authService.currentUser.uid}/${uuidv4()}`);
  // 넥네임, 반려동물, 설명을 변수에 담음
  const nickName = document.getElementById("profile_nickName").value;
  const babyName = document.getElementById("profile_babyName").value;
  const description = document.getElementById("profile_description").value;
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
  }

  const updated = {
    nickName: nickName ?? null,
    babyName: babyName ?? null,
    description: description ?? null,
    profileImage: downloadUrl ?? null,
  };
  const uid = authService.currentUser.uid;
  try {
    await updateDoc(doc(dbService, "profile", uid), updated);
    alert("프로필 수정 완료");
    window.location.hash = "#profile";
  } catch ({ message }) {
    // alert("프로필 수정 실패");
    console.log("error:", message);
  }
};
//-------------   수정을 누르면 프로필 변경 구현   ------------    //
///
///
///
///
//-------------    프로필 파일 수정 누르면 사진불러오기   ------------    //
export const onFileChange = (event) => {
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profile_Image").src = imgDataUrl;
  };
};
//-------------    프로필 파일 수정 누르면 사진불러오기   ------------    //
///
///
///
///
//-------------   검색기능 구현   ------------    //

export function fil() {
  let value, contents, item, i;

  value = document.getElementById("profile_search").value;
  // "profile_search"아이디에 포함된 모든 문자열의 입력값을 value에 넣어준다.
  //쉽게 보면 글검색창에 단어를 입력시 value에 넣어준다라고 생각하면됨

  item = document.getElementsByClassName("profile_post_side");
  // "profile_post_side"클래스, 즉 이미 있는 글내용과 닉네임이 있는 클래스에 포함된 모든 문자열을 item에 넣어준다.

  for (i = 0; i < item.length; i++) {
    // item에는 item[0], item[1], item[2] 현재 이렇게 담겨져있다.

    contents = item[i].getElementsByClassName("profile_post");
    // 각 아이템 배열에서 클래스 contents, 즉 글내용 부분을 담는다.

    // 각 아이템 배열에서 클래스 nick, 즉 닉네임 부분을 담는다
    if (contents[0].innerHTML.indexOf(value) > -1) {
      // innerHTML은 HTML의 컨텐츠, 즉 내용에 접근할 수 있는 변수이고
      // indexOf()는 괄호안 값 문자열의 위치가 0,1,2,3,4... 인지 반환, 만약 없으면 -1을 반환한다.

      //만약 첫번째 글내용에 HTML의 컨텐츠값인 value(이건 검색창에서 입력한 문자열)가 존재하거나
      //|| 혹은 첫번째 닉네임에 HTML의 컨텐츠값인 value(이건 검색창에서 입력한 문자열)이 존재할경우

      item[i].style.display = "block";
      // 지금 전체 글내용중에서 해당 번째의 글내용을 보여준다
    } else {
      item[i].style.display = "none";
      // 지금 전체 글내용중에서 해당 번째의 글내용을 보여주지 않는다.
    }
  }
}
//-------------   검색기능 구현   ------------    //
//
