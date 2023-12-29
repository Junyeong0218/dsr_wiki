"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function RequiredItem({ fileName, top, left }) {
    return (react_1.default.createElement("div", { className: "req-item jogress", style: { top: `${top}px`, left: `${left}px` } },
        react_1.default.createElement("img", { src: `/images/${fileName}.png`, title: fileName })));
}
exports.default = RequiredItem;
