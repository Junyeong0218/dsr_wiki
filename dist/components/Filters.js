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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const combo_1 = __importDefault(require("./combo"));
const enums_1 = require("../enums");
const functions_1 = require("../functions");
function Filters({ selectedDigimon, setSelectedDigimon }) {
    const [selectedGrade, setSelectedGrade] = (0, react_1.useState)(null);
    const [grades, setGrades] = (0, react_1.useState)(Object.values(enums_1.Grades));
    const [all, setAll] = (0, react_1.useState)((0, functions_1.getAllEvolutions)(false));
    const [filtered, setFiltered] = (0, react_1.useState)([]);
    const changeGrade = (grade) => {
        setSelectedGrade(grade);
        const temp = new Array();
        all.forEach(each => {
            if (enums_1.Grades[each.grade] === grade)
                temp.push(each);
        });
        setFiltered(temp);
    };
    const digimonComboText = selectedDigimon ? selectedDigimon.name :
        selectedGrade ? "디지몬 선택" : "";
    const selectDigimon = (evolution) => {
        if ((selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.id) !== evolution.id) {
            (0, functions_1.getEvolutions)(evolution);
            setSelectedDigimon(evolution);
        }
    };
    const gradeCombo = (0, react_1.useMemo)(() => {
        return react_1.default.createElement(combo_1.default, { list: grades, selected: selectedGrade || "진화 상태", select: changeGrade, selectedGrade: selectedGrade, key: "grade_combobox" });
    }, [selectedGrade]);
    const digimonCombo = (0, react_1.useMemo)(() => {
        return react_1.default.createElement(combo_1.default, { list: filtered, selected: digimonComboText, select: selectDigimon, selectedGrade: selectedGrade, key: "digimon_combobox" });
    }, [selectedGrade, selectedDigimon]);
    return (react_1.default.createElement("div", { className: "filters" },
        gradeCombo,
        digimonCombo));
}
exports.default = Filters;
