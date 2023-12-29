"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const digimonSkill_1 = __importDefault(require("./digimonSkill"));
const commons_1 = require("../../functions/commons");
function DigimonSkills({ digimon }) {
    return (react_1.default.createElement("div", { className: "digimon-stat" },
        react_1.default.createElement("span", { className: "title" }, "* \uC2A4\uD0AC"),
        digimon.skills.length > 0 &&
            digimon.skills.map(skill => (react_1.default.createElement(digimonSkill_1.default, { digimonName: digimon.name, skill: skill, key: (0, commons_1.getUUID)() })))));
}
exports.default = DigimonSkills;
