import React, { useMemo } from "react";

export default function MonsterCheckbox({ checked, item, toggleItemCheckFlag }) {
    const checkbox = useMemo(() => {
        return <label className="check-box-container" htmlFor={`${item.name}`} >
                    <input type="checkbox" defaultChecked={checked} onChange={(event) => toggleItemCheckFlag(event, item)} className="check-box" id={`${item.name}`} />
                    {item.name}
                </label>;
    }, [checked]);

    return checkbox;
}