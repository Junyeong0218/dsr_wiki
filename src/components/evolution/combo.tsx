import React, { useEffect, useState } from "react";
import { GradeClassNames } from "../../enums";
import { Evolution } from "../../classes";
import { getUUID } from "../../functions/commons";

type ComboProps = { 
    list: Array<string>|Array<Evolution>, 
    selected: string, 
    select: (arg: any) => void, 
    selectedGrade: string|null
}

export default function Combo({ list, selected, select, selectedGrade }: ComboProps): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false);
    const [gradeColor, setGradeColor] = useState("");

    useEffect(() => {
        if(!selectedGrade) return;

        const color = GradeClassNames[selectedGrade];
        if(color) setGradeColor(color);
    }, [selectedGrade]);

    const toggleList = () => setIsOpen(!isOpen);
    
    return (
        <div className={`combo ${gradeColor}`} onClick={toggleList}>
            <div className="selected">{selected}</div>

            <div className={`list ${isOpen ? "active" : ""}`}>
                { list.length > 0 && list.map((element, index) => (
                    <button type="button" onClick={() => select(element)} key={getUUID()} className="combo-button">
                        { typeof element === "object" ? element.name : element }
                    </button>
                ))}
            </div>

            <div className={`triangle ${isOpen ? "active" : ""}`}>▼</div>
        </div>
    );
}