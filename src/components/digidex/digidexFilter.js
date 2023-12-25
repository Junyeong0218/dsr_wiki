import React from "react";
import { Elements, Grades, DigimonTypes } from "../../enums";
import { getUUID } from "../../functions/commons";

export default function DigidexFilter({ selectedGrade, setSelectedGrade,
                                        selectedType, setSelectedType,
                                        selectedElement, setSelectedElement }) {
    const grades = Object.values(Grades).filter(each => each !== "유년기1" && each !== "유년기2");
    const digimonTypes = Object.values(DigimonTypes);
    const elements = Object.values(Elements);

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
        </div>
    );
}