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
const functions_1 = require("../../functions");
const commons_1 = require("../../functions/commons");
const searchFunctions_1 = require("../../functions/searchFunctions");
function Filters({ selectedDigimon, setSelectedDigimon }) {
    const [selectedGrade, setSelectedGrade] = (0, react_1.useState)("전체");
    const [text, setText] = (0, react_1.useState)("");
    const [filtered, setFiltered] = (0, react_1.useState)([]);
    const [isFold, setIsFold] = (0, react_1.useState)(true);
    const all = (0, functions_1.getAllEvolutions)(false);
    const grades = Object.values(enums_1.Grades);
    (0, react_1.useEffect)(() => {
        if (selectedGrade === "전체") {
            setFiltered([...all]);
            return;
        }
        const grade = grades.indexOf(selectedGrade) + 1;
        setFiltered([...all.filter(each => each.grade === grade)]);
    }, [selectedGrade]);
    const updateText = (event) => {
        const target = event.target;
        if (target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = target.value.trim();
            if (typed === "") {
                setText(typed);
                if (selectedGrade === "전체") {
                    setFiltered([...all]);
                    return;
                }
                const grade = grades.indexOf(selectedGrade) + 1;
                setFiltered([...all.filter(each => each.grade === grade)]);
            }
            else if (!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = (0, searchFunctions_1.getSearchedEvolutions)(target.value.trim());
                setFiltered(searched);
            }
        }
    };
    const selectDigimon = (evolution) => {
        if ((selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.id) !== evolution.id) {
            (0, functions_1.getEvolutions)(evolution);
            setSelectedDigimon(evolution);
        }
    };
    const textInput = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("input", { type: "text", value: text, onChange: updateText, placeholder: "\uB514\uC9C0\uBAAC \uCD08\uC131 \uD639\uC740 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694." });
    }, [text]);
    return (react_1.default.createElement("div", { className: "filters" },
        react_1.default.createElement("div", { className: "digidex-filter2" },
            react_1.default.createElement("div", { className: "title" }, "\uC9C4\uD654 \uB2E8\uACC4"),
            react_1.default.createElement("div", { className: "checkboxes" },
                react_1.default.createElement("label", { htmlFor: "evo-all", className: selectedGrade === "전체" ? "checked" : "" },
                    react_1.default.createElement("input", { type: "radio", id: "evo-all", checked: selectedGrade === "전체", onChange: (event) => setSelectedGrade("전체") }),
                    react_1.default.createElement("img", { src: "/images/filter_all.png" }),
                    react_1.default.createElement("span", null, "\uC804\uCCB4")),
                grades.map(grade => (react_1.default.createElement("label", { htmlFor: grade, key: (0, commons_1.getUUID)(), className: selectedGrade === grade ? "checked" : "" },
                    react_1.default.createElement("input", { type: "radio", id: grade, checked: selectedGrade === grade, onChange: (event) => setSelectedGrade(grade) }),
                    react_1.default.createElement("img", { src: `/images/무배경_${grade === "유년기1" ? "쟈리몬" : grade === "유년기2" ? "기기몬" : grade === "성장기" ? "길몬" : grade === "성숙기" ? "그라우몬" : grade === "완전체" ? "메가로그라우몬" : "듀크몬"}.png` }),
                    react_1.default.createElement("span", null, grade)))))),
        react_1.default.createElement("div", { className: "search-bar" }, textInput),
        react_1.default.createElement("div", { className: "filtered-list-container" },
            react_1.default.createElement("div", { className: `filtered-list ${isFold ? "fold" : ""}` }, filtered.map(each => (react_1.default.createElement("button", { type: "button", className: "filtered-evolution", key: (0, commons_1.getUUID)(), onClick: () => selectDigimon(each) },
                react_1.default.createElement("img", { src: `/images/${each.name}.png` }),
                each.tag ? react_1.default.createElement("span", { dangerouslySetInnerHTML: { __html: each.tag } }) :
                    react_1.default.createElement("span", null, each.name))))),
            react_1.default.createElement("button", { type: "button", className: "spread", onClick: () => setIsFold(!isFold) }, isFold ? "▼" : "▲"))));
}
exports.default = Filters;
