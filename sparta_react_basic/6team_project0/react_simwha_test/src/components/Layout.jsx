import React from "react";
import styled from "styled-components";
import Header from "./Header";
const Layout = ({ children, bgColor = "#fff" }) => {
  return (
    <>
      <Header />
      <StLayout bgColor={bgColor}>{children}</StLayout>
    </>
  );
};

export default Layout;

const StLayout = styled.div`
  height: calc(100vh - 45px);
  background-color: ${({ bgColor }) => {
    return bgColor;
  }};

  padding: 24px 0;
`;
