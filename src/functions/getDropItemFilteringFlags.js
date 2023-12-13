import { ItemType } from "../enums";

const getBlankFlags = () => {
    return {
        "포션": [],
        "소모 아이템": [],
        "탐지기": [],
        "스킬 강화석": [],
        "디지타마": [],
        "디지코어": [],
        "기타": [],
        "퀘스트 아이템": []
    };
}

const removeHasNotTypes = (items, flags) => {
    const temp = new Set();
    items.forEach(item => temp.add(ItemType[item.type]));

    const types = [ ...temp.values() ];
    Object.keys(flags).forEach(key => {
        if(!types.includes(key)) delete flags[key];
    });

    return flags;
}

const makeAllInFlags = (items) => {
    const flags = getBlankFlags();

    items.forEach(item => {
        flags[`${ItemType[item.type]}`].push(item.id);
    });

    Object.keys(flags).forEach(key => {
        if(flags[`${key}`].length === 0) delete flags[`${key}`];
    });

    return flags;
}

const initTypeInFlags = (items, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if(key !== itemType) 
            newFlags[`${key}`].push(...flags[`${key}`]);
    });

    return removeHasNotTypes(items, newFlags);
}

const addTypeItemsToFlags = (items, typeItems, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if(key !== itemType) 
            newFlags[`${key}`].push(...flags[`${key}`]);
        else {
            typeItems.forEach(item => {
                newFlags[`${key}`].push(item.id);
            });
        }
    });

    return removeHasNotTypes(items, newFlags);
}

const addTypeItemToFlags = (items, item, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if(key !== itemType) 
            newFlags[`${key}`].push(...flags[`${key}`]);
        else {
            newFlags[`${key}`].push(...flags[`${key}`], item.id);
        }
    });

    return removeHasNotTypes(items, newFlags);
}

const removeTypeItemFromFlags = (items, item, itemType, flags) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if(key !== itemType) 
            newFlags[`${key}`].push(...flags[`${key}`]);
        else {
            newFlags[`${key}`].push(...flags[`${key}`].filter(id => id !== item.id));
        }
    });

    return removeHasNotTypes(items, newFlags);
}

export {
    getBlankFlags,
    makeAllInFlags,
    removeHasNotTypes,
    initTypeInFlags,
    addTypeItemsToFlags,
    addTypeItemToFlags,
    removeTypeItemFromFlags
}