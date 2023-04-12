"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("../components/Header"));
const Layout_1 = __importDefault(require("../components/Layout"));
const Form_1 = __importDefault(require("../components/Form"));
const List_1 = __importDefault(require("../components/List"));
const Home = () => {
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement(Form_1.default, null),
        react_1.default.createElement(List_1.default, null)));
};
exports.default = Home;
