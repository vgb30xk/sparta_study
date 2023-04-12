import { authService } from "./firebase.js";
import { getWritingObj } from "./pages/post_edit.js";
import { getCommentList, getPosterInfo } from "./pages/poster.js";
import { getPostList } from "./pages/cutemain.js";
import { getProfileInfo, getProfilePostList } from "./pages/profile_edit.js";

const routes = {
  "/": "/pages/auth.html",
  404: "/pages/404.html",
  main: "/pages/main.html",
  poster: "/pages/poster.html",
  profile: "/pages/profile.html",
  profile_edit: "/pages/profile_edit.html",
  post_writing: "/pages/post_writing.html",
  post_edit: "/pages/post_edit.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");
  const pathName = window.location.pathname;
  const isLogin = authService.currentUser ? true : false;

  // Live Server를 index.html에서 오픈할 경우
  if (pathName === "/index.html") {
    window.history.pushState({}, "", "/");
  }
  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length === 0) {
    path = "/";
  }

  if (path === "/") {
    if (isLogin) {
      path = "main";
    }
  }

  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  if (path === "main") {
    getPostList();
  }

  if (path === "poster") {
    getPosterInfo();
    getCommentList();
  }

  if (path === "profile" || path === "profile_edit") {
    getProfileInfo();
    getProfilePostList();
    // 프로필, 프로필수정 화면 일 때 현재 프로필 사진과 닉네임, 반려동물, 설명 할당
    // document.getElementById("profile_Image").src = authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
    // document.getElementById("profile_nickName").placeholder = authService.currentUser.displayName ?? "닉네임";
    // document.getElementById("profile_babyName").placeholder = authService.currentUser.displayName ?? "반려동물 이름";
    // document.getElementById("profile_description").placeholder = authService.currentUser.displayName ?? "설명";
  }

  if (path === "post_edit") {
    getWritingObj();
  }
  // 프로필, 프로필수정 화면 일 때 현재 프로필 사진과 닉네임, 반려동물, 설명 할당
};

export const goToMain = () => {
  window.location.hash = "";
};
export const goToProfile = () => {
  window.location.hash = "#profile";
};
export const goToProfileEdit = () => {
  window.location.hash = "#profile_edit";
};
export const goToPostId = () => {
  window.location.hash = "#poster";
};
export const goToPostWriting = () => {
  window.location.hash = "#post_writing";
};
