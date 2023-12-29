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
const functions_1 = require("../../functions");
const react_router_dom_1 = require("react-router-dom");
const commons_1 = require("../../functions/commons");
const evolutions_1 = __importDefault(require("./evolutions"));
const digimonInfo_1 = __importDefault(require("./digimonInfo"));
const enums_1 = require("../../enums");
const digidexFilter_1 = __importDefault(require("./digidexFilter"));
function Digidex() {
    const location = (0, react_router_dom_1.useLocation)();
    const query = location.search;
    const selected = query.trim() === "" ? null : decodeURIComponent(query.replace("?digimon=", ""));
    if (selected) {
        return (react_1.default.createElement("div", { className: "digidex" },
            react_1.default.createElement(evolutions_1.default, { selected: selected }),
            react_1.default.createElement(digimonInfo_1.default, { selected: selected })));
    }
    const all = (0, functions_1.getAllDigimons)(false);
    const [filtered, setFiltered] = (0, react_1.useState)(all);
    const [selectedGrade, setSelectedGrade] = (0, react_1.useState)(localStorage.getItem("grade") || "전체");
    const [selectedType, setSelectedType] = (0, react_1.useState)(localStorage.getItem("type") || "전체");
    const [selectedElement, setSelectedElement] = (0, react_1.useState)(localStorage.getItem("element") || "전체");
    (0, react_1.useEffect)(() => {
        if (selectedGrade === "전체" && selectedType === "전체" && selectedElement === "전체") {
            localStorage.removeItem("grade");
            localStorage.removeItem("type");
            localStorage.removeItem("element");
            setFiltered(all);
            return;
        }
        let digimons = all;
        if (selectedGrade !== "전체") {
            digimons = digimons.filter(digimon => digimon.grade === Object.values(enums_1.Grades).indexOf(selectedGrade) + 1);
            localStorage.setItem("grade", selectedGrade);
        }
        if (selectedType !== "전체") {
            digimons = digimons.filter(digimon => digimon.digimonType === Object.values(enums_1.DigimonTypesEng)[Object.values(enums_1.DigimonTypes).indexOf(selectedType)]);
            localStorage.setItem("type", selectedType);
        }
        if (selectedElement !== "전체") {
            digimons = digimons.filter(digimon => {
                for (let i = 0; i < digimon.skills.length; i++) {
                    if (digimon.skills[i].element === selectedElement)
                        return true;
                }
                return false;
            });
            localStorage.setItem("element", selectedElement);
        }
        setFiltered(digimons);
    }, [selectedGrade, selectedType, selectedElement]);
    return (react_1.default.createElement("div", { className: "digidex" },
        react_1.default.createElement(digidexFilter_1.default, { selectedGrade: selectedGrade, setSelectedGrade: setSelectedGrade, selectedType: selectedType, setSelectedType: setSelectedType, selectedElement: selectedElement, setSelectedElement: setSelectedElement, all: all, setFiltered: setFiltered }),
        filtered.map(each => {
            const style = each.name.length > 8 ? { fontSize: "12px" } : {};
            return react_1.default.createElement(react_router_dom_1.Link, { to: `/digidex?digimon=${each.name}`, key: (0, commons_1.getUUID)() },
                react_1.default.createElement("button", { type: "button", className: "digimon-button" },
                    react_1.default.createElement("img", { src: `/images/${each.name}.png`, loading: "lazy" }),
                    each.tag ? react_1.default.createElement("span", { style: style, dangerouslySetInnerHTML: { __html: each.tag } }) : react_1.default.createElement("span", { style: style }, each.name)));
        })));
}
exports.default = Digidex;
