"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
function ResultItem({ selected }) {
    const tradableTag = selected.resultItem.canTrade ? react_1.default.createElement("span", { className: "green" }, "\uAC70\uB798\uAC00\uB2A5") :
        react_1.default.createElement("span", { className: "red" }, "\uAC70\uB798\uBD88\uAC00");
    const imageName = encodeURIComponent((0, commons_1.getNameExceptColon)(selected.resultItem.name));
    return (react_1.default.createElement("div", { className: "result-item-info" },
        react_1.default.createElement("img", { src: `/images/${imageName}.png`, title: selected.resultItem.name }),
        react_1.default.createElement("span", { className: "result-item-title" }, selected.resultItem.name),
        tradableTag));
}
exports.default = ResultItem;
