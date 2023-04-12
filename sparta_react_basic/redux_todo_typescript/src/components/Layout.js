"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Layout = ({ children }) => {
    return react_1.default.createElement(StLayout, null, children);
};
exports.default = Layout;
const StLayout = styled_components_1.default.div `
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;
