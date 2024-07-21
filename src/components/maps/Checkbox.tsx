import React, { useMemo } from "react";
import { IMG_URL_BASE } from "../../enums";

type CheckboxProps = { 
    id: string, 
    text: string, 
    checked: boolean, 
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Checkbox({ id, text, checked, setChecked }: CheckboxProps): React.ReactElement {
    const checkbox = useMemo(() => {
        return <label className="check-box-container" htmlFor={id} >
                    <input type="checkbox" defaultChecked={checked} onChange={(e) => setChecked(e.target.checked)} className="check-box" id={id} />
                    <img src={`${IMG_URL_BASE}/${text}.png`} />
                    {text}
                </label>;
    }, [checked]);

    return checkbox;
}