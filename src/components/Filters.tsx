import React, { useMemo, useState } from "react";
import Combo from "./combo";
import { Grades } from "../enums";
import { getAllEvolutions, getEvolutions } from "../functions";
import { Evolution } from "../classes";

type FiltersProps = { 
    selectedDigimon: Evolution|null, 
    setSelectedDigimon: React.Dispatch<React.SetStateAction<Evolution | null>>
}

export default function Filters({ selectedDigimon, setSelectedDigimon }: FiltersProps): React.ReactElement {
    const [selectedGrade, setSelectedGrade] = useState<string|null>(null);
    const [grades, setGrades] = useState<Array<string>>(Object.values(Grades));
    const [all, setAll] = useState(getAllEvolutions(false));
    const [filtered, setFiltered] = useState<Array<Evolution>>([]);

    const changeGrade = (grade: string) => {
        setSelectedGrade(grade);

        const temp = new Array<Evolution>();
        all.forEach(each => {
            if(Grades[each.grade] === grade)
                temp.push(each);
        });

        setFiltered(temp);
    }

    const digimonComboText = selectedDigimon ? selectedDigimon.name :
                                               selectedGrade ? "디지몬 선택" : "";

    const selectDigimon = (evolution: Evolution) => {
        if(selectedDigimon?.id !== evolution.id) {
            getEvolutions(evolution);
            setSelectedDigimon(evolution);
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