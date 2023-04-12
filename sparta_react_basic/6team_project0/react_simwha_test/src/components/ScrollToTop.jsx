import styled from "styled-components";

export const ScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  return (
    <ScrollContainer>
      <Top onClick={ScrollToTop} type="button">
        Top
      </Top>
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;

const Top = styled.div`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #f2d589;
  color: #fff;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:hover {
    color: rgb(142, 26, 26);
  }
`;
