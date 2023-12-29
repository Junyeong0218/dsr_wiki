"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const getItemsFunctions_1 = require("../../functions/getItemsFunctions");
const commons_1 = require("../../functions/commons");
function DropsModal({ isOpen, monster, position }) {
    if (!monster)
        return react_1.default.createElement("div", { id: "drops-modal", className: `modal ${isOpen ? "active" : ""}`, style: { top: position.top, left: position.left } });
    return (react_1.default.createElement("div", { id: "drops-modal", className: `modal ${isOpen ? "active" : ""}`, style: { top: position.top, left: position.left } },
        react_1.default.createElement("div", { className: "window" },
            react_1.default.createElement("div", { className: "digimon-info" },
                react_1.default.createElement("img", { src: `/images/${monster === null || monster === void 0 ? void 0 : monster.name}.png` }),
                react_1.default.createElement("div", { className: "digimon-description" },
                    react_1.default.createElement("span", { className: "digimon-name" }, monster === null || monster === void 0 ? void 0 : monster.name),
                    react_1.default.createElement("span", { className: "description-row" },
                        "Level : ", monster === null || monster === void 0 ? void 0 :
                        monster.level),
                    react_1.default.createElement("span", { className: "description-row" },
                        "\uC18D\uC131 :\u00A0",
                        react_1.default.createElement("img", { src: `/images/${monster === null || monster === void 0 ? void 0 : monster.digimonType}.png` })),
                    react_1.default.createElement("div", { className: "hp-bar" },
                        "HP ", monster === null || monster === void 0 ? void 0 :
                        monster.hp))),
            react_1.default.createElement("span", { className: "title" }, "\uB4DC\uB78D \uC544\uC774\uD15C"),
            react_1.default.createElement("div", { className: "drop-items" }, monster && monster.dropItems && monster.dropItems.map(itemId => {
                const item = (0, getItemsFunctions_1.getItemById)(itemId);
                return (react_1.default.createElement("div", { className: "drop-item", key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("img", { src: `/images/${item.name.includes("조합법") ? "조합법" : item.name}.png` }),
                    react_1.default.createElement("span", null, item.name)));
            })))));
}
exports.default = DropsModal;
