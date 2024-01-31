"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
function Reword({ reword }) {
    return (react_1.default.createElement("div", { className: "reword" },
        react_1.default.createElement("img", { src: `/images/${encodeURIComponent((0, commons_1.getNameExceptColon)(reword.item.name))}.png` }),
        react_1.default.createElement("div", { className: "reword-info" },
            react_1.default.createElement("span", null, reword.item.name),
            react_1.default.createElement("span", { className: reword.item.canTrade ? "green" : "red" }, reword.item.canTrade ? "거래가능" : "거래불가"),
            react_1.default.createElement("span", null,
                reword.count,
                "ea"))));
}
exports.default = Reword;
