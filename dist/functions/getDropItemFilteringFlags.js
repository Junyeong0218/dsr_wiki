"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTypeItemFromFlags = exports.addTypeItemToFlags = exports.addTypeItemsToFlags = exports.initTypeInFlags = exports.removeHasNotTypes = exports.makeAllInFlags = exports.getBlankFlags = void 0;
const enums_1 = require("../enums");
const getBlankFlags = () => {
    return {
        "포션": new Array(),
        "소모 아이템": new Array(),
        "탐지기": new Array(),
        "스킬 강화석": new Array(),
        "디지타마": new Array(),
        "디지코어": new Array(),
        "기타": new Array(),
        "퀘스트 아이템": new Array(),
    };
};
exports.getBlankFlags = getBlankFlags;
const removeHasNotTypes = (items, flags) => {
    const temp = new Set();
    items.forEach(item => temp.add(enums_1.ItemType[item.type]));
    const types = [...temp.values()];
    Object.keys(flags).forEach(key => {
        if (!types.includes(key))
            delete flags[key];
    });
    return flags;
};
exports.removeHasNotTypes = removeHasNotTypes;
const makeAllInFlags = (items) => {
    const flags = getBlankFlags();
    items.forEach(item => {
        flags[`${enums_1.ItemType[item.type]}`].push(item.id);
    });
    Object.keys(flags).forEach(key => {
        if (flags[`${key}`].length === 0)
            delete flags[`${key}`];
    });
    return flags;
};
exports.makeAllInFlags = makeAllInFlags;
const initTypeInFlags = (items, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if (key !== itemType)
            newFlags[`${key}`].push(...flags[`${key}`]);
    });
    return removeHasNotTypes(items, newFlags);
};
exports.initTypeInFlags = initTypeInFlags;
const addTypeItemsToFlags = (items, typeItems, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if (key !== itemType)
            newFlags[`${key}`].push(...flags[`${key}`]);
        else {
            typeItems.forEach(item => {
                newFlags[`${key}`].push(item.id);
            });
        }
    });
    return removeHasNotTypes(items, newFlags);
};
exports.addTypeItemsToFlags = addTypeItemsToFlags;
const addTypeItemToFlags = (items, item, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if (key !== itemType)
            newFlags[`${key}`].push(...flags[`${key}`]);
        else {
            newFlags[`${key}`].push(...flags[`${key}`], item.id);
        }
    });
    return removeHasNotTypes(items, newFlags);
};
exports.addTypeItemToFlags = addTypeItemToFlags;
const removeTypeItemFromFlags = (items, item, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if (key !== itemType)
            newFlags[`${key}`].push(...flags[`${key}`]);
        else {
            newFlags[`${key}`].push(...flags[`${key}`].filter((id) => id !== item.id));
        }
    });
    return removeHasNotTypes(items, newFlags);
};
exports.removeTypeItemFromFlags = removeTypeItemFromFlags;
