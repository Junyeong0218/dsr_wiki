"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const enums_1 = require("../../enums");
const commons_1 = require("../../functions/commons");
const searchFunctions_1 = require("../../functions/searchFunctions");
function DigidexFilter({ selectedGrade, setSelectedGrade, selectedType, setSelectedType, selectedElement, setSelectedElement, all, setFiltered }) {
    const grades = Object.values(enums_1.Grades).filter(each => each !== "유년기1" && each !== "유년기2");
    const digimonTypes = Object.values(enums_1.DigimonTypes);
    const elements = Object.values(enums_1.Elements);
    const [text, setText] = (0, react_1.useState)("");
    const textRef = (0, react_1.useRef)(null);
    const updateText = (event) => {
        if (event.target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = event.target.value;
            setSelectedGrade("전체");
            setSelectedType("전체");
            setSelectedElement("전체");
            if (typed === "") {
                setText(typed);
                setFiltered(all);
            }
            else if (!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = (0, searchFunctions_1.getSearchedDigimons)(event.target.value.trim());
                setFiltered(searched);
            }
        }
    };
    const textInput = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("input", { ref: textRef, type: "text", className: "digidex-search-input", value: text, onChange: updateText, placeholder: "\uB514\uC9C0\uBAAC \uC774\uB984 \uD639\uC740 \uCD08\uC131\uC744 \uC785\uB825\uD558\uC138\uC694" });
    }, [text]);
    return (react_1.default.createElement("div", { className: "digidex-filters" },
        react_1.default.createElement("select", { className: "digidex-filter", defaultValue: selectedGrade, onChange: (e) => setSelectedGrade(e.target.value), key: (0, commons_1.getUUID)() },
            react_1.default.createElement("option", { value: "\uC804\uCCB4" }, "\uC9C4\uD654\uB3C4 \uC804\uCCB4"),
            grades.map(grade => (react_1.default.createElement("option", { value: grade, key: (0, commons_1.getUUID)() }, grade)))),
        react_1.default.createElement("select", { className: "digidex-filter", defaultValue: selectedType, onChange: (e) => setSelectedType(e.target.value), key: (0, commons_1.getUUID)() },
            react_1.default.createElement("option", { value: "\uC804\uCCB4" }, "\uD0C0\uC785 \uC804\uCCB4"),
            digimonTypes.map(type => (react_1.default.createElement("option", { value: type, key: (0, commons_1.getUUID)() }, type)))),
        react_1.default.createElement("select", { className: "digidex-filter", defaultValue: selectedElement, onChange: (e) => setSelectedElement(e.target.value), key: (0, commons_1.getUUID)() },
            react_1.default.createElement("option", { value: "\uC804\uCCB4" }, "\uC2A4\uD0AC\uC18D\uC131 \uC804\uCCB4"),
            elements.map(element => (react_1.default.createElement("option", { value: element, key: (0, commons_1.getUUID)() }, element)))),
        textInput));
}
exports.default = DigidexFilter;
