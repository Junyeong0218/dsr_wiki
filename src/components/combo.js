import React, { useEffect, useState } from "react";

export default function Combo({ list, selected, select, selectedType }) {
    const [isActivated, setIsActivated] = useState(false);
    const [typeColor, setTypeColor] = useState("");

    useEffect(() => {
        if(selectedType === "유년기1") setTypeColor("baby1");
        else if(selectedType === "유년기2") setTypeColor("baby2");
        else if(selectedType === "성장기") setTypeColor("child");
        else if(selectedType === "성숙기") setTypeColor("adult");
        else if(selectedType === "완전체") setTypeColor("perfect");
    }, [selectedType]);

    const toggleList = () => setIsActivated(!isActivated);
    const selectOption = (option) => select(option);
    
    return (
        <div className={`combo ${typeColor}`} onClick={toggleList}>
            <div className="selected">{selected.from ?? selected}</div>
            <div className={`list ${isActivated ? "active" : ""}`}>
                { list.length > 0 && list.map((element, index) => (
                    <button type="button" onClick={() => selectOption(element)} key={`${element.from ?? element}_option_${index}`} className="combo-button">{element.from ?? element}</button>
                ))}
            </div>
            <div className={`triangle ${isActivated ? "active" : ""}`}>▼</div>
        </div>
    );
}