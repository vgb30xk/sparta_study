import { doc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc, setDoc, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { authService, dbService } from "../firebase.js";
import { getYYYYMMDD } from "../util.js";

export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(dbService, "profile", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요");
  }
};

export const getPosterInfo = async () => {
  try {
    const docId = sessionStorage.getItem("docId");
    const docRef = doc(dbService, "post", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { title, content, image, userId, createdAt } = docSnap.data();
      const { nickName, babyName, profileImage } = await getUserProfile(userId);

      const uid = authService.currentUser.uid;
      const userProfile = await getUserProfile(uid);
      const userProfileImage = userProfile.profileImage;

      if (userProfileImage) document.getElementById("comment-user-img").src = userProfileImage;
      if (image) document.getElementById("post-img").style.backgroundImage = `url(${image})`;
      if (nickName) document.getElementById("post-nickname").textContent = nickName;
      if (babyName) document.getElementById("post-animal-name").innerHTML = babyName;
      if (createdAt) document.getElementById("post-date").textContent = getYYYYMMDD(createdAt);
      if (profileImage) document.getElementById("post-user-img").src = profileImage;
      if (title) document.getElementById("post-title").innerHTML = title;
      if (content) document.getElementById("post-desc").innerHTML = content;

      if (userId === uid) {
        const btnElement = document.getElementsByClassName("post-header")[0];
        if (btnElement.children.length < 2) {
          const div = document.createElement("div");
          div.id = "post-btns";
          const temp_html = `<img class="comment-btn" onclick="updatePoster();" src="../assets/edit.png" width="36" height="36" />
                              <img class="comment-btn" onclick="deletePoster();" src="../assets/delete.png" width="36" height="36" />`;
          div.innerHTML = temp_html;
          btnElement.appendChild(div);
        }
      }
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error(1, err);
    alert("다시 시도해주세요.");
    return history.back();
  }
};

export const updatePoster = () => {
  const docId = sessionStorage.getItem("docId");
  sessionStorage.setItem("v2", docId);
  window.location.hash = "#post_edit";
};

export const deletePoster = async () => {
  if (!window.confirm("게시물을 삭제하시겠습니까?")) {
    return;
  }

  const docId = sessionStorage.getItem("docId");
  if (!docId) return alert("다시 시도해주세요.");

  try {
    await deleteDoc(doc(dbService, "post", docId));
    alert("게시글을 삭제하였습니다.");
    return history.back();
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const getCommentList = async () => {
  const commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";
  const docId = sessionStorage.getItem("docId");

  try {
    const docRef = collection(dbService, "comment");
    const q = query(docRef, where("postId", "==", docId), orderBy("createdAt"));
    const querySnapShot = await getDocs(q);

    document.getElementById("comment-total").textContent = querySnapShot.size;

    querySnapShot.forEach(async (doc) => {
      const commentId = doc.id;
      const { userId, postId, content, createdAt } = doc.data();
      const { profileImage, nickName } = await getUserProfile(userId);
      let temp_html = `<div class="comment-wrapper">
                            <img class="comment-profile" src="${profileImage || "../assets/blankProfile.webp"}" : } />
                            <div class="comment-items">
                              <div class="comment-header">
                                <div class="comment-info">
                                  <div class="comment-nickname">${nickName || "닉네임 없음"}</div>
                                  <div class="comment-date">${getYYYYMMDD(createdAt)}</div>
                                </div>
                                `;
      if (userId === authService.currentUser.uid) {
        temp_html += `<div class="comment-btns">
                        <img class="comment-btn" onclick="editComment('${commentId}');" src="../assets/edit.png" width="36" height="36" />
                        <img class="comment-btn" onclick="deleteComment('${commentId}');" src="../assets/delete.png" width="36" height="36" />
                      </div>`;
      }
      temp_html += `</div>
                    <div class="comment-contents">${content}</div>
                  </div>
                </div>`;

      const div = document.createElement("div");
      div.innerHTML = temp_html;
      commentList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const createComments = async (e) => {
  const inputElement = document.getElementById("comment-input");
  const content = inputElement.value;
  if (!content) return alert("댓글을 입력해주세요.");

  try {
    const userId = authService.currentUser?.uid || testUid;
    const postId = sessionStorage.getItem("docId");
    const updated = { userId, postId, content, createdAt: Date.now() };
    await setDoc(doc(collection(dbService, "comment")), updated);

    document.getElementById("comment-input").value = "";
    getCommentList();
    return alert("댓글을 등록하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const editComment = (commentId) => {
  const parent = window.event.target.parentNode.parentNode;
  window.event.target.parentNode.remove();
  const btnsElement = document.createElement("div");
  btnsElement.classList.add("comment-btns");
  const btns_html = `<div class="comment-edit-complete" onclick="updateComment('${commentId}');">수정완료</div>
                    <div class="comment-edit-cancel" onclick="cancelEditComment();">취소</div>`;
  btnsElement.innerHTML = btns_html;
  parent.appendChild(btnsElement);

  const parent_2 = parent.parentNode;
  const contentsElement = parent_2.getElementsByClassName("comment-contents")[0];
  const value = contentsElement.innerHTML.trim();

  contentsElement.remove();
  const inputElement = document.createElement("input");
  inputElement.classList.add("comment-contents-edit");
  inputElement.value = value;
  parent_2.appendChild(inputElement);
};

export const cancelEditComment = () => {
  getCommentList();
};

export const updateComment = async (commentId) => {
  const containerElement = window.event.target.parentNode.parentNode.parentNode;
  const content = containerElement.getElementsByClassName("comment-contents-edit")[0].value;

  if (!commentId || !content) return alert("다시 시도해주세요.");

  try {
    const updated = { content };
    const docRef = doc(dbService, "comment", commentId);
    await updateDoc(docRef, updated);
    getCommentList();
    // return alert("댓글을 수정하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const deleteComment = async (commentId) => {
  if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

  if (!commentId) return alert("다시 시도해주세요.");

  try {
    await deleteDoc(doc(dbService, "comment", commentId));
    getCommentList();
    return alert("댓글을 삭제하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const onEnterKey = () => {
  if (window.event.keyCode == 13) {
    createComments();
  }
};
