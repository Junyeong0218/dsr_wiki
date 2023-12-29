import { Item } from "../classes";
import { ItemType } from "../enums";

interface IFlags {
    [key: string]: Array<number>
}

const getBlankFlags = (): IFlags => {
    return {
        "포션": new Array<number>(),
        "소모 아이템": new Array<number>(),
        "탐지기": new Array<number>(),
        "스킬 강화석": new Array<number>(),
        "디지타마": new Array<number>(),
        "디지코어": new Array<number>(),
        "기타": new Array<number>(),
        "퀘스트 아이템": new Array<number>(),
    };
}

const removeHasNotTypes = (items: Array<Item>, flags: any) => {
    const temp = new Set<String>();
    items.forEach(item => temp.add(ItemType[item.type]));

    const types = [ ...temp.values() ];
    Object.keys(flags).forEach(key => {
        if(!types.includes(key)) delete flags[key];
    });

    return flags;
}

const makeAllInFlags = (items: Array<Item>) => {
    const flags = getBlankFlags();

    items.forEach(item => {
        flags[`${ItemType[item.type]}`].push(item.id);
    });

    Object.keys(flags).forEach(key => {
        if(flags[`${key}`].length === 0) delete flags[`${key}`];
    });

    return flags;
}

const initTypeInFlags = (items: Array<Item>, itemType: string, flags: any) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if(key !== itemType) 
            newFlags[`${key}`].push(...flags[`${key}`]);
    });

    return removeHasNotTypes(items, newFlags);
}

const addTypeItemsToFlags = (items: Array<Item>, typeItems: Array<Item>, itemType: string, flags: any) => {
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

const addTypeItemToFlags = (items: Array<Item>, item: Item, itemType: string, flags: any) => {
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

const removeTypeItemFromFlags = (items: Array<Item>, item: Item, itemType: string, flags: any) => {
    const newFlags = getBlankFlags();
    Object.keys(flags).forEach(key => {
        if(key !== itemType) 
            newFlags[`${key}`].push(...flags[`${key}`]);
        else {
            newFlags[`${key}`].push(...flags[`${key}`].filter((id: number) => id !== item.id));
        }
    });

    return removeHasNotTypes(items, newFlags);
}

export {
    IFlags,
    getBlankFlags,
    makeAllInFlags,
    removeHasNotTypes,
    initTypeInFlags,
    addTypeItemsToFlags,
    addTypeItemToFlags,
    removeTypeItemFromFlags
}