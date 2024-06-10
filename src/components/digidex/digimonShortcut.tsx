import React from "react";
import { GradeClassNames, Grades } from "../../enums";
import { Link, useNavigate } from "react-router-dom";
import { Digimon } from "../../classes";
import Evolutions from "./evolutions";
import { getDigimonFileName } from "../../functions/getDigimonFileName";

type DigimonShortcutProps = { digimon: Digimon }

export default function DigimonShortcut({ digimon }: DigimonShortcutProps): React.ReactElement {
    const navigate = useNavigate();

    return (
        <div className="digimon-shortcut-container">
            <img className={`${GradeClassNames[Grades[`${digimon.grade}`]]}2`} src={`/images/${getDigimonFileName(digimon.name)}.png`}/>
            <div className="digimon-shortcut-info">
                <div className="digimon-name-container">
                    <span className="digimon-name">{digimon.name}</span>
                    <Evolutions digimon={digimon} />
                </div>
                <span>{Grades[`${digimon.grade}`]}</span>
                <img src={`/images/${digimon.digimonType}.png`} />
            </div>
            <button type="button" className="back-button" onClick={() => navigate("/digimons/digidex")}>
                도감으로 돌아가기
            </button>
        </div>
    );
}