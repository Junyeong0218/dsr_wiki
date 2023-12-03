import React from "react";
import MonsterCheckbox from "./MonsterCheckbox";
import { getUUID } from "../../functions/commons";

export default function MonsterCheckboxes({ items, itemCheckFlags, setItemCheckFlags }) {
    const toggleItemCheckFlag = (event, item) => {
        if(event.target.checked) {
            setItemCheckFlags([ ...itemCheckFlags, item.id ]);
        } else {
            setItemCheckFlags([ ...itemCheckFlags.filter(f => f !== item.id) ]);
        }
    }

    const toggleAll = (event) => {
        if(!event.target.checked) {
            setItemCheckFlags([]);
        } else {
            setItemCheckFlags([...items.map(item => item.id)]);
        }
    }

    return (
        <div className="monster-checkbox">
            <label className="check-box-container" htmlFor={"monster"} key={getUUID()}>
                    <input type="checkbox" defaultChecked={itemCheckFlags.length === items.length} onChange={toggleAll} className="check-box" id={"monster"} />
                    몬스터
            </label>
            <div className="drop-item-checkboxes">
                { items && items.map((item, index) => (
                    <MonsterCheckbox item={item} toggleItemCheckFlag={toggleItemCheckFlag}
                                     checked={itemCheckFlags.includes(item.id)}
                                     key={getUUID()} />
                )) }
            </div>
        </div>
    );
}