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
const react_router_dom_1 = require("react-router-dom");
const todos_1 = require("../redux/modules/todos");
const Detail = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const todo = (0, react_redux_1.useSelector)((state) => state.todos.todo);
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (id) {
            dispatch((0, todos_1.getTodoByID)(id));
        }
    }, [dispatch, id]);
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(Header, null,
                    react_1.default.createElement("div", null,
                        "ID :",
                        todo.id),
                    react_1.default.createElement(Button, { borderColor: "#ddd", onClick: () => {
                            navigate("/");
                        } }, "\uC774\uC804\uC73C\uB85C")),
                react_1.default.createElement(Title, null, todo.title),
                react_1.default.createElement(Body, null, todo.body)))));
};
exports.default = Detail;
const Container = styled_components_1.default.div `
  border: 2px solid #eee;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled_components_1.default.div `
  width: 600px;
  height: 400px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Header = styled_components_1.default.div `
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;
const Title = styled_components_1.default.h1 `
  padding: 0 24px;
`;
const Body = styled_components_1.default.main `
  padding: 0 24px;
`;
const Button = styled_components_1.default.button `
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
