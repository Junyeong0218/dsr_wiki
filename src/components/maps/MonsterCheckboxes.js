import React from "react";
import { getUUID } from "../../functions/commons";
import { getBlankFlags, removeHasNotTypes, makeAllInFlags } from "../../functions/getDropItemFilteringFlags";
import MonsterCheckboxesByType from "./MonsterCheckboxesByType";

export default function MonsterCheckboxes({ items, itemCheckFlags, setItemCheckFlags }) {
    const toggleAll = (event) => {
        if(!event.target.checked) {
            setItemCheckFlags(removeHasNotTypes(items, getBlankFlags()));
        } else {
            const flags = makeAllInFlags(items);
            setItemCheckFlags(flags);
        }
    }

    const getCheckedCount = () => {
        let count = 0;
        Object.keys(itemCheckFlags).forEach(itemType => {
            count += itemCheckFlags[`${itemType}`].length;
        });

        return count;
    }

    return (
        <div className="monster-checkbox">
            <label className="check-box-container" htmlFor={"monster"} key={getUUID()}>
                    <input type="checkbox" defaultChecked={getCheckedCount() === items.length} onChange={toggleAll} className="check-box" id={"monster"} />
                    몬스터
            </label>
            <div className="drop-item-checkboxes">
                { Object.keys(itemCheckFlags).map(itemType => (
                    <MonsterCheckboxesByType key={getUUID()} 
                                             items={items} itemType={itemType}
                                             itemCheckFlags={itemCheckFlags} 
                                             setItemCheckFlags={setItemCheckFlags} />
                )) }
            </div>
        </div>
    );
}