"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
function DigimonStatusTable({ digimon }) {
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "HP"),
                react_1.default.createElement("td", null, "SP"),
                react_1.default.createElement("td", null, "\uD798"),
                react_1.default.createElement("td", null, "\uC9C0\uB2A5"),
                react_1.default.createElement("td", null, "\uC18D\uB3C4"),
                react_1.default.createElement("td", null, "\uC218\uBE44"),
                react_1.default.createElement("td", null, "\uC800\uD56D"))),
        react_1.default.createElement("tbody", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, (0, commons_1.getCommaString)(digimon.hp)),
                react_1.default.createElement("td", null, (0, commons_1.getCommaString)(digimon.sp)),
                react_1.default.createElement("td", null, (0, commons_1.getCommaString)(digimon.str)),
                react_1.default.createElement("td", null, (0, commons_1.getCommaString)(digimon.int)),
                react_1.default.createElement("td", null, (0, commons_1.getCommaString)(digimon.spd)),
                react_1.default.createElement("td", null, (0, commons_1.getCommaString)(digimon.def)),
                react_1.default.createElement("td", null, (0, commons_1.getCommaString)(digimon.res))))));
}
exports.default = DigimonStatusTable;
