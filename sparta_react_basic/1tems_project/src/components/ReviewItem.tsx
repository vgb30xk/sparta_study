import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { BiUser } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

function ReviewItem({ item }: { item: reviewType }) {
  const [deleteToggle, setDeleteToggle] = useState(false);

  // 삭제 모달 띄우기
  const removeModal = () => {
    setDeleteToggle(true);
  };

  return (
    <Wrap>
      <Container>
        {deleteToggle ? (
          <Modal item={item} setDeleteToggle={setDeleteToggle} />
        ) : (
          <></>
        )}
        <ContentBox>
          <NameDiv>
            <BiUser size="24" />
            &nbsp; {item?.name}
          </NameDiv>
          <BodyDiv>{item?.body}</BodyDiv>
        </ContentBox>

        <DeleteBtn onClick={removeModal}>
          <FiTrash2 size="24" />
        </DeleteBtn>
      </Container>
    </Wrap>
  );
}

export default ReviewItem;

const Wrap = styled.div`
  margin-top: 20px;
`;

const Container = styled.div`
  width: 1400px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  border-radius: 10px;

  background-color: #eee;
  margin-bottom: 20px;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const NameDiv = styled.div`
  margin: 10px;
  width: 200px;
  font-size: 18px;
  border-right: 1px solid #333;
  display: flex;
  align-items: center;
`;

const BodyDiv = styled.div`
  margin: 10px;
  font-size: 18px;
`;

const DeleteBtn = styled.button`
  margin: 10px;
  border: none;
  background-color: #ffffff00;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
