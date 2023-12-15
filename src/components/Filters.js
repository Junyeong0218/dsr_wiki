import React, { useMemo, useState } from "react";
import Combo from "./combo";
import { Grades } from "../enums";
import { getAllEvolutions, getEvolutions } from "../functions";
import { getUUID } from "../functions/commons";

export default function Filters({ selectedDigimon, setSelectedDigimon }) {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [grades, setGrades] = useState(Object.values(Grades));
    const [all, setAll] = useState(getAllEvolutions(false));
    const [filtered, setFiltered] = useState([]);

    const changeGrade = (grade) => {
        setSelectedGrade(grade);

        const temp = new Array();
        all.forEach(each => {
            if(Grades[each.grade] === grade)
                temp.push(each);
        });

        setFiltered(temp);
    }

    const digimonComboText = selectedDigimon ? selectedDigimon.name :
                                               selectedGrade ? "디지몬 선택" : "";

    const selectDigimon = (digimon) => {
        if(selectedDigimon?.id !== digimon.id) {
            getEvolutions(digimon);
            setSelectedDigimon(digimon);
        }
    }

    const gradeCombo = useMemo(() => {
        return <Combo list={grades}
                      selected={selectedGrade || "진화 상태"} 
                      select={changeGrade}
                      selectedGrade={selectedGrade} 
                      key={"grade_combobox"} />;
    }, [selectedGrade]);

    const digimonCombo = useMemo(() => {
        return <Combo list={filtered} 
                      selected={digimonComboText}
                      select={selectDigimon}
                      selectedGrade={selectedGrade}
                      key={"digimon_combobox"} />;
    }, [selectedGrade, selectedDigimon]);

    return (
        <div className="filters">
            { gradeCombo }
            
            { digimonCombo }
        </div>
    );
}