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
const digimonInfo_1 = __importDefault(require("./digimonInfo"));
const digidexFilter_1 = __importDefault(require("./digidexFilter"));
const enums_1 = require("../../enums");
const getSortText_1 = __importDefault(require("../../functions/getSortText"));
class FilterObj {
    constructor() {
        this.type = "";
        this.method = "";
    }
}
const FilterTypes = {
    "name": "이름",
    "grade": "진화단계",
    "hp": "HP",
    "sp": "SP",
    "str": "힘",
    "int": "지능",
    "spd": "속도",
    "def": "수비",
    "res": "저항",
    "1skill": "1스킬",
    "2skill": "2스킬",
    "3skill": "3스킬"
};
function Digidex() {
    const location = (0, react_router_dom_1.useLocation)();
    const query = location.search;
    const selected = query.trim() === "" ? null : decodeURIComponent(query.replace("?digimon=", ""));
    // 지난 잔재 제거
    localStorage.removeItem("grade");
    localStorage.removeItem("type");
    localStorage.removeItem("element");
    if (selected) {
        return (react_1.default.createElement("div", { className: "main" },
            react_1.default.createElement("div", { className: "digidex", style: { flexWrap: "nowrap" } },
                react_1.default.createElement(digimonInfo_1.default, { selected: selected }))));
    }
    const createFilters = (includeList) => {
        const list = [];
        if (includeList !== undefined && includeList !== null)
            includeList.forEach(e => list.push(e));
        const length = includeList === undefined || includeList === null ? 0 : includeList.length;
        for (let i = 0; i < 12 - length; i++)
            list.push(new FilterObj());
        return list;
    };
    const localStorageFilterData = localStorage.getItem("sortFilters");
    const defaultFilters = [];
    const loadedFilterData = localStorageFilterData ? JSON.parse(localStorageFilterData) : null;
    const all = (0, functions_1.getAllDigimons)(false);
    const [sortFilters, setSortFilters] = (0, react_1.useState)(loadedFilterData !== null && loadedFilterData !== void 0 ? loadedFilterData : defaultFilters);
    const [filtered, setFiltered] = (0, react_1.useState)(all);
    const [isTable, setIsTable] = (0, react_1.useState)(false);
    const [isOpenSortModal, setIsOpenSortModal] = (0, react_1.useState)(false);
    const [tempSorts, setTempSorts] = (0, react_1.useState)(createFilters(loadedFilterData));
    const filterOptionContainer = (0, react_1.useRef)(null);
    const pushToTemp = (event, index) => {
        tempSorts[index].type = event.target.value;
        setTempSorts([...tempSorts]);
    };
    const pushMethodToTemp = (eng, index) => {
        tempSorts[index].method = eng;
        setTempSorts([...tempSorts]);
    };
    const applySort = () => {
        var _a, _b;
        const selectedSorts = [];
        for (let i = 0; i < 12; i++) {
            const type = ((_a = filterOptionContainer.current) === null || _a === void 0 ? void 0 : _a.querySelector(`#sort${i + 1}_type`)).value;
            const method = ((_b = filterOptionContainer.current) === null || _b === void 0 ? void 0 : _b.querySelector(`#sort${i + 1}_method`)).value;
            if (type !== "" && method !== "") {
                selectedSorts.push({
                    type, method
                });
            }
        }
        const temp = [...selectedSorts];
        for (let i = temp.length; i < 12; i++) {
            temp.push(new FilterObj());
        }
        localStorage.setItem("sortFilters", JSON.stringify(selectedSorts));
        setTempSorts(temp);
        setSortFilters(selectedSorts);
        setIsOpenSortModal(false);
    };
    const digidexTable = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("table", { className: "digidex-table" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "\uC774\uB984"),
                    react_1.default.createElement("td", null, "\uC9C4\uD654\uB2E8\uACC4"),
                    react_1.default.createElement("td", null, "\uD0C0\uC785"),
                    react_1.default.createElement("td", null, "HP"),
                    react_1.default.createElement("td", null, "SP"),
                    react_1.default.createElement("td", null, "\uD798"),
                    react_1.default.createElement("td", null, "\uC9C0\uB2A5"),
                    react_1.default.createElement("td", null, "\uC218\uBE44"),
                    react_1.default.createElement("td", null, "\uC800\uD56D"),
                    react_1.default.createElement("td", null, "\uC18D\uB3C4"),
                    react_1.default.createElement("td", null, "\uAC15\uC810"),
                    react_1.default.createElement("td", null, "\uC57D\uC810"),
                    react_1.default.createElement("td", null, "1\uC2A4\uD0AC"),
                    react_1.default.createElement("td", null, "2\uC2A4\uD0AC"),
                    react_1.default.createElement("td", null, "3\uC2A4\uD0AC"))),
            react_1.default.createElement("tbody", null, filtered.map(each => (react_1.default.createElement("tr", { key: (0, commons_1.getUUID)() },
                react_1.default.createElement("td", null,
                    react_1.default.createElement("img", { src: `/images/${each.name}.png` }),
                    "\u00A0",
                    each.name),
                react_1.default.createElement("td", null, enums_1.Grades[each.grade]),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("img", { src: `/images/${each.digimonType}.png` })),
                react_1.default.createElement("td", null, each.hp.toLocaleString("ko-KR")),
                react_1.default.createElement("td", null, each.sp.toLocaleString("ko-KR")),
                react_1.default.createElement("td", null, each.str.toLocaleString("ko-KR")),
                react_1.default.createElement("td", null, each.int.toLocaleString("ko-KR")),
                react_1.default.createElement("td", null, each.def.toLocaleString("ko-KR")),
                react_1.default.createElement("td", null, each.res.toLocaleString("ko-KR")),
                react_1.default.createElement("td", null, each.spd.toLocaleString("ko-KR")),
                react_1.default.createElement("td", { title: (0, functions_1.getDigimonQualityText)(each.strengthEffect, false) },
                    react_1.default.createElement("img", { src: `/images/${each.strength} 강점.png` }),
                    "\u00A0",
                    each.strengthEffect),
                react_1.default.createElement("td", { title: (0, functions_1.getDigimonQualityText)(each.weaknessEffect, false) },
                    react_1.default.createElement("img", { src: `/images/${each.weakness} 약점.png` }),
                    "\u00A0",
                    each.weaknessEffect),
                each.skills.map(skill => {
                    let className = "";
                    if (skill.targetCount === "전체")
                        className += "global ";
                    if (skill.additionalTurn)
                        className += "casting ";
                    if (skill.range === "근거리")
                        className += "melee";
                    if (skill.range === "원거리")
                        className += "ranged";
                    return react_1.default.createElement("td", { className: className, key: (0, commons_1.getUUID)() },
                        react_1.default.createElement("img", { src: `/images/스킬_${skill.element}.png` }),
                        skill.effect ? " " : "",
                        skill.effect && skill.effect !== "회복" && react_1.default.createElement("img", { src: `/images/스킬_${skill.effect}.png`, title: skill.effect }),
                        skill.effect && skill.effect === "회복" && ` ${skill.effect}`,
                        skill.attackCount > 0 && ` ${skill.attackCount}타`,
                        skill.attackCount > 0 && ` ${skill.getPercentByIndex(9)}%`);
                }),
                each.skills.length < 3 && react_1.default.createElement("td", null))))));
    }, [filtered]);
    const digimonButtons = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("div", { className: "digimon-buttons" }, filtered.map(each => {
            const style = each.name.length > 8 ? { fontSize: "12px" } : {};
            return react_1.default.createElement(react_router_dom_1.Link, { to: `/digimons/digidex?digimon=${each.name}`, key: (0, commons_1.getUUID)() },
                react_1.default.createElement("button", { type: "button", className: "digimon-button" },
                    react_1.default.createElement("img", { src: `/images/${each.name}.png`, loading: "lazy" }),
                    each.tag ? react_1.default.createElement("span", { style: style, dangerouslySetInnerHTML: { __html: each.tag } }) : react_1.default.createElement("span", { style: style }, each.name)));
        }));
    }, [filtered]);
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "digidex" },
            react_1.default.createElement(digidexFilter_1.default, { all: all, sortFilters: sortFilters, setFiltered: setFiltered }),
            react_1.default.createElement("div", { className: "toggle-table-container" },
                react_1.default.createElement("div", { className: "sort-container" },
                    react_1.default.createElement("button", { type: "button", className: sortFilters.length !== 0 ? "filtered" : "", onClick: () => setIsOpenSortModal(!isOpenSortModal) },
                        sortFilters.length === 0 && "정렬 옵션",
                        sortFilters.length !== 0 &&
                            sortFilters.map(filter => {
                                const arrow = filter.method === "desc" ? "↓" : "↑";
                                const name = (0, getSortText_1.default)(filter.type);
                                return `${name} ${arrow}`;
                            }).join("  ")),
                    react_1.default.createElement("div", { id: "sort-modal", className: `modal ${isOpenSortModal ? "active" : ""}` },
                        react_1.default.createElement("div", { className: "window" },
                            react_1.default.createElement("div", { className: "title" }, "\uC815\uB82C \uC635\uC158 \uC124\uC815"),
                            react_1.default.createElement("div", { className: "options", ref: filterOptionContainer }, tempSorts.map((tempValue, index) => {
                                return react_1.default.createElement("div", { className: "row", key: (0, commons_1.getUUID)() },
                                    react_1.default.createElement("span", null,
                                        index + 1,
                                        "\uC21C\uC704"),
                                    react_1.default.createElement("select", { name: `sort${index + 1}_type`, id: `sort${index + 1}_type`, onChange: (event) => pushToTemp(event, index), defaultValue: tempValue.type },
                                        react_1.default.createElement("option", { value: "" }, "\uC635\uC158"),
                                        Object.keys(FilterTypes).map(eng => (react_1.default.createElement("option", { key: (0, commons_1.getUUID)(), value: eng }, FilterTypes[eng])))),
                                    react_1.default.createElement("select", { name: `sort${index + 1}_method`, id: `sort${index + 1}_method`, onChange: (event) => pushMethodToTemp(event.target.value, index), defaultValue: tempValue.method },
                                        react_1.default.createElement("option", { value: "" }, "\uC815\uB82C \uBC29\uC2DD"),
                                        react_1.default.createElement("option", { value: "asc" }, "\uC624\uB984\uCC28\uC21C"),
                                        react_1.default.createElement("option", { value: "desc" }, "\uB0B4\uB9BC\uCC28\uC21C")));
                            })),
                            react_1.default.createElement("div", { className: "buttons" },
                                react_1.default.createElement("button", { type: "button", onClick: applySort }, "\uC801\uC6A9"))))),
                react_1.default.createElement("div", { className: "toggle-container", onClick: () => setIsTable(!isTable) },
                    react_1.default.createElement("span", { className: `${isTable ? "" : "selected"}` }, "\uCD08\uC0C1\uD654"),
                    react_1.default.createElement("div", { className: `circle-container ${isTable ? "right" : ""}` },
                        react_1.default.createElement("span", { className: "circle" })),
                    react_1.default.createElement("span", { className: `${isTable ? "selected" : ""}` }, "\uD45C"))),
            isTable && react_1.default.createElement("div", { className: "table-legend-container" },
                react_1.default.createElement("div", { className: "table-legend" },
                    react_1.default.createElement("span", { className: "box casting" }),
                    react_1.default.createElement("span", { className: "text" }, "\uCE90\uC2A4\uD305")),
                react_1.default.createElement("div", { className: "table-legend" },
                    react_1.default.createElement("span", { className: "box" }),
                    react_1.default.createElement("span", { className: "text" }, "\uB2E8\uC77C \uACF5\uACA9\uAE30")),
                react_1.default.createElement("div", { className: "table-legend" },
                    react_1.default.createElement("span", { className: "box global" }),
                    react_1.default.createElement("span", { className: "text" }, "\uC804\uCCB4 \uACF5\uACA9\uAE30")),
                react_1.default.createElement("div", { className: "table-legend" },
                    react_1.default.createElement("span", { className: "box melee" }),
                    react_1.default.createElement("span", { className: "text" }, "\uADFC\uAC70\uB9AC \uACF5\uACA9")),
                react_1.default.createElement("div", { className: "table-legend" },
                    react_1.default.createElement("span", { className: "box ranged" }),
                    react_1.default.createElement("span", { className: "text" }, "\uC6D0\uAC70\uB9AC \uACF5\uACA9"))),
            isTable && digidexTable,
            !isTable && digimonButtons)));
}
exports.default = Digidex;
