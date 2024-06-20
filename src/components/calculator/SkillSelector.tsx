import React, { useMemo } from "react";
import { Digimon } from "../../classes";
import { getUUID } from "../../functions/commons";

type props = {
    userDigimon: Digimon | undefined,
    skillIndex: number
    setSkillIndex: React.Dispatch<React.SetStateAction<number>>
    skillLevel: number
    setSkillLevel: React.Dispatch<React.SetStateAction<number>>
}

export default function SkillSelector({ userDigimon, skillIndex, setSkillIndex, skillLevel, setSkillLevel }: props): React.ReactElement {
    const skills = userDigimon?.skills;

    const indexSelector = useMemo(() => {
        return <select className="map-selector" defaultValue={skillIndex} onChange={(e) => setSkillIndex(Number(e.target.value))}>
                    <option value={0} key={getUUID()}>1스킬</option>
                    <option value={1} key={getUUID()}>2스킬</option>
                    <option value={2} key={getUUID()}>3스킬</option>
                </select>
        }, [skillIndex]);

    return (
        <div className="skill-selector-container">
            <div className="title">스킬 선택</div>
            { indexSelector }
            {/* <select className="level-selector" defaultValue={userDigimon?.id} onChange={(e) => setUserDigimon(all.find(d => d.id === Number(e.target.value)))}>
                { filtered.map(digimon => {
                   return <option value={digimon.id} key={getUUID()}>{digimon.name}</option>
                }) }
            </select> */}
            <div className="level-selector">
                { skills && skills[skillIndex] && skills[skillIndex].coefficients.map((rate, index) => {
                    return <button type="button" className={`${index === skillLevel ? "active" : ""}`} key={getUUID()} onClick={() => setSkillLevel(index)}>
                                <span>{index + 1}강</span>
                                <span>{skills[skillIndex].getPercentByIndex(index)}%</span>
                            </button>
                }) }
                { (!skills || !skills[skillIndex]) && 
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ].map((v, index) => {
                        return <button type="button" className={`${index === skillLevel ? "active" : ""}`} key={getUUID()} onClick={() => setSkillLevel(index)}>
                                    <span>{index + 1}강</span>
                                    <span>0%</span>
                                </button>
                    })
                }
            </div>
        </div>
    );
}