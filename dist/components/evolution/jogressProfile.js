"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function JogressProfile({ digimon, top }) {
    const fileName = digimon.name.includes("[돌연변이]") ? digimon.name.replace("[돌연변이]", "") :
        digimon.name;
    return (react_1.default.createElement("div", { className: "profile jogress", style: { top: `${top}px`, left: "5px" } },
        react_1.default.createElement("img", { src: `/images/${fileName}.png` }),
        react_1.default.createElement("span", null, digimon.name)));
}
exports.default = JogressProfile;
