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
const getCombinationsFunctions_1 = require("../../functions/getCombinationsFunctions");
const resultItem_1 = __importDefault(require("./resultItem"));
const requireResources_1 = __importDefault(require("./requireResources"));
const commons_1 = require("../../functions/commons");
const ingredient_1 = __importDefault(require("./ingredient"));
const combinationShortcut_1 = __importDefault(require("./combinationShortcut"));
const combinationFilters_1 = __importDefault(require("./combinationFilters"));
function CombinationSearcher() {
    const all = (0, react_1.useMemo)(() => (0, getCombinationsFunctions_1.getCombinations)(), []);
    const [filtered, setFiltered] = (0, react_1.useState)(null);
    const [selected, setSelected] = (0, react_1.useState)(null);
    const selectCombination = (combination) => {
        setSelected(combination);
    };
    const shortcuts = (0, react_1.useMemo)(() => {
        return filtered ?
            react_1.default.createElement("div", { className: "combination-list" }, filtered.map(combination => {
                var _a;
                return (react_1.default.createElement(combinationShortcut_1.default, { combination: combination, selectedId: (_a = selected.id) !== null && _a !== void 0 ? _a : 0, selectCombination: selectCombination, key: (0, commons_1.getUUID)() }));
            })) :
            react_1.default.createElement("div", { className: "combination-list" }, all.map(combination => {
                var _a;
                return (react_1.default.createElement(combinationShortcut_1.default, { combination: combination, selectedId: (_a = selected.id) !== null && _a !== void 0 ? _a : 0, selectCombination: selectCombination, key: (0, commons_1.getUUID)() }));
            }));
    }, [filtered, selected]);
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement(combinationFilters_1.default, { all: all, setFiltered: setFiltered }),
        react_1.default.createElement("div", { className: "combination-container" },
            shortcuts,
            selected &&
                react_1.default.createElement("div", { className: "selected-combination" },
                    react_1.default.createElement(resultItem_1.default, { selected: selected }),
                    react_1.default.createElement(requireResources_1.default, { selected: selected }),
                    react_1.default.createElement("div", { className: "ingredient-list" }, selected.ingredients.map(ingredient => (react_1.default.createElement(ingredient_1.default, { ingredient: ingredient, key: (0, commons_1.getUUID)() }))))))));
}
exports.default = CombinationSearcher;
