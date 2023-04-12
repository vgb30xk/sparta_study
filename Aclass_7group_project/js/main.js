import { authService } from "./firebase.js";
import { createComments, deletePoster, updateComment, deleteComment, onEnterKey, editComment, cancelEditComment, getUserProfile, updatePoster } from "./pages/poster.js";
import { handleLocation, goToProfile, goToPostWriting, goToMain, goToProfileEdit } from "./router.js";
import { clickPost, fill } from "./pages/cutemain.js";
import { save_posting, save_postImage, upload_postImage } from "./pages/post_writing.js";
import { edit_posting, cancel_posting } from "./pages/post_edit.js";
import { onToggle, socialLogin, handleAuth, logout } from "./pages/auth.js";

import { onFileChange, fil, changeProfile } from "./pages/profile_edit.js";
// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", () => {
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    handleLocation();
    const hash = window.location.hash;

    if (!user) {
      // 로그아웃 상태이므로 로그인 화면으로 강제 이동
      if (hash !== "") {
        window.location.replace("");
      }
    }
  });
});

// 로그인 상태 모니터링

window.updatePoster = updatePoster;
window.deletePoster = deletePoster;
window.createComments = createComments;
window.editComment = editComment;
window.cancelEditComment = cancelEditComment;
window.updateComment = updateComment;
window.deleteComment = deleteComment;
window.onEnterKey = onEnterKey;

window.fil = fil;
window.fill = fill;
window.onToggle = onToggle;
window.socialLogin = socialLogin;
window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.goToPostWriting = goToPostWriting;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
window.goToProfileEdit = goToProfileEdit;
window.goToMain = goToMain;
window.getUserProfile = getUserProfile;
window.clickPost = clickPost;
window.save_posting = save_posting;
window.save_postImage = save_postImage;
window.upload_postImage = upload_postImage;
window.edit_posting = edit_posting;
window.cancel_posting = cancel_posting;
window.logout = logout;
