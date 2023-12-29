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
const MonsterCheckbox_1 = __importDefault(require("./MonsterCheckbox"));
const commons_1 = require("../../functions/commons");
const enums_1 = require("../../enums");
const getDropItemFilteringFlags_1 = require("../../functions/getDropItemFilteringFlags");
function MonsterCheckboxesByType({ items, itemType, itemCheckFlags, setItemCheckFlags }) {
    const itemsByType = (0, react_1.useMemo)(() => {
        return items.filter(item => enums_1.ItemType[`${item.type}`] === itemType);
    }, [items]);
    const [isFold, setIsFold] = (0, react_1.useState)(localStorage.getItem(`${itemType}_isFold`) === "true" ? true : false);
    (0, react_1.useEffect)(() => {
        setIsFold(localStorage.getItem(`${itemType}_isFold`) === "true" ? true : false);
    }, [itemCheckFlags]);
    const toggleFold = () => {
        localStorage.setItem(`${itemType}_isFold`, String(!isFold));
        setIsFold(!isFold);
    };
    const toggleItemCheckFlag = (event, item) => {
        const target = event.target;
        let newFlags = null;
        if (target.checked) {
            newFlags = (0, getDropItemFilteringFlags_1.addTypeItemToFlags)(items, item, itemType, itemCheckFlags);
        }
        else {
            newFlags = (0, getDropItemFilteringFlags_1.removeTypeItemFromFlags)(items, item, itemType, itemCheckFlags);
        }
        setItemCheckFlags(newFlags);
    };
    const toggleAll = (event) => {
        const target = event.target;
        let newFlags = null;
        if (!target.checked) {
            newFlags = (0, getDropItemFilteringFlags_1.initTypeInFlags)(items, itemType, itemCheckFlags);
        }
        else {
            newFlags = (0, getDropItemFilteringFlags_1.addTypeItemsToFlags)(items, itemsByType, itemType, itemCheckFlags);
        }
        setItemCheckFlags(newFlags);
    };
    const getCheckedCountByType = () => {
        const keys = Object.keys(itemCheckFlags);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === itemType) {
                return itemCheckFlags[`${keys[i]}`].length;
            }
        }
    };
    const getItemsCountByType = () => {
        let count = 0;
        items.forEach(item => {
            if (enums_1.ItemType[`${item.type}`] === itemType)
                count++;
        });
        return count;
    };
    const checkboxContainer = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("label", { className: "check-box-container", htmlFor: `${itemType}`, key: (0, commons_1.getUUID)() },
            react_1.default.createElement("input", { type: "checkbox", defaultChecked: getCheckedCountByType() === getItemsCountByType(), onChange: toggleAll, className: "check-box", id: `${itemType}` }),
            itemType);
    }, [itemCheckFlags]);
    const style = isFold ? { maxHeight: "0px" } : { maxHeight: `${itemsByType.length * 23 + 3}px` };
    return (react_1.default.createElement("div", { className: "monster-checkbox" },
        checkboxContainer,
        react_1.default.createElement("button", { type: "button", className: "toggle-fold-button", onClick: toggleFold }, isFold ? react_1.default.createElement("i", { className: "fa-solid fa-plus" }) : react_1.default.createElement("i", { className: "fa-solid fa-minus" })),
        react_1.default.createElement("div", { className: `drop-item-checkboxes`, style: style }, itemsByType && itemsByType.map(item => (react_1.default.createElement(MonsterCheckbox_1.default, { item: item, toggleItemCheckFlag: toggleItemCheckFlag, checked: itemCheckFlags[`${enums_1.ItemType[item.type]}`].includes(item.id), key: (0, commons_1.getUUID)() }))))));
}
exports.default = MonsterCheckboxesByType;
