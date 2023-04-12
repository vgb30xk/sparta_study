import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoByID, Todo, TodosState } from "../redux/modules/todos";

interface Props {}

interface RootState {
  todos: TodosState;
}

const Detail: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const todo = useSelector<RootState, Todo>((state) => state.todos.todo);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getTodoByID(id));
    }
  }, [dispatch, id]);

  return (
    <Container>
      <Wrapper>
        <div>
          <Header>
            <div>ID :{todo.id}</div>
            <Button
              borderColor="#ddd"
              onClick={() => {
                navigate("/");
              }}
            >
              이전으로
            </Button>
          </Header>
          <Title>{todo.title}</Title>
          <Body>{todo.body}</Body>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  border: 2px solid #eee;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 400px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;
const Title = styled.h1`
  padding: 0 24px;
`;

const Body = styled.main`
  padding: 0 24px;
`;

const Button = styled.button<{ borderColor: string }>`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
