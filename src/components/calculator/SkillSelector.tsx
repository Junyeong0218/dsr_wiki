import React, { useMemo, useState } from "react";
import { Digimon } from "../../classes";
import { getUUID } from "../../functions/commons";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";

type props = {
    userDigimon: Digimon | undefined,
    skillIndex: number
    setSkillIndex: React.Dispatch<React.SetStateAction<number>>
    skillLevel: number
    setSkillLevel: React.Dispatch<React.SetStateAction<number>>
}

type Option = {
    label: string
    value: number
}

export default function SkillSelector({ userDigimon, skillIndex, setSkillIndex, skillLevel, setSkillLevel }: props): React.ReactElement {
    const skills = userDigimon?.skills;

    const [index, setIndex] = useState<Option>({ label: `${skillIndex + 1}스킬`, value: skillIndex });

    const skillIndexOptions = [ { label: "1스킬", value: 0 }, { label: "2스킬", value: 1 }, { label: "3스킬", value: 2 } ]
    const onChangeSkillIndex = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        if(!newValue) return;

        setIndex(newValue);

        setSkillIndex(newValue.value);
    }

    const monsterSelector = <ReactSelect styles={{
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
    }} options={skillIndexOptions} value={index} onChange={onChangeSkillIndex} />

    return (
        <div className="skill-selector-container">
            <div className="title">스킬 선택</div>
            { monsterSelector }
            <div className="level-selector">
                { skills && skills[index.value] && skills[index.value].coefficients.map((rate, index) => {
                    return <button type="button" className={`${index === skillLevel ? "active" : ""}`} key={getUUID()} onClick={() => setSkillLevel(index)}>
                                <span>{index + 1}강</span>
                                <span>{skills[skillIndex].getPercentByIndex(index)}%</span>
                            </button>
                }) }
                { (!skills || !skills[index.value]) && 
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