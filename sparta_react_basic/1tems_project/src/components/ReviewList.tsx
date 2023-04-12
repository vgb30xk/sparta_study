import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { createReview } from '../api';
import ReviewItem from './ReviewItem';

const ReviewList = ({
  itemData,
  cultureId,
}: {
  itemData: reviewType[];
  cultureId: string;
}) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [body, setBody] = useState('');

  // 리뷰 작성 mutation
  const { isLoading: createLoading, mutate: createMutate } =
    useMutation(createReview);

  // 닉네임 감지
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // 비밀번호 감지
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 내용 감지
  const onChangeBody = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  // 작성
  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMutate(
      { cultureId, name, password, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('reviews');
        },
      }
    );
    setName('');
    setPassword('');
    setBody('');
  };

  if (createLoading) {
    return <div> 리뷰를 작성중입니다.</div>;
  }

  return (
    <div>
      <Form onSubmit={submitReview}>
        <NameInput
          maxLength={10}
          onChange={onChangeName}
          value={name}
          placeholder="닉네임"
          required
        />
        <PasswordInput
          maxLength={8}
          onChange={onChangePassword}
          value={password}
          type="password"
          placeholder="비밀번호"
          required
        />
        <BodyInput
          maxLength={48}
          onChange={onChangeBody}
          value={body}
          placeholder="내용 (최대 48자)"
          required
        />
        <ReviewBtn>작성</ReviewBtn>
      </Form>
      {itemData?.map((item: reviewType) => (
        <ReviewItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ReviewList;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const NameInput = styled.input`
  width: 100px;
  height: 25px;
  margin: 5px;
  text-align: center;
  background-color: #cdcdcd;
  color: white;
  border: none;
  border-radius: 15px;
`;

const PasswordInput = styled.input`
  width: 100px;
  height: 25px;
  margin: 5px;
  text-align: center;
  background-color: #cdcdcd;
  color: white;
  border: none;
  border-radius: 15px;
`;

const BodyInput = styled.input`
  width: 250px;
  height: 25px;
  margin: 5px;
  text-align: center;
  background-color: #cdcdcd;
  color: white;
  border: none;
  border-radius: 15px;
`;

const ReviewBtn = styled.button`
  height: 28px;
  border-radius: 5px;
  background-color: #242c44;
  color: white;
  border: none;
  margin: 7px;
  &:hover {
    transform: scale(1.2);
  }
`;
