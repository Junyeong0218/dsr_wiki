import React, { useEffect, useMemo, useState } from "react";
import { Digimon } from "../../classes";
import { getAllDigimons } from "../../functions";
import { getUUID } from "../../functions/commons";

type UserDigimonSelectorProps = {
    userDigimon: Digimon | undefined
    setUserDigimon: React.Dispatch<React.SetStateAction<Digimon | undefined>>
}

export default function UserDigimonSelector({ userDigimon, setUserDigimon }: UserDigimonSelectorProps): React.ReactElement {
    const grades = useMemo(() => [5, 6], []);
    const all = useMemo(() => getAllDigimons(false), []);
    const [selectedGrade, setSelectedGrade] = useState<number>(userDigimon?.grade ?? 5);
    const filtered = [ {id: 0, name: ""}, ...all.filter(e => e.grade === selectedGrade) ];

    const gradeSelector = useMemo(() => {
        return <div className="grade-selector">
                    <button type="button" className={selectedGrade === grades[0] ? "active" : ""} onClick={() => setSelectedGrade(grades[0])}>완전체</button>
                    <button type="button" className={selectedGrade === grades[1] ? "active" : ""} onClick={() => setSelectedGrade(grades[1])}>궁극체</button>
                </div>
        }, [selectedGrade]);

    return (
        <div className="digimon-selector-container">
            { gradeSelector }
            <select className="digimon-selector" defaultValue={userDigimon?.id} onChange={(e) => setUserDigimon(all.find(d => d.id === Number(e.target.value)))}>
                { filtered.map(digimon => {
                   return <option value={digimon.id} key={getUUID()}>{digimon.name}</option>
                }) }
            </select>
        </div>
    );
}