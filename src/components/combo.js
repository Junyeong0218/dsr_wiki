import React, { useEffect, useState } from "react";
import { GradeClassNames } from "../enums";

export default function Combo({ list, selected, select, selectedGrade }) {
    const [isOpen, setIsOpen] = useState(false);
    const [gradeColor, setGradeColor] = useState("");

    useEffect(() => {
        const color = GradeClassNames[selectedGrade];
        if(color) setGradeColor(color);
    }, [selectedGrade]);

    const toggleList = () => setIsOpen(!isOpen);
    
    return (
        <div className={`combo ${gradeColor}`} onClick={toggleList}>
            <div className="selected">{selected}</div>

            <div className={`list ${isOpen ? "active" : ""}`}>
                { list.length > 0 && list.map((element, index) => (
                    <button type="button" onClick={() => select(element)} key={`${element.name ?? element}_option_${index}`} className="combo-button">
                        {element.name ?? element}
                    </button>
                ))}
            </div>

            <div className={`triangle ${isOpen ? "active" : ""}`}>▼</div>
        </div>
    );
}