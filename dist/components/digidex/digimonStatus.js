"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const digimonStatusTable_1 = __importDefault(require("./digimonStatusTable"));
const commons_1 = require("../../functions/commons");
const functions_1 = require("../../functions");
function DigimonStatus({ digimon }) {
    return (react_1.default.createElement("div", { className: "digimon-stats" },
        react_1.default.createElement("div", { className: "digimon-stat" },
            react_1.default.createElement("span", { className: "title" }, "* \uC2A4\uD14C\uC774\uD130\uC2A4"),
            react_1.default.createElement(digimonStatusTable_1.default, { digimon: digimon }),
            react_1.default.createElement("div", { className: "digimon-quality" },
                react_1.default.createElement("img", { src: `/images/${digimon.strength} 강점.png` }),
                react_1.default.createElement("span", null,
                    digimon.strength,
                    " - ",
                    digimon.strengthEffect),
                react_1.default.createElement("span", { className: "description", dangerouslySetInnerHTML: { __html: (0, functions_1.getDigimonQualityText)(digimon.strengthEffect) } })),
            react_1.default.createElement("div", { className: "digimon-quality" },
                react_1.default.createElement("img", { src: `/images/${digimon.weakness} 약점.png` }),
                react_1.default.createElement("span", null,
                    digimon.weakness,
                    " - ",
                    digimon.weaknessEffect),
                react_1.default.createElement("span", { className: "description", dangerouslySetInnerHTML: { __html: (0, functions_1.getDigimonQualityText)(digimon.weaknessEffect) } }))),
        react_1.default.createElement("div", { className: "digimon-stat" },
            react_1.default.createElement("span", { className: "title" }, "* \uD544\uB4DC \uD0C0\uC785"),
            react_1.default.createElement("div", { className: "field-types" }, digimon.fieldTypes.map(fieldType => react_1.default.createElement("img", { src: `/images/field_${fieldType}.png`, title: fieldType, key: (0, commons_1.getUUID)() }))))));
}
exports.default = DigimonStatus;
