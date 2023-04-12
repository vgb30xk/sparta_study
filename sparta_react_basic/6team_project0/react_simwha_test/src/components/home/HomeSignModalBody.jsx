import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import validateId from "../../lib/validateId";
import { closeModal } from "../../redux/modules/modalSlice";
import { setInitialState, signInUserThunk, signUpUserThunk } from "../../redux/modules/userSlice";
import HomeSignInput from "./HomeSignInput";

const HomeSignModalBody = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("로그인");
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const { user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(setInitialState());
    }
  }, [error]);

  useEffect(() => {
    // console.log("user", user);
    if (user) {
      dispatch(closeModal());
    }
  }, [user]);

  const handleClick = () => {
    const id = idRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;

    if (!id || !password) {
      return alert("모든 값을 입력해주세요");
    }
    if (status === "회원가입" && !username) {
      return alert("이름을 입력해주세요");
    }
    if (!validateId(id)) {
      return alert("아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자리로 입력해주세요.");
    }
    if (status === "로그인") {
      dispatch(signInUserThunk({ id, password }));
    } else {
      dispatch(signUpUserThunk({ id, password, username }));
      alert("회원가입이 완료되었습니다.");
      idRef.current.value = "";
      passwordRef.current.value = "";
      usernameRef.current.value = "";
      setStatus("로그인");
    }
  };

  return (
    <Container>
      <Body>
        <h2>{status}</h2>
        <Wrapper>
          <Title>아이디</Title>
          <HomeSignInput ref={idRef} placeholder="아이디를 입력하세요." />
        </Wrapper>
        <Wrapper>
          <Title>비밀번호</Title>
          <HomeSignInput ref={passwordRef} type="password" placeholder="비밀번호를 입력하세요." />
        </Wrapper>
        {status === "회원가입" && (
          <Wrapper>
            <Title>이름</Title>
            <HomeSignInput ref={usernameRef} placeholder="이름을 입력하세요." />
          </Wrapper>
        )}
        <ButtonWrapper>
          <Button onClick={() => handleClick()}>{status}</Button>
        </ButtonWrapper>
      </Body>
      <Footer>
        <p>{status === "로그인" ? "아직 회원이 아니신가요?" : "계정이 이미 있으신가요?"}</p>
        <span onClick={() => setStatus(status === "로그인" ? "회원가입" : "로그인")}>{status === "로그인" ? "회원가입" : "로그인"}</span>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 80px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Body = styled.div`
  flex: 1;
`;
const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 16px;
`;
const Title = styled.h5`
  margin-bottom: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;
`;
const Button = styled.button`
  background-color: #ffcd00;
  color: white;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 16px;
  width: 100px;
  height: 100%;
  cursor: pointer;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    margin-left: 10px;
    color: #ffcd00;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default HomeSignModalBody;
