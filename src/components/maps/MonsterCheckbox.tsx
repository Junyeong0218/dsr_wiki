import React, { ChangeEvent, useMemo } from "react";
import { Item } from "../../classes";

type MonsterCheckboxProps = { 
    checked: boolean, 
    item: Item, 
    toggleItemCheckFlag: (event: ChangeEvent, item: Item) => void 
}

export default function MonsterCheckbox({ checked, item, toggleItemCheckFlag }: MonsterCheckboxProps): React.ReactElement {
    const checkbox = useMemo(() => {
        return <label className="check-box-container" htmlFor={`${item.name}`} >
                    <input type="checkbox" defaultChecked={checked} onChange={(event) => toggleItemCheckFlag(event, item)} className="check-box" id={`${item.name}`} />
                    {item.name}
                </label>;
    }, [checked]);

    return checkbox;
}