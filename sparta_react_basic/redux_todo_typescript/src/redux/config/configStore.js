"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const todos_js_1 = __importDefault(require("../modules/todos.js"));
const rootReducer = (0, redux_1.combineReducers)({
    todos: todos_js_1.default,
});
const store = (0, redux_1.createStore)(rootReducer);
exports.default = store;
