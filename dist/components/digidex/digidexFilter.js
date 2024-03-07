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
function DigidexFilter({ all, sortFilters, setFiltered }) {
    const grades = Object.values(enums_1.Grades).filter(each => each !== "유년기1" && each !== "유년기2");
    const digimonTypes = Object.values(enums_1.DigimonTypes);
    const digimonTypesEng = Object.values(enums_1.DigimonTypesEng);
    const elements = Object.values(enums_1.Elements);
    const defaultCondition = {
        grades: [...grades],
        digimonTypes: [...digimonTypes],
        elements: [...elements],
        strengths: [...elements],
        weaknesses: [...elements]
    };
    const prevConditions = localStorage.getItem("digidex_conditions");
    const [conditions, setConditions] = (0, react_1.useState)(!prevConditions ? defaultCondition : JSON.parse(prevConditions));
    if (!conditions["strengths"])
        conditions["strengths"] = [...elements];
    if (!conditions["weaknesses"])
        conditions["weaknesses"] = [...elements];
    const prevText = localStorage.getItem("digidex_search");
    const [text, setText] = (0, react_1.useState)(prevText ? prevText : "");
    const textRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        localStorage.setItem("digidex_conditions", JSON.stringify(conditions));
        let filtered = [...all].filter(each => {
            return conditions["grades"].includes(enums_1.Grades[each.grade]) &&
                conditions["digimonTypes"].includes(digimonTypes[digimonTypesEng.indexOf(each.digimonType)]);
        });
        filtered = filtered.filter(each => {
            for (let i = 0; i < each.skills.length; i++) {
                if (conditions["elements"].includes(each.skills[i].element))
                    return true;
            }
            return false;
        });
        filtered = filtered.filter(each => conditions.strengths.includes(each.strength));
        filtered = filtered.filter(each => conditions.weaknesses.includes(each.weakness));
        filtered = filtered.sort((a, b) => {
            let result = 0;
            for (let i = 0; i < sortFilters.length; i++) {
                let innerResult = 0;
                const filter = sortFilters[i];
                let aValue;
                let bValue;
                if (filter.type.includes("skill")) {
                    const index = Number(filter.type.substring(0, 1)) - 1;
                    const aSkill = a.skills[index];
                    const bSkill = b.skills[index];
                    if (aSkill)
                        aValue = aSkill.attackCount * aSkill.coefficients[9];
                    else
                        aValue = 0;
                    if (bSkill)
                        bValue = bSkill.attackCount * bSkill.coefficients[9];
                    else
                        bValue = 0;
                }
                else {
                    aValue = a[filter.type];
                    bValue = b[filter.type];
                    // if(filter.method === "asc") {
                    //     result = a.name.localeCompare(b.name);
                    // } else {
                    //     result = b.name.localeCompare(a.name);
                    // }
                }
                if (typeof aValue === "number" && typeof bValue === "number") {
                    if (filter.method === "asc")
                        innerResult = aValue - bValue;
                    else
                        innerResult = bValue - aValue;
                }
                else if (typeof aValue === "string" && typeof bValue === "string") {
                    if (filter.method === "asc")
                        innerResult = aValue.localeCompare(bValue);
                    else
                        innerResult = bValue.localeCompare(aValue);
                }
                if (innerResult !== 0) {
                    result = innerResult;
                    break;
                }
            }
            return result;
        });
        setFiltered([...filtered]);
    }, [conditions, sortFilters]);
    const toggleAll = (event, flag) => {
        const target = event.target;
        if (target.checked) {
            localStorage.removeItem("digidex_conditions");
            defaultCondition[`${flag}`].forEach(e => {
                if (!conditions[`${flag}`].includes(e))
                    conditions[`${flag}`].push(e);
            });
        }
        else {
            conditions[`${flag}`] = [];
        }
        setConditions(Object.assign({}, conditions));
    };
    const toggleCheckbox = (event, flag, value) => {
        const target = event.target;
        console.log(flag);
        if (target.checked) {
            conditions[`${flag}`].push(value);
        }
        else {
            conditions[`${flag}`].splice(conditions[`${flag}`].findIndex(e => e === value), 1);
        }
        setConditions(Object.assign({}, conditions));
    };
    const updateText = (event) => {
        if (event.target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = event.target.value;
            // setConditions({...defaultCondition});
            if (typed === "") {
                localStorage.removeItem("digidex_search");
                setText(typed);
                setConditions(Object.assign({}, conditions));
            }
            else if (!regex.test(typed) && typed !== "") {
                localStorage.setItem("digidex_search", typed);
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
        react_1.default.createElement("div", { className: "digidex-filter2" },
            react_1.default.createElement("div", { className: "title" }, "\uC9C4\uD654 \uB2E8\uACC4"),
            react_1.default.createElement("div", { className: "checkboxes" },
                react_1.default.createElement("label", { htmlFor: "evo-all", className: conditions.grades.length === grades.length ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: "evo-all", checked: conditions.grades.length === grades.length, onChange: (event) => toggleAll(event, "grades") }),
                    react_1.default.createElement("img", { src: `/images/filter_all.png` }),
                    react_1.default.createElement("span", null, "\uC804\uCCB4")),
                grades.map(grade => (react_1.default.createElement("label", { htmlFor: grade, key: (0, commons_1.getUUID)(), className: conditions.grades.includes(grade) ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: grade, checked: conditions.grades.includes(grade), onChange: (event) => toggleCheckbox(event, "grades", grade) }),
                    react_1.default.createElement("img", { src: `/images/무배경_${grade === "성장기" ? "길몬" : grade === "성숙기" ? "그라우몬" : grade === "완전체" ? "메가로그라우몬" : "듀크몬"}.png` }),
                    react_1.default.createElement("span", null, grade)))))),
        react_1.default.createElement("div", { className: "digidex-filter2" },
            react_1.default.createElement("div", { className: "title" }, "\uD0C0\uC785"),
            react_1.default.createElement("div", { className: "checkboxes" },
                react_1.default.createElement("label", { htmlFor: "type-all", className: conditions.digimonTypes.length === digimonTypes.length ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: "type-all", checked: conditions.digimonTypes.length === digimonTypes.length, onChange: (event) => toggleAll(event, "digimonTypes") }),
                    react_1.default.createElement("img", { src: `/images/filter_all.png` }),
                    react_1.default.createElement("span", null, "\uC804\uCCB4")),
                digimonTypes.map((type, index) => (react_1.default.createElement("label", { htmlFor: type, key: (0, commons_1.getUUID)(), className: conditions.digimonTypes.includes(type) ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: type, checked: conditions.digimonTypes.includes(type), onChange: (event) => toggleCheckbox(event, "digimonTypes", type) }),
                    react_1.default.createElement("img", { src: `/images/${Object.values(enums_1.DigimonTypesEng)[index]}.png` }),
                    react_1.default.createElement("span", null, type)))))),
        react_1.default.createElement("div", { className: "digidex-filter2" },
            react_1.default.createElement("div", { className: "title" }, "\uC2A4\uD0AC\uC18D\uC131"),
            react_1.default.createElement("div", { className: "checkboxes" },
                react_1.default.createElement("label", { htmlFor: "element-all", className: conditions.elements.length === elements.length ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: "element-all", checked: conditions.elements.length === elements.length, onChange: (event) => toggleAll(event, "elements") }),
                    react_1.default.createElement("img", { src: `/images/filter_all.png` }),
                    react_1.default.createElement("span", null, "\uC804\uCCB4")),
                elements.map(element => (react_1.default.createElement("label", { htmlFor: element, key: (0, commons_1.getUUID)(), className: conditions.elements.includes(element) ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: element, checked: conditions.elements.includes(element), onChange: (event) => toggleCheckbox(event, "elements", element) }),
                    react_1.default.createElement("img", { src: `/images/스킬_${element}.png` }),
                    react_1.default.createElement("span", null, element)))))),
        react_1.default.createElement("div", { className: "digidex-filter2" },
            react_1.default.createElement("div", { className: "title" }, "\uAC15\uC810"),
            react_1.default.createElement("div", { className: "checkboxes" },
                react_1.default.createElement("label", { htmlFor: "strength-all", className: conditions.strengths.length === elements.length ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: "strength-all", checked: conditions.strengths.length === elements.length, onChange: (event) => toggleAll(event, "strengths") }),
                    react_1.default.createElement("img", { src: `/images/filter_all.png` }),
                    react_1.default.createElement("span", null, "\uC804\uCCB4")),
                elements.map(element => (react_1.default.createElement("label", { htmlFor: `강점_${element}`, key: (0, commons_1.getUUID)(), className: conditions.strengths.includes(element) ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: `강점_${element}`, checked: conditions.strengths.includes(element), onChange: (event) => toggleCheckbox(event, "strengths", element) }),
                    react_1.default.createElement("img", { src: `/images/스킬_${element}.png` }),
                    react_1.default.createElement("span", null, element)))))),
        react_1.default.createElement("div", { className: "digidex-filter2" },
            react_1.default.createElement("div", { className: "title" }, "\uC57D\uC810"),
            react_1.default.createElement("div", { className: "checkboxes" },
                react_1.default.createElement("label", { htmlFor: "weakness-all", className: conditions.weaknesses.length === elements.length ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: "weakness-all", checked: conditions.weaknesses.length === elements.length, onChange: (event) => toggleAll(event, "weaknesses") }),
                    react_1.default.createElement("img", { src: `/images/filter_all.png` }),
                    react_1.default.createElement("span", null, "\uC804\uCCB4")),
                elements.map(element => (react_1.default.createElement("label", { htmlFor: `약점_${element}`, key: (0, commons_1.getUUID)(), className: conditions.weaknesses.includes(element) ? "checked" : "" },
                    react_1.default.createElement("input", { type: "checkbox", id: `약점_${element}`, checked: conditions.weaknesses.includes(element), onChange: (event) => toggleCheckbox(event, "weaknesses", element) }),
                    react_1.default.createElement("img", { src: `/images/스킬_${element}.png` }),
                    react_1.default.createElement("span", null, element)))))),
        textInput));
}
exports.default = DigidexFilter;
