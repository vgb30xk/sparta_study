"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_redux_1 = require("react-redux");
const todos_1 = require("../redux/modules/todos");
const react_uuid_1 = __importDefault(require("react-uuid"));
const Form = () => {
    const id = (0, react_uuid_1.default)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const [todo, setTodo] = (0, react_1.useState)({
        id: id,
        title: "",
        body: "",
        isDone: false,
    });
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setTodo(Object.assign(Object.assign({}, todo), { [name]: value }));
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (todo.title.trim() === "" || todo.body.trim() === "")
            return;
        dispatch((0, todos_1.addTodo)(todo));
        setTodo({
            id: id,
            title: "",
            body: "",
            isDone: false,
        });
    };
    return (react_1.default.createElement(Container, { onSubmit: onSubmitHandler },
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(Label, null, "\uC81C\uBAA9"),
            react_1.default.createElement(Input, { type: "text", name: "title", value: todo.title, onChange: onChangeHandler }),
            react_1.default.createElement(Label, null, "\uB0B4\uC6A9"),
            react_1.default.createElement(Input, { type: "text", name: "body", value: todo.body, onChange: onChangeHandler })),
        react_1.default.createElement(Button, null, "\uCD94\uAC00\uD558\uAE30")));
};
exports.default = Form;
const Container = styled_components_1.default.form `
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;
const Wrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Label = styled_components_1.default.label `
  font-size: 16px;
  font-weight: 700;
`;
const Input = styled_components_1.default.input `
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;
const Button = styled_components_1.default.button `
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;
