"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
const getDropItemFilteringFlags_1 = require("../../functions/getDropItemFilteringFlags");
const MonsterCheckboxesByType_1 = __importDefault(require("./MonsterCheckboxesByType"));
function MonsterCheckboxes({ items, itemCheckFlags, setItemCheckFlags }) {
    const toggleAll = (event) => {
        const target = event.target;
        if (!target.checked) {
            setItemCheckFlags((0, getDropItemFilteringFlags_1.removeHasNotTypes)(items, (0, getDropItemFilteringFlags_1.getBlankFlags)()));
        }
        else {
            const flags = (0, getDropItemFilteringFlags_1.makeAllInFlags)(items);
            setItemCheckFlags(flags);
        }
    };
    const getCheckedCount = () => {
        let count = 0;
        Object.keys(itemCheckFlags).forEach(itemType => {
            count += itemCheckFlags[`${itemType}`].length;
        });
        return count;
    };
    return (react_1.default.createElement("div", { className: "monster-checkbox" },
        react_1.default.createElement("label", { className: "check-box-container", htmlFor: "monster", key: (0, commons_1.getUUID)() },
            react_1.default.createElement("input", { type: "checkbox", defaultChecked: getCheckedCount() === items.length, onChange: toggleAll, className: "check-box", id: "monster" }),
            "\uBAAC\uC2A4\uD130"),
        react_1.default.createElement("div", { className: "drop-item-checkboxes" }, Object.keys(itemCheckFlags).map(itemType => (react_1.default.createElement(MonsterCheckboxesByType_1.default, { key: (0, commons_1.getUUID)(), items: items, itemType: itemType, itemCheckFlags: itemCheckFlags, setItemCheckFlags: setItemCheckFlags }))))));
}
exports.default = MonsterCheckboxes;
