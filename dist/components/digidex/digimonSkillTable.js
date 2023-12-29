"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
function DigimonSkillTable({ skill }) {
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "1\uB808\uBCA8"),
                react_1.default.createElement("td", null, "2\uB808\uBCA8"),
                react_1.default.createElement("td", null, "3\uB808\uBCA8"),
                react_1.default.createElement("td", null, "4\uB808\uBCA8"),
                react_1.default.createElement("td", null, "5\uB808\uBCA8"),
                react_1.default.createElement("td", null, "6\uB808\uBCA8"),
                react_1.default.createElement("td", null, "7\uB808\uBCA8"),
                react_1.default.createElement("td", null, "8\uB808\uBCA8"),
                react_1.default.createElement("td", null, "9\uB808\uBCA8"),
                react_1.default.createElement("td", null, "10\uB808\uBCA8"))),
        react_1.default.createElement("tbody", null,
            react_1.default.createElement("tr", null, skill.coefficients.map((co, index) => (react_1.default.createElement("td", { key: (0, commons_1.getUUID)() },
                skill.getPercentByIndex(index),
                "%")))))));
}
exports.default = DigimonSkillTable;
