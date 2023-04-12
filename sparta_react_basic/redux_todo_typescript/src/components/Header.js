"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Header = () => {
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement("div", null, "My Todo List"),
        react_1.default.createElement("div", null, "React")));
};
exports.default = Header;
const Container = styled_components_1.default.div `
  border: 1px solid #ddd;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 24px;
`;
