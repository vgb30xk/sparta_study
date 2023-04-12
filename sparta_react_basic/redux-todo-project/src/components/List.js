"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_redux_1 = require("react-redux");
const todos_1 = require("../redux/modules/todos");
const react_router_dom_1 = require("react-router-dom");
const List = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const todos = (0, react_redux_1.useSelector)((state) => state.todos.todos);
    const onDeleteTodo = (id) => {
        dispatch((0, todos_1.deleteTodo)(id));
    };
    const onToggleStatusTodo = (id) => {
        dispatch((0, todos_1.toggleStatusTodo)(id));
    };
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement("h2", null, "Working.. \uD83D\uDD25"),
        react_1.default.createElement(Wrapper, null, todos.map((todo) => {
            if (!todo.isDone) {
                // 완료하지 않은것만 출력
                return (react_1.default.createElement(TodoContainer, null,
                    react_1.default.createElement(StLink, { to: `/${todo.id}` },
                        react_1.default.createElement("div", null, "\uC0C1\uC138\uBCF4\uAE30")),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", { className: "todo-title" }, todo.title),
                        react_1.default.createElement("div", null, todo.body)),
                    react_1.default.createElement(Footer, null,
                        react_1.default.createElement(Button, { borderColor: "red", onClick: () => onDeleteTodo(todo.id) }, "\uC0AD\uC81C\uD558\uAE30"),
                        react_1.default.createElement(Button, { borderColor: "green", onClick: () => onToggleStatusTodo(todo.id) }, "\uC644\uB8CC!"))));
            }
            else {
                return null;
            }
        })),
        react_1.default.createElement("h2", null, "Done..! \uD83C\uDF89"),
        react_1.default.createElement(Wrapper, null, todos.map((todo) => {
            if (todo.isDone) {
                // 완료했을경우 출력
                return (react_1.default.createElement(TodoContainer, null,
                    react_1.default.createElement(StLink, { to: `/${todo.id}` },
                        react_1.default.createElement("div", null, "\uC0C1\uC138\uBCF4\uAE30")),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", { className: "todo-title" }, todo.title),
                        react_1.default.createElement("div", null, todo.body)),
                    react_1.default.createElement(Footer, null,
                        react_1.default.createElement(Button, { borderColor: "red", onClick: () => onDeleteTodo(todo.id) }, "\uC0AD\uC81C\uD558\uAE30"),
                        react_1.default.createElement(Button, { borderColor: "green", onClick: () => onToggleStatusTodo(todo.id) }, "\uCDE8\uC18C!"))));
            }
            else {
                return null;
            }
        }))));
};
exports.default = List;
const Container = styled_components_1.default.div `
  padding: 0 24px;
`;
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
const TodoContainer = styled_components_1.default.div `
  width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`;
const StLink = (0, styled_components_1.default)(react_router_dom_1.Link) `
  text-decoration: none;
`;
const Footer = styled_components_1.default.footer `
  display: flex;
  justify-content: end;
  padding: 12px;
  gap: 12px;
`;
const Button = styled_components_1.default.button `
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
