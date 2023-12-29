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
const enums_1 = require("../enums");
const commons_1 = require("../functions/commons");
function Combo({ list, selected, select, selectedGrade }) {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [gradeColor, setGradeColor] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (!selectedGrade)
            return;
        const color = enums_1.GradeClassNames[selectedGrade];
        if (color)
            setGradeColor(color);
    }, [selectedGrade]);
    const toggleList = () => setIsOpen(!isOpen);
    return (react_1.default.createElement("div", { className: `combo ${gradeColor}`, onClick: toggleList },
        react_1.default.createElement("div", { className: "selected" }, selected),
        react_1.default.createElement("div", { className: `list ${isOpen ? "active" : ""}` }, list.length > 0 && list.map((element, index) => (react_1.default.createElement("button", { type: "button", onClick: () => select(element), key: (0, commons_1.getUUID)(), className: "combo-button" }, typeof element === "object" ? element.name : element)))),
        react_1.default.createElement("div", { className: `triangle ${isOpen ? "active" : ""}` }, "\u25BC")));
}
exports.default = Combo;
