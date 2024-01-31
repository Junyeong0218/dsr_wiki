"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
function SpentItems({ spentItems }) {
    return (react_1.default.createElement("div", { className: "spent-items" }, spentItems.map(spent => (react_1.default.createElement("div", { className: "spent-item", key: (0, commons_1.getUUID)() },
        react_1.default.createElement("img", { src: `/images/${spent.item.name}.png` }),
        "*",
        react_1.default.createElement("span", null, spent.count))))));
}
exports.default = SpentItems;
