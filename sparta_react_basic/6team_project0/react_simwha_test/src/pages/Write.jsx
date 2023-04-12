import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";
import Layout from "../components/Layout";
import Editor from "../components/Editor";
import { __addWriteThunk } from "../redux/modules/postViewSlice";
import { signUpUserThunk } from "../redux/modules/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { render } from "react-dom";
import ReactHtmlParser from "react-html-parser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const userID = useSelector((state) => state.user.user.id);

  // console.log("userID", userID);

  // handler
  const onClickSubmitWriteHandler = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (content === "" && title === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    } else if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    } else if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    const newpost = {
      user_id: userID,
      id: uuidv4(),
      title,
      content,
      rate,
      read: 0,
    };

    dispatch(__addWriteThunk(newpost));

    // 등록버튼 누르면 만들어진 id의 상세페이지로 이동
    navigate(`/${newpost.id}`);
    // 브라우저 라우터 뒤에 : 가 들어가있으면 : 뒤에 붙는건 변수명 이라는 뜻
  };

  // 제목
  const [title, setTitle] = useState("");
  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  // 별점 라이브러리
  const [rate, setRate] = useState(0);
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  return (
    <Layout>
      <StyledP>✏️ 우리동네의 붕어빵 맛집을 알려주세요.</StyledP>
      <form onSubmit={onClickSubmitWriteHandler}>
        <WirteContainer>
          <Flex
            alingItems="center"
            borderBottom="3px solid #f2d589"
            width="250px"
          >
            <Star>만족도ㅤ</Star>
            <ReactStars
              size={30}
              activeColor="#f2d589"
              onChange={ratingChanged}
            />
          </Flex>

          <StyledInput
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={onChangeTitleHandler}
          />
          {/* 라이브러리 사용으로 setContent만 해서 content 변경함 */}
          <Editor setContent={setContent} />
          <Flex justifyCt="right" marginTop="60px">
            <AddButton>등록</AddButton>
          </Flex>
        </WirteContainer>
      </form>
      <div>{}</div>
    </Layout>
  );
};

const WirteContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledP = styled.p`
  font-size: 24px;
  border-bottom: 3px solid #f2d589;
  padding: 0 0 15px 15px;
  margin: 0 0 60px;
  font-weight: 700;
`;

const StyledInput = styled.input`
  border: 1px solid #e1e3e8;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding: 0 52px 0 16px;
  line-height: 44px;
  height: 56px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyCt};
  align-items: ${(props) => props.alingItems};
  margin-top: ${(props) => props.marginTop};
  border-bottom: ${(props) => props.borderBottom};
  width: ${(props) => props.width};
`;

const AddButton = styled.button`
  font-size: 17px;
  width: 100px;
  height: 40px;
  border: none;
  background-color: #f2d589;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  &:active {
    width: 95px;
    height: 35px;
  }
`;

const Star = styled.span`
  font-size: 20px;
  display: inline;
`;

export default Write;
