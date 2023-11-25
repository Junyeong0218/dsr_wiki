import React, { useState } from "react";
import Combo from "./combo";
import { Grades } from "../enums";
import { getAllDigimons } from "../functions";
import Slicer from "./slicer";

export default function Filters({ selectedDigimon, setSelectedDigimon, searchRange, setSearchRange }) {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [grades, setGrades] = useState(Object.values(Grades));
    const [all, setAll] = useState(getAllDigimons(false));
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

    const getDigimonComboText = () => selectedDigimon ? selectedDigimon.name :
                                                        selectedGrade ? "디지몬 선택" : "";

    return (
        <div className="filters">
            <Combo list={grades}
                selected={selectedGrade || "진화 상태"} 
                select={changeGrade}
                selectedGrade={selectedGrade} />
            
            <Combo list={filtered} 
                selected={getDigimonComboText()}
                select={setSelectedDigimon}
                selectedGrade={selectedGrade} />
            {/* <Slicer searchRange={searchRange} setSearchRange={setSearchRange} /> */}
        </div>
    );
}