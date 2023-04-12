"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoByID = exports.toggleStatusTodo = exports.deleteTodo = exports.addTodo = void 0;
const ADD_TODO = "ADD_TODO";
const GET_TODO_BY_ID = "GET_TODO_BY_ID";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_STATUS_TODO = "TOGGLE_STATUS_TODO";
const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload,
    };
};
exports.addTodo = addTodo;
const deleteTodo = (payload) => {
    return {
        type: DELETE_TODO,
        payload,
    };
};
exports.deleteTodo = deleteTodo;
const toggleStatusTodo = (payload) => {
    return {
        type: TOGGLE_STATUS_TODO,
        payload,
    };
};
exports.toggleStatusTodo = toggleStatusTodo;
const getTodoByID = (payload) => {
    return {
        type: GET_TODO_BY_ID,
        payload,
    };
};
exports.getTodoByID = getTodoByID;
const initialState = {
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
const todos = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign(Object.assign({}, state), { todos: [...state.todos, action.payload] });
        case DELETE_TODO:
            return Object.assign(Object.assign({}, state), { todos: state.todos.filter((todo) => todo.id !== action.payload) });
        case TOGGLE_STATUS_TODO:
            return Object.assign(Object.assign({}, state), { todos: state.todos.map((todo) => {
                    if (todo.id === action.payload) {
                        return Object.assign(Object.assign({}, todo), { isDone: !todo.isDone });
                    }
                    else {
                        return todo;
                    }
                }) });
        case GET_TODO_BY_ID: {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            return Object.assign(Object.assign({}, state), { todo: todo || initialState.todo });
        }
        default:
            return state;
    }
};
exports.default = todos;
