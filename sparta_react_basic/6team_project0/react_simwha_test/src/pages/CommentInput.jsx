import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { useParams } from "react-router-dom";
import { __addComment } from "../redux/modules/commentsSlice";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { openModal } from "../redux/modules/modalSlice";

function CommentInput() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [comments, setComments] = useState("");
  const user = useSelector((state) => state.user.user);

  const commentsChangeHandler = (e) => {
    setComments(e.target.value);
  };
  const AddCommentsHandler = (event) => {
    event.preventDefault();
    if (!comments.trim()) {
      return alert("내용을 입력해주세요.");
    }
    dispatch(
      __addComment({
        post_id: id,
        content: comments,
        id: uuid(),
        user_id: user.id,
        createdAt: new Date(),
        username: user.username,
      })
    );
    setComments("");
  };

  const toLogin = () => {
    const result = window.confirm("로그인하시겠습니까?");
    if (result) {
      dispatch(openModal());
    } else {
      return;
    }
  };

  return (
    <CommentWrap>
      {user ? (
        <form>
          <Input
            type="text"
            value={comments}
            onChange={commentsChangeHandler}
            placeholder="댓글을 입력하세요"
          />

          <CommentAddButton onClick={AddCommentsHandler}>
            등록하기
          </CommentAddButton>
        </form>
      ) : (
        <form>
          <label onClick={toLogin} htmlFor="editInput">
            <Input
              type="text"
              value={comments}
              onChange={commentsChangeHandler}
              placeholder="댓글을 입력하세요"
              disabled={true}
              id="editInput"
            />
          </label>
        </form>
      )}
    </CommentWrap>
  );
}

export default CommentInput;

const CommentWrap = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
`;
const Input = styled.input`
  border: 2px solid #ffcd00;
  display: flex;
  width: 750px;
  height: 100px;
  margin-top: 40px;
  border-radius: 15px;
  padding: 20px;
  font-size: 18px;
  padding-bottom: 40px;
`;
const CommentAddButton = styled.button`
  display: flex;
  width: 100px;
  height: 30px;
  border: 2px solid black;
  border-radius: 15px;
  padding-left: 16px;
  padding-top: 2px;
  margin-top: 10px;
  margin-left: 640px;
  background-color: #ffcd00;
  color: #3e2723;
  font-weight: bold;

  &:hover {
    color: "#FFB300";
    text-decoration: none;
    border: 3px solid #ffb300;
  }
`;
