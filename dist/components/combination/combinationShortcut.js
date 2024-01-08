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
const commons_1 = require("../../functions/commons");
function CombinationShortcut({ combination, selectedId, selectCombination }) {
    const shortcut = (0, react_1.useMemo)(() => {
        const imageName = (0, commons_1.getNameExceptColon)(combination.resultItem.name);
        const tradableTag = combination.resultItem.canTrade ? react_1.default.createElement("span", { className: "green" }, "\uAC70\uB798\uAC00\uB2A5") :
            react_1.default.createElement("span", { className: "red" }, "\uAC70\uB798\uBD88\uAC00");
        const itemNameTag = combination["tag"] ? react_1.default.createElement("span", { className: "shortcut-item-name", dangerouslySetInnerHTML: { __html: combination.tag } }) :
            react_1.default.createElement("span", { className: "shortcut-item-name" }, combination.resultItem.name);
        return react_1.default.createElement("button", { type: "button", className: `combination-shortcut ${combination.id === selectedId ? "selected" : ""}`, onClick: () => selectCombination(combination) },
            react_1.default.createElement("img", { src: `/images/${encodeURIComponent(imageName)}.png` }),
            react_1.default.createElement("div", { className: "shortcut-texts" },
                itemNameTag,
                tradableTag));
    }, [combination.id, selectedId]);
    return shortcut;
}
exports.default = CombinationShortcut;
