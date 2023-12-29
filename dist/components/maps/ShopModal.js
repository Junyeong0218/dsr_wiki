"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const getItemsFunctions_1 = require("../../functions/getItemsFunctions");
const commons_1 = require("../../functions/commons");
function ShopModal({ isOpen, items, position }) {
    return (react_1.default.createElement("div", { id: "shop-modal", className: `modal ${isOpen ? "active" : ""}`, style: { top: position.top, left: position.left } },
        react_1.default.createElement("div", { className: "window" },
            react_1.default.createElement("div", { className: "title" }, "\uC0C1\uC810"),
            items && items.map(itemId => {
                const item = (0, getItemsFunctions_1.getItemById)(itemId);
                return (react_1.default.createElement("div", { className: "shop-item", key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("img", { src: `/images/${item.name}.png` }),
                    react_1.default.createElement("span", { className: "item-name" }, item.name),
                    react_1.default.createElement("div", { className: "item-price" },
                        item.price,
                        react_1.default.createElement("img", { src: "/images/\uC0C1\uC810 \uBE44\uD2B8 \uC544\uC774\uCF58.png" }))));
            }))));
}
exports.default = ShopModal;
