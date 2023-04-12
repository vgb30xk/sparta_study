import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openModal } from "../redux/modules/modalSlice";
import { setInitialState } from "../redux/modules/userSlice";
import HomeSignModal from "./home/HomeSignModal";
import inga from "../img/inga_bbang.jpg";
import Weather from "../pages/Weather";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, modal } = useSelector((state) => state);
  const isUser = user.user;

  const handleWrite = () => {
    if (user.user) {
      return navigate("/write");
    }
    return dispatch(openModal());
  };

  return (
    <NavContainer>
      <Logo to="/">
        <img src="/logo.png" height="58" alt="" />
        <h1>황금 잉어빵</h1>
      </Logo>
      <ButtonContainer>
        <LinkMap>
          <a
            href="https://www.google.com/maps/d/u/0/viewer?mid=1a8ow3qCMv4WtgFnRA_sGTuDm5MpsvV9P&hl=en_US&ll=36.32833077457025%2C127.70000039641127&z=7"
            target="_blank"
          >
            🔎 황금잉어여지도
          </a>
        </LinkMap>
        <Button onClick={handleWrite}>🗒&nbsp;새 글 쓰기</Button>
        {!isUser && (
          <Button onClick={() => dispatch(openModal())}>👤&nbsp;로그인</Button>
        )}
        {isUser && (
          <Button onClick={() => dispatch(setInitialState())}>
            🎅&nbsp;로그아웃
          </Button>
        )}
        {modal && <HomeSignModal />}
      </ButtonContainer>
    </NavContainer>
  );
};
const LinkMap = styled.text`
  border: none;
  padding: 1px 6px;
  font-size: 18px;
  background-color: transparent;
  font-weight: 700;
  cursor: pointer;
`;

const NavContainer = styled.div`
  width: 100%;
  height: 85px;
  background-color: #f5f5f5;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  h1 {
    margin-top: 10px;
    font-family: "Nanum Myeongjo", serif;
    font-size: 30px;
    margin-left: 10px;
    color: #ffcd00;
    font-weight: 700;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`;
const Button = styled.button`
  border: none;
  padding: 1px 6px;
  font-size: 18px;
  background-color: transparent;
  font-weight: 600;
  cursor: pointer;
`;

export default Header;
