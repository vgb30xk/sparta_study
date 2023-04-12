import React, { useState } from "react";
import axios from "axios";
import {
  __getCommentsThunk,
  __deleteComment,
  __updateComment,
} from "../redux/modules/commentsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import goldenKing from "../img/goldenKing.png";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState("");

  const editHandler = (event) => {
    event.preventDefault();
    setIsEdit((prev) => !prev);
  };

  const user = useSelector((state) => state.user.user);
  const deleteHandler = (event) => {
    event.preventDefault();
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const editDoneHandler = (event) => {
    event.preventDefault();
    if (!editComment.trim()) {
      return alert("내용을 입력해주세요.");
    }
    dispatch(
      __updateComment({
        id: comment.id,
        content: editComment,
        user_id: user.id,
        username: user.username,
      })
    );
    setEditComment("");
    setIsEdit((prev) => !prev);
  };

  const changeEditCommentHandler = (event) => {
    setEditComment(event.target.value);
  };
  return (
    <>
      {user && user.id === comment.user_id ? (
        <CommListWrap>
          {isEdit ? (
            <ListInput
              type="text"
              value={editComment}
              onChange={changeEditCommentHandler}
            />
          ) : (
            <CommListWrap>
              <Nickname>
                <ImgG src={goldenKing} />
                {comment.username}
              </Nickname>
              <CommentContentLogin>{comment.content}</CommentContentLogin>
            </CommListWrap>
          )}
          <CommentContent>
            <ButtonWrap>
              {isEdit ? (
                <ListButton onClick={editDoneHandler}>완료</ListButton>
              ) : (
                <ListButton onClick={editHandler}>수정</ListButton>
              )}
              <DeleteButtonWrap disabled={isEdit} onClick={deleteHandler}>
                삭제
              </DeleteButtonWrap>
            </ButtonWrap>
          </CommentContent>
        </CommListWrap>
      ) : (
        <CommListWrap>
          <Nickname>
            <ImgG src={goldenKing} />
            {comment.username}
          </Nickname>
          <CommentContent>{comment.content}</CommentContent>
        </CommListWrap>
      )}
    </>
  );
};
export default Comment;

const CommListWrap = styled.div`
  margin: auto;
`;

const Nickname = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const CommentContent = styled.div`
  display: flex;
  width: 730px;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 10px;
  font-size: 20px;
`;

const CommentContentLogin = styled.div`
  width: 730px;
  margin-top: 10px;
  font-size: 20px;
`;

const ListInput = styled.input``;

const ButtonWrap = styled.div`
  background-color: white;
  width: 250px;
  display: flex;
  margin-left: 500px;
`;

const ListButton = styled.button`
  margin-right: 10px;
  margin-left: 130px;
  display: block;
  background-color: #ffcd00;
  color: #3e2723;
  border-radius: 6px;
  width: 45px;
  font-weight: bold;
  border-color: #ffb300;
  box-shadow: 0px 1px 1px 0px black;
  font-size: 12px;
`;
const DeleteButtonWrap = styled.button`
  display: block;
  background-color: #ffcd00;
  color: #3e2723;
  border-radius: 6px;
  width: 45px;
  font-weight: bold;
  border-color: #ffb300;
  box-shadow: 0px 1px 1px 0px black;
  font-size: 12px;
`;

const ImgG = styled.img`
  width: 40px;
  height: 30px;
  margin-bottom: 2px;
`;
