import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "./firebase";

export const deleteComment = async (commentId) => {
  await deleteDoc(doc(dbService, "comment", commentId));
};

export const deletePostText = async (Id) => {
  await deleteDoc(doc(dbService, "posts", Id));
};

export const editComment = async ({ commentId, editingObj }) => {
  await updateDoc(doc(dbService, "comment", commentId), editingObj);
};

export const deletePost = async (postId) => {
  await deleteDoc(doc(dbService, "posts", postId));
};

export const editPost = async ({ postId, editingObj }) => {
  await updateDoc(doc(dbService, "posts", postId), editingObj);
};
