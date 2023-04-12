export interface Todo {
  id: string;
  title: string;
  body: string;
  isDone: boolean;
}

export interface TodosState {
  todos: Todo[];
  todo: Todo;
}

export interface Action {
  type: string;
  payload: any;
}

const ADD_TODO = "ADD_TODO";
const GET_TODO_BY_ID = "GET_TODO_BY_ID";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_STATUS_TODO = "TOGGLE_STATUS_TODO";

export const addTodo = (payload: Todo) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

export const deleteTodo = (payload: string) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

export const toggleStatusTodo = (payload: string) => {
  return {
    type: TOGGLE_STATUS_TODO,
    payload,
  };
};

export const getTodoByID = (payload: string) => {
  return {
    type: GET_TODO_BY_ID,
    payload,
  };
};

const initialState: TodosState = {
  todos: [
    {
      id: "1",
      title: "리액트",
      body: "리액트를 배워봅시다",
      isDone: false,
    },
  ],
  todo: {
    id: "0",
    title: "",
    body: "",
    isDone: false,
  },
};

const todos = (state = initialState, action: Action): TodosState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TOGGLE_STATUS_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          } else {
            return todo;
          }
        }),
      };

    case GET_TODO_BY_ID: {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      return {
        ...state,
        todo: todo || initialState.todo,
      };
    }
    default:
      return state;
  }
};

export default todos;
