import { doc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc, setDoc, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { authService, dbService } from "../firebase.js";
import { goToPostId } from "../router.js";
import { getYYYYMMDD } from "../util.js";
import { getUserProfile } from "./poster.js";
//
// // =============================  페이지 랜딩 시 게시물데이터 불러와서 표시하기  ============================= //
export const getPostList = async () => {
  const postList = document.getElementById("main_columns");
  postList.innerHTML = "";
  const docId = "";
  const querySnapShot = await getDocs(collection(dbService, "post"));
  querySnapShot.forEach(async (doc) => {
    const docId = doc.id;
    const { userId, image, title, content } = doc.data();
    const { profileImage, nickName } = await getUserProfile(userId);
    const temp_html = `<div class="main_contents">
                          <figure onclick="clickPost('${docId}')" class="main_post">
                              <img
                                id="image"
                                src="${image}"
                              />
                              <figcaption>
                                <a class="main_title">${title}</a>
                                <div id="users">
                                  <img id="profileImage"
                                  src="${profileImage}"
                                  />
                                  <a class="main_name">${nickName}</a>
                                </div>
                              </figcaption>
                            </figure>
                            </div>`;

    const div = document.createElement("div");
    div.innerHTML = temp_html;
    postList.appendChild(div);
  });
};
// // =============================  페이지 랜딩 시 게시물데이터 불러와서 표시하기  ============================= //
//
//
//
//
//
//
//
//
// =============================  포스터 클릭시 해당 포스터로 이동  ============================= //
export const clickPost = async (docId) => {
  sessionStorage.setItem("docId", docId);
  goToPostId();
};
// =============================  포스터 클릭시 해당 포스터로 이동  ============================= //
//
//
//
//
//
//
//
// ================   검색기능 구현   ================== //
export function fill() {
  let value, title, item, name, i, content;

  value = document.getElementById("main_search_1").value;
  // "main_search_1"아이디에 포함된 모든 문자열의 입력값을 value에 넣어준다.
  //쉽게 보면 글검색창에 단어를 입력시 value에 넣어준다라고 생각하면됨
  item = document.getElementsByClassName("main_contents");
  // "profile_post_side"클래스, 즉 이미 있는 글내용과 닉네임이 있는 클래스에 포함된 모든 문자열을 item에 넣어준다.

  for (i = 0; i < item.length; i++) {
    // item에는 item[0], item[1], item[2] 현재 이렇게 담겨져있다.

    title = item[i].getElementsByClassName("main_title");
    // 각 아이템 배열에서 클래스 contents, 즉 글내용 부분을 담는다.
    name = item[i].getElementsByClassName("main_name");
    // 각 아이템 배열에서 클래스 nick, 즉 닉네임 부분을 담는다
    // content = item[i].getDocs(collection(dbService, "post")); //여기에 content도 불러와야하는데 어떻게 불러오는지 일단 모르겠다.
    if (
      title[0].innerHTML.indexOf(value) > -1 ||
      name[0].innerHTML.indexOf(value) > -1
      // || content[0].innerHTML.indexOf(value) > -1 //여기에 content도 불러와야하는데 어떻게 불러오는지 일단 모르겠다.
    ) {
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
// ================   검색기능 구현   ================== //
