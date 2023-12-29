"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enums_1 = require("../../enums");
const commons_1 = require("../../functions/commons");
function DigidexFilter({ selectedGrade, setSelectedGrade, selectedType, setSelectedType, selectedElement, setSelectedElement }) {
    const grades = Object.values(enums_1.Grades).filter(each => each !== "유년기1" && each !== "유년기2");
    const digimonTypes = Object.values(enums_1.DigimonTypes);
    const elements = Object.values(enums_1.Elements);
    return (react_1.default.createElement("div", { className: "digidex-filters" },
        react_1.default.createElement("select", { className: "digidex-filter", defaultValue: selectedGrade, onChange: (e) => setSelectedGrade(e.target.value), key: (0, commons_1.getUUID)() },
            react_1.default.createElement("option", { value: "\uC804\uCCB4" }, "\uC9C4\uD654\uB3C4 \uC804\uCCB4"),
            grades.map(grade => (react_1.default.createElement("option", { value: grade, key: (0, commons_1.getUUID)() }, grade)))),
        react_1.default.createElement("select", { className: "digidex-filter", defaultValue: selectedType, onChange: (e) => setSelectedType(e.target.value), key: (0, commons_1.getUUID)() },
            react_1.default.createElement("option", { value: "\uC804\uCCB4" }, "\uD0C0\uC785 \uC804\uCCB4"),
            digimonTypes.map(type => (react_1.default.createElement("option", { value: type, key: (0, commons_1.getUUID)() }, type)))),
        react_1.default.createElement("select", { className: "digidex-filter", defaultValue: selectedElement, onChange: (e) => setSelectedElement(e.target.value), key: (0, commons_1.getUUID)() },
            react_1.default.createElement("option", { value: "\uC804\uCCB4" }, "\uC2A4\uD0AC\uC18D\uC131 \uC804\uCCB4"),
            elements.map(element => (react_1.default.createElement("option", { value: element, key: (0, commons_1.getUUID)() }, element))))));
}
exports.default = DigidexFilter;
