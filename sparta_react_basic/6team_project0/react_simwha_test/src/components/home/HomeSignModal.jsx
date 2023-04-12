import React from "react";
import styled from "styled-components";
import HomeSignModalBody from "./HomeSignModalBody";
import HomeSignModalHeader from "./HomeSignModalHeader";

const HomeSignModal = () => {
  return (
    <Background>
      <Container>
        <HomeSignModalHeader />
        <HomeSignModalBody />
      </Container>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(249, 249, 249, 0.85);
`;
const Container = styled.div`
  width: 480px;
  height: 500px;
  animation: 0.4s ease-in-out;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;
export default HomeSignModal;
