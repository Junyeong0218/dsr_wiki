import React, { useEffect, useMemo, useState } from "react";
import { Digimon } from "../../classes";
import { getAllDigimons } from "../../functions";
import { getUUID } from "../../functions/commons";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";

type UserDigimonSelectorProps = {
    userDigimon: Digimon | undefined
    setUserDigimon: React.Dispatch<React.SetStateAction<Digimon | undefined>>
}

type Option = {
    label: string
    value: number
}

export default function UserDigimonSelector({ userDigimon, setUserDigimon }: UserDigimonSelectorProps): React.ReactElement {
    const grades = useMemo(() => [5, 6], []);
    const all = useMemo(() => getAllDigimons(false, false), []);
    const [selectedGrade, setSelectedGrade] = useState<number>(userDigimon?.grade ?? 5);

    const basicDigimon = !userDigimon ? all.filter(e => e.grade === selectedGrade)[0] : userDigimon;
    const [selectedDigimon, setSelectedDigimon] = useState<Option>({ label: basicDigimon.name, value: basicDigimon.id });
    // const filtered = [ {id: 0, name: ""}, ...all.filter(e => e.grade === selectedGrade) ];

    const digimonOptions = all.filter(e => e.grade === selectedGrade).map(d => { return { label: d.name, value: d.id }});
    const onChangeDigimon = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        if(!newValue) return;

        setSelectedDigimon(newValue);

        const digimon = all.find(e => e.id === newValue.value);
        setUserDigimon(digimon);
    }

    // <select className="digimon-selector" defaultValue={userDigimon?.id} onChange={(e) => setUserDigimon(all.find(d => d.id === Number(e.target.value)))}>
    //     { filtered.map(digimon => {
    //         return <option value={digimon.id} key={getUUID()}>{digimon.name}</option>
    //     }) }
    // </select>

    const digimonSelector = <ReactSelect styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: 0,
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          textAlignLast: "center",
          backgroundColor: "transparent",
          fontSize: 14
        }),
    }} options={digimonOptions} value={selectedDigimon} onChange={onChangeDigimon} />

    const gradeSelector = useMemo(() => {
        return <div className="grade-selector">
                    <button type="button" className={selectedGrade === grades[0] ? "active" : ""} onClick={() => setSelectedGrade(grades[0])}>완전체</button>
                    <button type="button" className={selectedGrade === grades[1] ? "active" : ""} onClick={() => setSelectedGrade(grades[1])}>궁극체</button>
                </div>
        }, [selectedGrade]);

    return (
        <div className="digimon-selector-container">
            { gradeSelector }
            { digimonSelector }
        </div>
    );
}