"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function MonsterShortcut({ monster, hasDropItem }) {
    const style = { top: monster.point.y, left: monster.point.x };
    return (react_1.default.createElement("div", { className: `monster-shortcut ${hasDropItem(monster) ? "" : "hide"}`, style: style },
        react_1.default.createElement("img", { "data-id": monster.id, src: `/images/${monster.name}.png`, className: "monster-image" }),
        react_1.default.createElement("span", null, monster.name),
        react_1.default.createElement("img", { src: `/images/${monster.digimonType}.png`, className: "monster-type-shortcut" })));
}
exports.default = MonsterShortcut;
