import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo, Todo } from "../redux/modules/todos";
import uuid from "react-uuid";

interface Props {}

const Form: React.FC<Props> = () => {
  const id = uuid();

  const dispatch = useDispatch();
  const [todo, setTodo] = useState<Todo>({
    id: id,
    title: "",
    body: "",
    isDone: false,
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo.title.trim() === "" || todo.body.trim() === "") return;
    dispatch(addTodo(todo));
    setTodo({
      id: id,
      title: "",
      body: "",
      isDone: false,
    });
  };

  return (
    <Container onSubmit={onSubmitHandler}>
      <Wrapper>
        <Label>제목</Label>
        <Input
          type="text"
          name="title"
          value={todo.title}
          onChange={onChangeHandler}
        />
        <Label>내용</Label>
        <Input
          type="text"
          name="body"
          value={todo.body}
          onChange={onChangeHandler}
        />
      </Wrapper>
      <Button>추가하기</Button>
    </Container>
  );
};

export default Form;

const Container = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const Input = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;

const Button = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;
