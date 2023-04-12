import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { deleteReview } from '../api';

export default function Modal({
  item,
  setDeleteToggle,
}: {
  item: reviewType;
  setDeleteToggle: Dispatch<SetStateAction<boolean>>;
}) {
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useMutation(deleteReview);

  // 비밀번호 입력 감지
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // 삭제 기능
  const removeReview = () => {
    if (password === item.password) {
      deleteMutate(item, {
        onSuccess: () => {
          queryClient.invalidateQueries('reviews');
          setDeleteToggle(false);
        },
      });
    } else if (password === '') {
      alert('비밀번호를 입력하지 않으셨습니다.');
      setDeleteToggle(false);
    } else {
      alert('비밀번호가 맞지 않습니다.');
      setDeleteToggle(false);
    }
  };
  return (
    <Wrap>
      <Box>
        <CancelBtn onClick={() => setDeleteToggle(false)}>x</CancelBtn>
        <TitleText>정말 삭제하시겠습니까?</TitleText>
        <Text>리뷰 비밀번호를 입력해주세요.</Text>
        <form onSubmit={removeReview}>
          <Input
            maxLength={8}
            onChange={onChangePassword}
            type="password"
            placeholder="비밀번호"
          />
        </form>
        <Button type="button" onClick={() => removeReview()}>
          삭제
        </Button>
      </Box>
    </Wrap>
  );
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: #000000a2;
`;
const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 200px;
  background-color: #242c44;
  border-radius: 20px;
`;
const CancelBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: white;
  font-size: 22px;
`;
const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  color: white;
`;
const Text = styled.div`
  margin: 10px;
  color: white;
`;
const Input = styled.input`
  color: white;
  text-align: center;
  height: 20px;
  margin: 10px;
  background-color: inherit;
  border: none;
  border: 1px solid white;
  border-radius: 15px;
`;
const Button = styled.button`
  border: none;
  border: 1px solid white;
  border-radius: 10px;
  transition: 0.7s;
  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
    transition: 0.7s;
  }
`;
