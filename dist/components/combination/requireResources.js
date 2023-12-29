"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
function RequireResources({ selected }) {
    return (react_1.default.createElement("div", { className: "resources" },
        react_1.default.createElement("span", null,
            "\uD544\uC694 \uC219\uB828\uB3C4 : ",
            selected.reqPro),
        react_1.default.createElement("span", null,
            "\uBE44\uC6A9 : ",
            (0, commons_1.getCommaString)(selected.reqBit),
            react_1.default.createElement("img", { src: "/images/\uC870\uD569 \uBE44\uD2B8 \uC544\uC774\uCF58.png" })),
        react_1.default.createElement("span", null,
            "\uD655\uB960 : ",
            selected.rate * 100,
            "%"),
        react_1.default.createElement("span", null,
            "\uB300\uC131\uACF5 \uD655\uB960 : ",
            selected.bigRate * 100,
            "%")));
}
exports.default = RequireResources;
