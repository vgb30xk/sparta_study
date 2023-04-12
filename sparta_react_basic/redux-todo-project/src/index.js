"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_redux_1 = require("react-redux");
const App_1 = __importDefault(require("./App"));
const configStore_1 = __importDefault(require("./redux/config/configStore"));
const rootElement = document.getElementById("root");
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: configStore_1.default },
    react_1.default.createElement(App_1.default, null)), rootElement);
