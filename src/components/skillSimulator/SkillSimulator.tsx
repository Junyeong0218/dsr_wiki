import React, { useEffect, useMemo, useRef, useState } from "react";
import { Digimon, Item } from "../../classes";
import { getAllDigimons } from "../../functions";
import { getSearchedDigimons } from "../../functions/searchFunctions";
import { Grades } from "../../enums";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import DigimonStatus from "../digidex/digimonStatus";
import { getItemById, getItemByName } from "../../functions/getItemsFunctions";
import { enhanceSkill, getEnhanceRate } from "../../functions/skillSimulatorFunctions";

type Spent = {
    spentItems: Array<SpentItem>,
    bits: number
}

type SpentItem = {
    item: Item,
    count: number
}

const getDefaultSpent = (grade: number|undefined): Spent => {
    if(grade === undefined || grade > 6 || grade < 3)
        return {
            spentItems: [],
            bits: 0
        }
    
    const gradeKor = Grades[grade];
    const defaultCube = getItemByName(`${gradeKor} 스킬 강화석`)!;
    const upItem1 = getItemByName("고급 강화 재료")!;
    const upItem2 = getItemByName("최고급 강화 재료", false)!;
    const downItem1 = getItemByName("최하급 스킬 보호석")!;

    return {
        spentItems: [
            { item: defaultCube, count: 0 },
            { item: upItem1, count: 0 },
            { item: upItem2, count: 0 },
            { item: downItem1, count: 0 }
        ],
        bits: 0
    }
}

export default function SkillSimulator(): React.ReactElement {
    const all = useRef<Array<Digimon>>(getAllDigimons(false));
    
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState<Array<Digimon>>(all.current);
    const [selectedDigimon, setSelectedDigimon] = useState<Digimon>();
    const [skillLevels, setSkillLevels] = useState<{[key:number]: number}>({ 1: 1, 2: 1, 3: 1});
    const [skillIndex, setSkillIndex] = useState<number>();

    const [openFlag, setOpenFlag] = useState("");
    const [enhanceHelper, setEnhanceHelper] = useState({ upId: 0, downId: 0});
    const [spent, setSpent] = useState(getDefaultSpent(selectedDigimon?.grade));

    const enhanceRate = useMemo(() => {
        return getEnhanceRate(selectedDigimon?.grade, skillIndex === undefined ? 1 : skillLevels[skillIndex + 1]);
    }, [selectedDigimon, skillLevels, skillIndex]);

    useEffect(() => {
        const d = getDefaultSpent(selectedDigimon?.grade);
        // setSpent(getDefaultSpent(selectedDigimon?.grade));
        setSpent(d);
    }, [selectedDigimon]);

    const getSuccessRate = () => {
        if(skillIndex === undefined) return 0;
        if(skillLevels[skillIndex + 1] === 10) return 0;

        let rate = enhanceRate.successRate * 100;
        const upItem = getItemById(enhanceHelper.upId);
        if(upItem?.name === "고급 강화 재료") rate += 10;
        if(upItem?.name === "최고급 강화 재료") rate += 15;

        if(rate > 100) rate = 100;

        return rate;
    }

    const getFailRate = () => {
        const successRate = getSuccessRate();

        return 100 - successRate;
    }

    const getDownRate = () => {
        if(skillIndex === undefined) return 0;
        if(skillLevels[skillIndex + 1] === 10) return 0;

        let rate = enhanceRate.downRate * 100;
        const downItem = getItemById(enhanceHelper.downId);
        if(downItem) rate -= 5;

        if(rate < 0) rate = 0;

        return rate;
    }

    const getSuccessRateText = () => {
        const upItem = getItemById(enhanceHelper.upId);

        if(!upItem) return "";
        return ` (${upItem.name} 적용)`;
    }

    const getDownRateText = () => {
        const downItem = getItemById(enhanceHelper.downId);

        if(!downItem) return "";
        return ` (${downItem.name} 적용)`;
    }

    const updateText = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        if(target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = target.value.trim();

            if(typed === "") {
                setText(typed);
                setFiltered([...all.current]);
            } else if(!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = getSearchedDigimons(target.value.trim());
                setFiltered(searched);
            }
        }
    }

    const getDefaultBit = (grade: number|undefined) => {
        if(grade === undefined) return 0;
        if(grade === 3) return 1000;
        if(grade === 4) return 2000;
        if(grade === 5) return 5000;
        return 10000;
    }

    const enhance = (event: React.MouseEvent) => {
        const target = event.target as HTMLButtonElement;
        if(target.classList.contains("disabled")) return;
        if(!selectedDigimon) return;
        if(skillIndex === undefined) return;
        if(skillLevels[skillIndex + 1] > 9) {
            alert("이미 최고레벨입니다.");
            return;
        }

        target.classList.add("disabled");

        const upItem = getItemById(enhanceHelper.upId);
        const downItem = getItemById(enhanceHelper.downId)!;
        
        const result = enhanceSkill(selectedDigimon.grade, skillLevels[skillIndex + 1], enhanceHelper);

        const enhanceInfo = {
            grade: selectedDigimon.grade,
            from: skillLevels[skillIndex + 1],
            to: skillLevels[skillIndex + 1] + 1,
            upItem: upItem ?? null,
            downItem: downItem ?? null,
            result: result ?? null
        }

        fetch('/.netlify/functions/insertEnhanceLog', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enhanceInfo)
        }).then(async response => {
            const dbInsertResult = await response.json();
            if(dbInsertResult.result === true) {
                if(result === "success") {
                    skillLevels[skillIndex + 1]++;
                } else if(result === "down") {
                    skillLevels[skillIndex + 1]--;
                }
        
                spent.bits += getDefaultBit(selectedDigimon.grade);
                spent.spentItems[0].count++;
        
                if(upItem) {
                    if(upItem.name === "고급 강화 재료") spent.spentItems[1].count++;
                    else if(upItem.name === "최고급 강화 재료") spent.spentItems[2].count++;
                }
                if(downItem) {
                    if(downItem.name === "최하급 스킬 보호석") spent.spentItems[3].count++;
                }

                setSkillLevels({ ...skillLevels });
                setSpent({ ...spent });
            }
        }).catch(error => {
            alert("데이터베이스 오류");
        }).finally(() => {
            target.classList.remove("disabled");
        });
    }

    return (
        <div className="main">
            <div className="skill-simulator-container">
                <div className="digimon-selector">
                    <div className="search-bar">
                        <input type="text" value={text} onChange={updateText} placeholder="디지몬 초성 혹은 이름을 입력하세요." />
                    </div>
                    { text === "" && !selectedDigimon && <div className="digimons">↑ 디지몬 검색 ↑</div> }
                    { text === "" && selectedDigimon && 
                        <div className="selected-digimon-info">
                            <img src={`/images/${selectedDigimon.name}.png`} />
                            <div className="digimon-info-shortcut">
                                <span className="name">{selectedDigimon.name}</span>
                                <span className="grade">{Grades[selectedDigimon.grade]}</span>
                                <span className="element">속성 :&nbsp;<img src={`/images/${selectedDigimon.digimonType}.png`} /></span>
                            </div>
                        </div>}
                    { text === "" && selectedDigimon && <DigimonStatus digimon={selectedDigimon} />}
                    { text !== "" && 
                        <div className="digimons">
                            { filtered.map(digimon => (
                                <div className="digimon" key={getUUID()} onClick={() => {
                                    setText("");
                                    setSelectedDigimon(digimon);
                                }}>
                                    <img src={`/images/${digimon.name}.png`} />
                                    <div className="simulator-digimon-info">
                                        { digimon.tag && <span className="name" dangerouslySetInnerHTML={{ __html: digimon.tag }}></span> }
                                        { !digimon.tag && <span className="name">{digimon.name}</span> }
                                        <span className="grade">{Grades[digimon.grade]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>}
                </div>
                <div className="skill-simulator">
                    <div className="skill-list">
                        <div className="title">스킬 정보</div>
                        {/* 1 ~ 3 skill */}
                        { selectedDigimon && selectedDigimon.skills.map((skill, index) => (
                            <div className={`skill ${skillIndex === index ? "selected" : ""}`} key={getUUID()} onClick={() => setSkillIndex(index)}>
                                <img src={`/images/${selectedDigimon.name}_${getNameExceptColon(skill.name)}.png`} key={getUUID()}/>
                                <span>{skill.name}</span>
                                <span>Lv.{skillLevels[index + 1]}</span>
                            </div>
                        ))}
                        { selectedDigimon === undefined && new Array(3).fill("", 0, 3).map(() => (<div className="skill" key={getUUID()}></div>)) }
                    </div>
                    { selectedDigimon && skillIndex !== undefined &&
                        <div className="skill-descriptions">
                            <div className="skill-description">
                                {/* now */}
                                <div className="title">Lv.{skillLevels[skillIndex + 1]}</div>
                                <span>공격 횟수 : {selectedDigimon.skills[skillIndex].attackCount}타</span>
                                <span>스킬 계수 :&nbsp;<mark>{selectedDigimon.skills[skillIndex].getPercentByIndex(skillLevels[skillIndex + 1] - 1)}%</mark></span>
                                <span>적용 대상 : {selectedDigimon.skills[skillIndex].range} {selectedDigimon.skills[skillIndex].target} {selectedDigimon.skills[skillIndex].targetCount}</span>
                                <span>속성 :&nbsp;<img src={`/images/스킬_${selectedDigimon.skills[skillIndex].element}.png`} />&nbsp;{selectedDigimon.skills[skillIndex].element}</span>
                                {selectedDigimon.skills[skillIndex].additionalTurn && 
                                    <span>추가 시전 턴 : {selectedDigimon.skills[skillIndex].additionalTurn}턴</span>}
                                {selectedDigimon.skills[skillIndex].effect && 
                                    <span>추가 효과 :&nbsp;<img src={`/images/스킬_${selectedDigimon.skills[skillIndex].effect}.png`} />&nbsp;{selectedDigimon.skills[skillIndex].effect}</span>}
                            </div>
                            <div className="arrow">→</div>
                            { selectedDigimon.skills[skillIndex].coefficients.length <= skillLevels[skillIndex + 1] && 
                                <div className="skill-description"></div>
                            }
                            { selectedDigimon.skills[skillIndex].coefficients.length > skillLevels[skillIndex + 1] && 
                                <div className="skill-description">
                                    {/* after */}
                                    <div className="title">Lv.{skillLevels[skillIndex + 1] + 1}</div>
                                    <span>공격 횟수 : {selectedDigimon.skills[skillIndex].attackCount}타</span>
                                    <span>스킬 계수 :&nbsp;<mark>{selectedDigimon.skills[skillIndex].getPercentByIndex(skillLevels[skillIndex + 1])}%</mark></span>
                                    <span>적용 대상 : {selectedDigimon.skills[skillIndex].range} {selectedDigimon.skills[skillIndex].target} {selectedDigimon.skills[skillIndex].targetCount}</span>
                                    <span>속성 :&nbsp;<img src={`/images/스킬_${selectedDigimon.skills[skillIndex].element}.png`} />&nbsp;{selectedDigimon.skills[skillIndex].element}</span>
                                    {selectedDigimon.skills[skillIndex].additionalTurn && 
                                        <span>추가 시전 턴 : {selectedDigimon.skills[skillIndex].additionalTurn}턴</span>}
                                    {selectedDigimon.skills[skillIndex].effect && 
                                        <span>추가 효과 :&nbsp;<img src={`/images/스킬_${selectedDigimon.skills[skillIndex].effect}.png`} />&nbsp;{selectedDigimon.skills[skillIndex].effect}</span>}
                                </div>
                            }
                        </div>
                    }
                    { (!selectedDigimon || skillIndex === undefined) && 
                        <div className="skill-descriptions">
                            <div className="skill-description">
                                {/* now */}
                                <div className="title">Lv.0</div>
                            </div>
                            <div className="arrow">→</div>
                            <div className="skill-description">
                                {/* after */}
                                <div className="title">Lv.0</div>
                            </div>
                        </div>
                    }
                    <div className="usable-item-container">
                        <div className="title">강화 재료</div>
                        <div className="usable-items">
                            <div className="usable-item">
                                <div className="cell disabled">
                                    { selectedDigimon?.grade === 3 && <img src={`/images/성장기 스킬 강화석.png`} />}
                                    { selectedDigimon?.grade === 4 && <img src={`/images/성숙기 스킬 강화석.png`} />}
                                    { selectedDigimon?.grade === 5 && <img src={`/images/완전체 스킬 강화석.png`} />}
                                    { selectedDigimon?.grade === 6 && <img src={`/images/궁극체 스킬 강화석.png`} />}
                                </div>
                                <div className="title">기본 재료</div>
                            </div>
                            <div className="usable-item">
                                <div className="cell clickable" onClick={() => {
                                    if(openFlag !== "up") setOpenFlag("up");
                                    else setOpenFlag("");
                                }}>
                                    {enhanceHelper.upId !== 0 && <img src={`/images/${getItemById(enhanceHelper.upId)!.name}.png`} />}
                                    {enhanceHelper.upId !== 0 && 
                                        <button type="button" className="remove-button" onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            enhanceHelper.upId = 0;
                                            setEnhanceHelper({ ...enhanceHelper });
                                        }}>
                                            <img src="/images/remove_button.png" />
                                        </button>
                                    }
                                </div>
                                <div className="title">성공확률 UP</div>
                                <div className={`modal ${openFlag === "up" ? "active" : ""}`}>
                                    <div className="window">
                                        {/* 강화 확률 증가 */}
                                        <div className="items">
                                            <button type="button" className="item" onClick={() => {
                                                enhanceHelper.upId = getItemByName("고급 강화 재료")!.id;
                                                setEnhanceHelper({ ...enhanceHelper });
                                                setOpenFlag("");
                                            }}>
                                                <img src="/images/고급 강화 재료.png" />
                                                <div className="item-info">
                                                    <span className="name">고급 강화 재료</span>
                                                    <span className="effect">성공확률 10% 증가</span>
                                                </div>
                                            </button>
                                            <button type="button" className="item" onClick={() => {
                                                enhanceHelper.upId = getItemByName("최고급 강화 재료", false)!.id;
                                                setEnhanceHelper({ ...enhanceHelper });
                                                setOpenFlag("");
                                            }}>
                                                <img src="/images/최고급 강화 재료.png" />
                                                <div className="item-info">
                                                    <span className="name">최고급 강화 재료</span>
                                                    <span className="effect">성공확률 15% 증가</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="usable-item">
                                <div className={`cell ${selectedDigimon && skillIndex && (skillLevels[skillIndex + 1] > 5 && skillLevels[skillIndex + 1] < 10) ? "clickable" : "disabled"}`}
                                     onClick={(event) => {
                                        if(!(event.target as HTMLDivElement).classList.contains("clickable")) return;
                                        if(openFlag !== "down") setOpenFlag("down");
                                        else setOpenFlag("");
                                     }}>
                                    {enhanceHelper.downId !== 0 && <img src={`/images/${getItemById(enhanceHelper.downId)!.name}.png`} />}
                                    {enhanceHelper.downId !== 0 && 
                                        <button type="button" className="remove-button" onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            enhanceHelper.downId = 0;
                                            setEnhanceHelper({ ...enhanceHelper });
                                        }}>
                                            <img src="/images/remove_button.png" />
                                        </button>
                                    }
                                </div>
                                <div className="title">단계 하락확률 DOWN</div>
                                <div className={`modal ${openFlag === "down" ? "active" : ""}`}>
                                    <div className="window">
                                        {/* 강화 단계 다운 확률 감소 */}
                                        <div className="items">
                                            <button type="button" className="item" onClick={() => {
                                                enhanceHelper.downId = getItemByName("최하급 스킬 보호석")!.id;
                                                setEnhanceHelper({ ...enhanceHelper });
                                                setOpenFlag("");
                                            }}>
                                                <img src="/images/최하급 스킬 보호석.png" />
                                                <div className="item-info">
                                                    <span className="name">최하급 스킬 보호석</span>
                                                    <span className="effect">단계 하락 확률 5% 감소</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rate-container">
                        <div className="title">확률</div>
                        <div className="rates">
                            <span className="success">성공 확률 :&nbsp;<mark>{getSuccessRate()}%{getSuccessRateText()}</mark></span>
                            <span className="fail">실패 확률 :&nbsp;<mark>{getFailRate()}%</mark></span>
                            <span className="down">실패시 단계 하락 확률 :&nbsp;<mark>{getDownRate()}%{getDownRateText()}</mark></span>
                        </div>
                    </div>
                    <div className="bit-container">
                        <div className="title">소모 비용</div>
                        <div className="bits">
                            <span>{getDefaultBit(selectedDigimon?.grade).toLocaleString("ko-KR")}</span>
                            <img src="/images/조합 비트 아이콘.png" />
                        </div>
                    </div>
                    <div className="enhance-button-container">
                        <button type="button" className="enhance-button" onClick={enhance}>강화</button>
                    </div>
                </div>
                <div className="result-container">
                    {/* <div className="propability-container">
                        <div className="title">확률 검증</div>
                        <table className="propabilities">
                            <thead>
                                <tr>
                                    <td rowSpan={2}></td><th colSpan={3}>전체</th><th colSpan={3}>본인</th>
                                </tr>
                                <tr>
                                    <th>고강재</th>최고강재<th>기본</th><th>고강재</th>최고강재<th>기본</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1강 → 2강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>2강 → 3강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>3강 → 4강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>4강 → 5강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>5강 → 6강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>6강 → 7강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>7강 → 8강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>8강 → 9강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <th>9강 → 10강</th><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                    <div className="spent-container">
                        <div className="title">소모된 재화</div>
                        <div className="spents">
                            { spent.spentItems.map(spentItem => (
                                <div className="spent" key={getUUID()}>
                                    <img src={`/images/${spentItem.item.name}.png`} />
                                    <div className="spent-info">
                                        <span>{spentItem.item.name}</span>
                                        <span>사용 수량 : {spentItem.count.toLocaleString("ko-KR")} 개</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bit-container">
                        <div className="title">소모된 비용</div>
                        <div className="bits">
                            <span>{spent.bits.toLocaleString("ko-KR")}</span>
                            <img src="/images/조합 비트 아이콘.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}