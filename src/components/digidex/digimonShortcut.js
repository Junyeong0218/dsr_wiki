import React from "react";
import { GradeClassNames, Grades } from "../../enums";
import { Link, useNavigate } from "react-router-dom";

export default function DigimonShortcut({ digimon }) {
    const navigate = useNavigate();

    return (
        <div className="digimon-shortcut-container">
            <img className={`${GradeClassNames[Grades[`${digimon.grade}`]]}2`} src={`/images/${digimon.name}.png`}/>
            <div className="digimon-shortcut-info">
                <span className="digimon-name">{digimon.name}</span>
                <span>{Grades[`${digimon.grade}`]}</span>
                <img src={`/images/${digimon.digimonType}.png`} />
            </div>
            <button type="button" className="back-button" onClick={() => navigate(-1)}>
                도감으로 돌아가기
            </button>
        </div>
    );
}