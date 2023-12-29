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
const searchFunctions_1 = require("../../functions/searchFunctions");
const commons_1 = require("../../functions/commons");
function CombinationFilters({ all, setFiltered }) {
    const options = (0, react_1.useMemo)(() => ["전체", "포션", "소모 아이템", "탐지기", "스킬 강화석", "기타"], []);
    const selectRef = (0, react_1.useRef)(null);
    const textRef = (0, react_1.useRef)(null);
    const [text, setText] = (0, react_1.useState)("");
    const updateText = (event) => {
        if (event.target.tagName === "INPUT") {
            const regex = /[`~!@#$^&*_|+\-=?;'",.<>\{\}\[\]\\\/]/g;
            const typed = event.target.value;
            selectRef.current.value = "전체";
            if (typed === "") {
                setText(typed);
                setFiltered(null);
            }
            else if (!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = (0, searchFunctions_1.getSearchedCombinations)(event.target.value.trim());
                setFiltered(searched);
            }
        }
    };
    const filterByType = (event) => {
        setText("");
        const value = event.target.value;
        if (value === "전체")
            setFiltered(null);
        else {
            const typeId = Object.values(enums_1.ItemType).findIndex(each => each === value) + 1;
            const filtered = all.filter(each => each.resultItem.type === typeId);
            setFiltered(filtered);
        }
    };
    const textInput = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("input", { ref: textRef, type: "text", className: "search-input", value: text, onChange: updateText, placeholder: "\uC81C\uC791\uD560 \uC544\uC774\uD15C\uC758 \uC774\uB984 \uD639\uC740 \uCD08\uC131\uC744 \uC785\uB825\uD558\uC138\uC694." });
    }, []);
    return (react_1.default.createElement("div", { className: "combination-filters" },
        react_1.default.createElement("select", { ref: selectRef, onChange: filterByType }, options.map(option => (react_1.default.createElement("option", { value: option, key: (0, commons_1.getUUID)() }, option)))),
        textInput));
}
exports.default = CombinationFilters;
