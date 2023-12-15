import React from "react";
import DigimonSkillTable from "./digimonSkillTable";

export default function DigimonSkill({ digimonName, skill }) {
    return (
        <div className="skill">
            <div className="skill-shortcut">
                <img src={`/images/${digimonName}_${skill.name}.png`} />
                <div className="skill-info">
                    <div className="skill-title">
                        <span className="skill-name">{skill.name}</span>
                        <img src={`/images/스킬_${skill.element}.png`} title={`${skill.element} 속성`} />
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