"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classes_1 = require("../../classes");
function MonsterDescriptionModal({ isOpen, monster, position }) {
    if (!monster)
        return react_1.default.createElement("div", { id: "drops-modal", className: `modal ${isOpen ? "active" : ""}`, style: { top: position.top, left: position.left } });
    const digimon = classes_1.Digimon.getByName(monster.name);
    return (react_1.default.createElement("div", { id: "overflow-monster-description-modal", className: `modal ${isOpen ? "active" : ""}`, style: { top: position.top, left: position.left } },
        react_1.default.createElement("div", { className: "window" },
            react_1.default.createElement("div", { className: "digimon-info" },
                react_1.default.createElement("img", { src: `/images/${monster.name}.png` }),
                react_1.default.createElement("div", { className: "digimon-description" },
                    react_1.default.createElement("span", { className: "digimon-name" }, monster === null || monster === void 0 ? void 0 : monster.name),
                    react_1.default.createElement("span", { className: "description-row" },
                        "Level : ",
                        monster.level),
                    react_1.default.createElement("span", { className: "description-row" },
                        "\uC18D\uC131 :\u00A0",
                        react_1.default.createElement("img", { src: `/images/${monster.digimonType}.png` })),
                    react_1.default.createElement("span", { className: "description-row" },
                        "\uAC15\uC810 :\u00A0",
                        react_1.default.createElement("img", { src: `/images/${digimon.strength} 강점.png` }),
                        "\u00A0",
                        digimon.strengthEffect),
                    react_1.default.createElement("span", { className: "description-row" },
                        "\uC57D\uC810 :\u00A0",
                        react_1.default.createElement("img", { src: `/images/${digimon.weakness} 약점.png` }),
                        "\u00A0",
                        digimon.weaknessEffect),
                    react_1.default.createElement("div", { className: "hp-bar" },
                        "HP ", monster === null || monster === void 0 ? void 0 :
                        monster.hp))))));
}
exports.default = MonsterDescriptionModal;
