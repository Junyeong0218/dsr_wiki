import React from "react";
import DigimonSkill from "./digimonSkill";
import { getUUID } from "../../functions/commons";
import { Digimon } from "../../classes";

type DigimonSkillsProps = { 
    digimon: Digimon,
    containModal: boolean
}

export default function DigimonSkills({ digimon, containModal }: DigimonSkillsProps): React.ReactElement {
    return (
        <div className="digimon-skills">
            <span className="title">* 스킬</span>
            { digimon.skills.length > 0 &&
                digimon.skills.map(skill => (
                    <DigimonSkill digimonName={digimon.name} skill={skill} containModal={containModal} key={getUUID()} />
                ))
            }
        </div>
    );
}