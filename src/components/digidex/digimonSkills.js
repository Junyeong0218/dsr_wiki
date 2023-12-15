import React from "react";
import DigimonSkill from "./digimonSkill";
import { getUUID } from "../../functions/commons";

export default function DigimonSkills({ digimon }) {
    return (
        <div className="digimon-stat">
            <span className="title">* 스킬</span>
            { digimon.skills.length > 0 &&
                digimon.skills.map(skill => (
                    <DigimonSkill digimonName={digimon.name} skill={skill} key={getUUID()} />
                ))
            }
        </div>
    );
}