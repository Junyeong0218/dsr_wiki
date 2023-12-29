import React, { useMemo, useRef, useState } from "react";
import { Elements, Grades, DigimonTypes } from "../../enums";
import { getUUID } from "../../functions/commons";
import { Digimon } from "../../classes";
import { getSearchedDigimons } from "../../functions/searchFunctions";

type DigidexFilterProps = { 
    selectedGrade: string, 
    setSelectedGrade: React.Dispatch<React.SetStateAction<string>>,
    selectedType: string, 
    setSelectedType: React.Dispatch<React.SetStateAction<string>>,
    selectedElement: string, 
    setSelectedElement: React.Dispatch<React.SetStateAction<string>>,
    all: Array<Digimon>,
    setFiltered: React.Dispatch<React.SetStateAction<Digimon[]>>
}

export default function DigidexFilter({ selectedGrade, setSelectedGrade,
                                        selectedType, setSelectedType,
                                        selectedElement, setSelectedElement,
                                        all, setFiltered }: DigidexFilterProps): React.ReactElement {
    const grades = Object.values(Grades).filter(each => each !== "유년기1" && each !== "유년기2");
    const digimonTypes = Object.values(DigimonTypes);
    const elements = Object.values(Elements);

    const [text, setText] = useState("");

    const textRef = useRef<HTMLInputElement>(null);

    const updateText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if(event.target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = event.target.value;

            setSelectedGrade("전체");
            setSelectedType("전체");
            setSelectedElement("전체");

            if(typed === "") {
                setText(typed);
                setFiltered(all);
            } else if(!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = getSearchedDigimons(event.target.value.trim());
                setFiltered(searched);
            }
        }
    }

    const textInput = useMemo(() => {
        return <input ref={textRef} type="text" className="digidex-search-input" value={text} onChange={updateText} placeholder="디지몬 이름 혹은 초성을 입력하세요" />
    }, [text]);

    return (
        <div className="digidex-filters">
            {/* 진화도 */}
            <select className="digidex-filter" defaultValue={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} key={getUUID()}>
                <option value="전체">진화도 전체</option>
                { grades.map(grade => (
                    <option value={grade} key={getUUID()}>{grade}</option>
                )) }
            </select>
            {/* 타입 */}
            <select className="digidex-filter" defaultValue={selectedType} onChange={(e) => setSelectedType(e.target.value)} key={getUUID()}>
                <option value="전체">타입 전체</option>
                { digimonTypes.map(type => (
                    <option value={type} key={getUUID()}>{type}</option>
                )) }
            </select>
            {/* 스킬속성 */}
            <select className="digidex-filter" defaultValue={selectedElement} onChange={(e) => setSelectedElement(e.target.value)} key={getUUID()}>
                <option value="전체">스킬속성 전체</option>
                { elements.map(element => (
                    <option value={element} key={getUUID()}>{element}</option>
                )) }
            </select>

            { textInput }
        </div>
    );
}