import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import MonsterCheckbox from "./MonsterCheckbox";
import { getUUID } from "../../functions/commons";
import { ItemType } from "../../enums";
import { IFlags, addTypeItemToFlags, addTypeItemsToFlags, initTypeInFlags, removeTypeItemFromFlags } from "../../functions/getDropItemFilteringFlags";
import { Item } from "../../classes";

type MonsterCheckboxesByTypeProps = { 
    items: Array<Item>, 
    itemType: string, 
    itemCheckFlags: IFlags, 
    setItemCheckFlags: React.Dispatch<React.SetStateAction<IFlags>>
}

export default function MonsterCheckboxesByType({ items, itemType, itemCheckFlags, setItemCheckFlags }: MonsterCheckboxesByTypeProps): React.ReactElement {
    const itemsByType = useMemo(() => {
        return items.filter(item => ItemType[`${item.type}`] === itemType);
    }, [items]);

    const [isFold, setIsFold] = useState(localStorage.getItem(`${itemType}_isFold`) === "true" ? true : false);

    useEffect(() => {
        setIsFold(localStorage.getItem(`${itemType}_isFold`) === "true" ? true : false);
    }, [itemCheckFlags]);

    const toggleFold = () => {
        localStorage.setItem(`${itemType}_isFold`, String(!isFold));
        setIsFold(!isFold);
    }

    const toggleItemCheckFlag = (event: ChangeEvent, item: Item) => {
        const target = event.target as HTMLInputElement;
        let newFlags = null;
        if(target.checked) {
            newFlags = addTypeItemToFlags(items, item, itemType, itemCheckFlags);
        } else {
            newFlags = removeTypeItemFromFlags(items, item, itemType, itemCheckFlags);
        }
        setItemCheckFlags(newFlags);
    }

    const toggleAll = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        let newFlags = null;
        if(!target.checked) {
            newFlags = initTypeInFlags(items, itemType, itemCheckFlags);
        } else {
            newFlags = addTypeItemsToFlags(items, itemsByType, itemType, itemCheckFlags);
        }
        setItemCheckFlags(newFlags);
    }

    const getCheckedCountByType = () => {
        const keys = Object.keys(itemCheckFlags);
        for(let i = 0; i < keys.length; i++) {
            if(keys[i] === itemType) {
                return itemCheckFlags[`${keys[i]}`].length;
            }
        }
    }

    const getItemsCountByType = () => {
        let count = 0;
        items.forEach(item => {
            if(ItemType[`${item.type}`] === itemType) count++;
        });
        return count;
    }

    const checkboxContainer = useMemo(() => {
        return <label className="check-box-container" htmlFor={`${itemType}`} key={getUUID()}>
                    <input type="checkbox" defaultChecked={getCheckedCountByType() === getItemsCountByType()} onChange={toggleAll} className="check-box" id={`${itemType}`} />
                    { itemType}
                </label>;
    }, [itemCheckFlags]);

    const style = isFold ? { maxHeight: "0px" } : { maxHeight: `${itemsByType.length * 23 + 3}px` };
    
    return (
        <div className="monster-checkbox">
            { checkboxContainer }
            <button type="button" className="toggle-fold-button" onClick={toggleFold} >
                { isFold ? <i className="fa-solid fa-plus" /> : <i className="fa-solid fa-minus" /> }
            </button>
            <div className={`drop-item-checkboxes`} style={style} >
                { itemsByType && itemsByType.map(item => (
                    <MonsterCheckbox item={item} toggleItemCheckFlag={toggleItemCheckFlag}
                                     checked={itemCheckFlags[`${ItemType[item.type]}`].includes(item.id)}
                                     key={getUUID()} />
                )) }
            </div>
        </div>
    );
}