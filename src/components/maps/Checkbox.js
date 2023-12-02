import React, { useMemo } from "react";

export default function Checkbox({ id, text, checked, setChecked }) {
    const checkbox = useMemo(() => {
        return <label className="check-box-container" htmlFor={id} >
                    <input type="checkbox" defaultChecked={checked} onChange={(e) => setChecked(e.target.checked)} className="check-box" id={id} />
                    {text}
                </label>;
    }, [checked]);

    return checkbox;
}