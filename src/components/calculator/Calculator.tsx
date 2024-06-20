import React, { useMemo, useState } from "react";
import { Digimon, Monster } from "../../classes";
import UserDigimonSelector from "./UserDigimonSelector";
import { getUUID } from "../../functions/commons";
import UserDigimonInfo from "./UserDigimonInfo";
import MonsterSelector from "./MonsterSelector";
import MonsterInfo from "./MonsterInfo";
import SkillSelector from "./SkillSelector";
import { DigimonOptionalStats, getAdditionalStr, getDamage, getReqStr } from "../../functions/getAttackInfos";

export default function Calculator(): React.ReactElement {
    const [userDigimon, setUserDigimon] = useState<Digimon>();
    const [monster, setMonster] = useState<Monster>();
    const [skillIndex, setSkillIndex] = useState<number>(0);
    const [skillLevel, setSkillLevel] = useState<number>(0);
    const [potential, setPotential] = useState<number | string>("");
    const [adjustment, setAdjustment] = useState<number | string>("");
    const [synergy, setSynergy] = useState<number | string>("");
    const [buff, setBuff] = useState<number | string>("");
    const [specialize, setSpecialize] = useState<number | string>("");
    const [equipment, setEquipment] = useState<number | string>("");

    const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number | string>>, originValue: number | string) => {
        let value: number | string = event.target.value;
        const regex = /[0-9]/g;
        const result = regex.exec(value);

        if(value === "") {
            setState(value);
            return;
        } else if(result === null || isNaN(Number(value))) {
            setState(originValue);
            return;
        }

        value = Number(value);
        setState(value);
    }

    const DigimonSelectorTag = useMemo(() => {
        return <UserDigimonSelector key={getUUID()} userDigimon={userDigimon} setUserDigimon={setUserDigimon} />
    }, [userDigimon]);

    const UserDigimonInfoTag = useMemo(() => {
        return <UserDigimonInfo key={getUUID()} userDigimon={userDigimon} />
    }, [userDigimon]);

    const SkillSelectorTag = useMemo(() => {
        return <SkillSelector key={getUUID()} userDigimon={userDigimon} skillIndex={skillIndex} setSkillIndex={setSkillIndex}
                                                                        skillLevel={skillLevel} setSkillLevel={setSkillLevel} />
    }, [userDigimon, skillLevel]);

    const userDigimonTag = <div className="user-digimon">
                                <div className="title">공격할 디지몬</div>
                                { DigimonSelectorTag }
                                { UserDigimonInfoTag }
                                { SkillSelectorTag }
                                <div className="optional-stats">
                                    <div className="title">추가 능력치</div>
                                    <div className="optional-stat">
                                        <span className="title">포텐셜(%)</span>
                                        <div><input type="text" value={potential} onChange={(e) => onchangeHandler(e, setPotential, potential)}/></div>
                                    </div>
                                    <div className="optional-stat">
                                        <span className="title">유년기 교정(%)</span>
                                        <div><input type="text" value={adjustment} onChange={(e) => onchangeHandler(e, setAdjustment, adjustment)}/></div>
                                    </div>
                                    <div className="optional-stat">
                                        <span className="title">시너지(%)</span>
                                        <div><input type="text" value={synergy} onChange={(e) => onchangeHandler(e, setSynergy, synergy)}/></div>
                                    </div>
                                    <div className="optional-stat">
                                        <span className="title">버프</span>
                                        <div><input type="text" value={buff} onChange={(e) => onchangeHandler(e, setBuff, buff)}/></div>
                                    </div>
                                    <div className="optional-stat">
                                        <span className="title">특화</span>
                                        <div><input type="text" value={specialize} onChange={(e) => onchangeHandler(e, setSpecialize, specialize)}/></div>
                                    </div>
                                    <div className="optional-stat">
                                        <span className="title">장비</span>
                                        <div><input type="text" value={equipment} onChange={(e) => onchangeHandler(e, setEquipment, equipment)}/></div>
                                    </div>
                                </div>
                            </div>

    const monsterTag = useMemo(() => {
        return <div className="target-monster">
                    <div className="title">싸울 디지몬</div>
                    <MonsterSelector key={getUUID()} monster={monster} setMonster={setMonster} />
                    <MonsterInfo key={getUUID()} monster={monster} />
                </div>
    }, [monster]);

    const optionalStats: DigimonOptionalStats = {
        potential: typeof potential === "string" ? 0 : potential,
        adjustment: typeof adjustment === "string" ? 0 : adjustment,
        synergy: typeof synergy === "string" ? 0 : synergy,
        buff: typeof buff === "string" ? 0 : buff,
        specialize: typeof specialize === "string" ? 0 : specialize,
        equipment: typeof equipment === "string" ? 0 : equipment
    }

    const additionalStr = getAdditionalStr(userDigimon, optionalStats);
    const skillInfo = { skillIndex, skillLevel }
    const use1Str = getReqStr(userDigimon, monster, skillInfo, 1);
    const use2Str = getReqStr(userDigimon, monster, skillInfo, 2);
    const use3Str = getReqStr(userDigimon, monster, skillInfo, 3);

    const damage = getDamage((userDigimon?.str ?? 0) + additionalStr, userDigimon, monster, skillInfo);

    return (
        <div className="main">
            <div className="calculator">
                { userDigimonTag }
                { monsterTag }
                <div className="calculate-result-container">
                    <div className="title">계산 결과</div>
                    <div className="current-stat">
                        <div className="title">현재 힘 스텟</div>
                        <div>{ `${(userDigimon?.str ?? 0) + additionalStr}(+${additionalStr})` }</div>
                    </div>
                    <div className="req-strs">
                        <div className="title">스킬 사용 횟수별 필요 힘</div>
                        <div className={`req-str ${(userDigimon?.str ?? 0) + additionalStr >= use1Str ? "active" : "inactive"}`}>
                            <span className="title">1회</span>
                            <span>{ use1Str.toLocaleString("ko-KR") }</span>
                        </div>
                        <div className={`req-str ${(userDigimon?.str ?? 0) + additionalStr >= use2Str ? "active" : "inactive"}`}>
                            <span className="title">2회</span>
                            <span>{ use2Str.toLocaleString("ko-KR") }</span>
                        </div>
                        <div className={`req-str ${(userDigimon?.str ?? 0) + additionalStr >= use3Str ? "active" : "inactive"}`}>
                            <span className="title">3회</span>
                            <span>{ use3Str.toLocaleString("ko-KR") }</span>
                        </div>
                    </div>
                    <div className="damage">
                        <div className="title">스킬 1회 사용 최소 데미지</div>
                        <div>{ damage.toLocaleString("ko-KR") }</div>
                    </div>
                </div>
            </div>
        </div>
    );
}