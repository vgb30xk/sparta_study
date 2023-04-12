import React from "react";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <Container>
      <div>My Todo List</div>
      <div>React</div>
    </Container>
  );
};

export default Header;

const Container = styled.div<{}>`
  border: 1px solid #ddd;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 24px;
`;
