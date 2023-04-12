import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleStatusTodo } from "../redux/modules/todos";
import { Link } from "react-router-dom";

interface Props {}

interface RootState {
  todos: {
    todos: Todo[];
  };
}

interface Todo {
  id: string;
  title: string;
  body: string;
  isDone: boolean;
}

const List: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const onToggleStatusTodo = (id: string) => {
    dispatch(toggleStatusTodo(id));
  };

  return (
    <Container>
      <h2>Working.. 🔥</h2>
      <Wrapper>
        {todos.map((todo: Todo) => {
          if (!todo.isDone) {
            // 완료하지 않은것만 출력
            return (
              <TodoContainer>
                <StLink to={`/${todo.id}`}>
                  <div>상세보기</div>
                </StLink>
                <div>
                  <h2 className="todo-title">{todo.title}</h2>
                  <div>{todo.body}</div>
                </div>
                <Footer>
                  <Button
                    borderColor="red"
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    삭제하기
                  </Button>
                  <Button
                    borderColor="green"
                    onClick={() => onToggleStatusTodo(todo.id)}
                  >
                    완료!
                  </Button>
                </Footer>
              </TodoContainer>
            );
          } else {
            return null;
          }
        })}
      </Wrapper>
      <h2>Done..! 🎉</h2>
      <Wrapper>
        {todos.map((todo: Todo) => {
          if (todo.isDone) {
            // 완료했을경우 출력
            return (
              <TodoContainer>
                <StLink to={`/${todo.id}`}>
                  <div>상세보기</div>
                </StLink>
                <div>
                  <h2 className="todo-title">{todo.title}</h2>
                  <div>{todo.body}</div>
                </div>
                <Footer>
                  <Button
                    borderColor="red"
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    삭제하기
                  </Button>
                  <Button
                    borderColor="green"
                    onClick={() => onToggleStatusTodo(todo.id)}
                  >
                    취소!
                  </Button>
                </Footer>
              </TodoContainer>
            );
          } else {
            return null;
          }
        })}
      </Wrapper>
    </Container>
  );
};

export default List;

const Container = styled.div`
  padding: 0 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const TodoContainer = styled.div`
  width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: end;
  padding: 12px;
  gap: 12px;
`;

const Button = styled.button<{ borderColor: string }>`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
