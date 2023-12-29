"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const digimonSkillTable_1 = __importDefault(require("./digimonSkillTable"));
function DigimonSkill({ digimonName, skill }) {
    return (react_1.default.createElement("div", { className: "skill" },
        react_1.default.createElement("div", { className: "skill-shortcut" },
            react_1.default.createElement("img", { src: `/images/${digimonName}_${skill.name}.png` }),
            react_1.default.createElement("div", { className: "skill-info" },
                react_1.default.createElement("div", { className: "skill-title" },
                    react_1.default.createElement("span", { className: "skill-name" }, skill.name),
                    react_1.default.createElement("img", { src: `/images/스킬_${skill.element}.png`, title: `${skill.element} 속성` })),
                react_1.default.createElement("div", { className: "badges" },
                    react_1.default.createElement("span", { className: `badge ${skill.range === "근거리" ? "melee" : "ranged"}` }, skill.range),
                    react_1.default.createElement("span", { className: `badge ${skill.target === "적" ? "enemy" : "team"}` },
                        skill.target,
                        " ",
                        skill.targetCount),
                    skill.attackCount === 0 && react_1.default.createElement("span", { className: "badge team" }, "\uBC84\uD504"),
                    skill.attackCount > 0 && react_1.default.createElement("span", { className: "badge ranged" },
                        skill.attackCount,
                        "\uD0C0"),
                    skill.additionalTurn && react_1.default.createElement("span", { className: "badge turn" },
                        skill.additionalTurn,
                        " \uCD94\uAC00 \uC2DC\uC804 \uD134"),
                    skill.effect && react_1.default.createElement("span", { className: "badge effect" }, skill.effect)))),
        react_1.default.createElement(digimonSkillTable_1.default, { skill: skill })));
}
exports.default = DigimonSkill;
