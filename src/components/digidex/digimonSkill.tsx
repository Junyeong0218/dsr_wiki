import React, { useState } from "react";
import DigimonSkillTable from "./digimonSkillTable";
import { Skill } from "../../classes";
import { getNameExceptColon } from "../../functions/commons";
import { getDigimonFileName } from "../../functions/getDigimonFileName";
import FullWeakDigimonModal from "./FullWeakDigimonModal";

type DigimonSkillProps = { digimonName: string, skill: Skill }

export default function DigimonSkill({ digimonName, skill }: DigimonSkillProps): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="skill">
            <div className="skill-shortcut">
                <img src={`/images/${getDigimonFileName(digimonName)}_${getNameExceptColon(skill.name)}.png`} />
                <div className="skill-info">
                    <div className="skill-title">
                        <span className="skill-name">{skill.name}</span>
                        <img src={`/images/스킬_${skill.element}.png`} title={`${skill.element} 속성`} />
                        <button type="button" className="show-weak-digimon-button" onClick={() => setIsOpen(true)}>약점 디지몬 보기</button>
                        <FullWeakDigimonModal isOpen={isOpen} setIsOpen={setIsOpen} skill={skill} />
                    </div>
                    <div className="badges">
                        <span className={`badge ${skill.range === "근거리" ? "melee" : "ranged"}`}>{skill.range}</span>
                        <span className={`badge ${skill.target === "적" ? "enemy" : "team"}`}>{skill.target} {skill.targetCount}</span>
                        { skill.attackCount === 0 && <span className="badge team">버프</span> }
                        { skill.attackCount > 0 && <span className="badge ranged">{skill.attackCount}타</span> }
                        { skill.additionalTurn && <span className="badge turn">{skill.additionalTurn} 추가 시전 턴</span> }
                        { skill.effect && <span className="badge effect">{skill.effect}</span> }
                        {/* <span className="badge range">{skill.range}</span> */}
                    </div>
                </div>
            </div>
            <DigimonSkillTable skill={skill} />
        </div>
    );
}