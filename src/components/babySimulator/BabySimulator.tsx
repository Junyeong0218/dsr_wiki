import React, { useEffect, useState } from "react";
import { IBabyStatus, evolve, feed, getBabyItems, getFullnessState, hatch, pass90Min, passOneDay, play, successCellRange } from "../../functions/babySimulatorFunctions";
import { getAllEvolutions, getJustAfterEvolution } from "../../functions";
import { getItemByName } from "../../functions/getItemsFunctions";
import { Item } from "../../classes";
import { Grades } from "../../enums";
import ToRightProfileGroup from "../evolution/toRightProfileGroup";
import { getUUID } from "../../functions/commons";
import Profile from "../evolution/profile";
import ToRightProfileLine from "../evolution/toRightProfileLine";
import { IFeed, IToy } from "../../classes/BabyItem";
import RadarChart from "./RadarChart";
import Gauges from "./Gauges";

const eggs = [ 
    getItemByName("유년기1 디지타마(6시간)")!,
    getItemByName("유년기2 디지타마(6시간)")!,
    getItemByName("도도몬 디지타마")!,
    getItemByName("쟈리몬 디지타마")!,
    getItemByName("제리몬 디지타마")!,
    getItemByName("치코몬 디지타마")!,
    getItemByName("키몬 디지타마")!
];

type DateObj = {
    start: Date|null,
    nowText: string|null
}

type Interact = {
    play: number
    feed: number
}

type Log = {
    type: string,
    item?: IFeed|IToy,
    text?: string,
    dateText: string
}

export default function BabySimulator(): React.ReactElement {
    const [babies, setBabies] = useState(getAllEvolutions(false).filter(each => each.grade <= 2));
    const [babyItems, setBabyItems] = useState(getBabyItems());
    const [selectedEgg, setSelectedEgg] = useState<Item>();
    const [babyStatus, setBabyStatus] = useState<IBabyStatus>();
    const [dateObj, setDateObj] = useState<DateObj>({ start: null, nowText: null });
    const [interact, setInteract] = useState<Interact>({ play: 3, feed: 5 });
    const [openModalName, setOpenModalName] = useState("");
    const [logs, setLogs] = useState<Array<Log>>([]);
    const [childResult, setChildResult] = useState<IBabyStatus>();

    const hatchEgg = () => {
        if(!selectedEgg) return;

        const baby = hatch(selectedEgg);
        getJustAfterEvolution(baby.digimon);
        setBabyStatus(baby);

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        dateObj.start = new Date(`${year}-${month}-${day} 22:30`);
        dateObj.nowText = `${year}-${month}-${day} 22:30`;

        setDateObj({ ...dateObj });
    }

    const canPlay = () => interact.play > 0;
    const canFeed = () => interact.feed > 0;

    const feedTheFood = (food: IFeed) => {
        if(!canFeed()) {
            alert("오늘의 먹이주기가 끝났습니다.\n시간을 경과시켜주세요.");
            return;
        }

        const ate = feed(babyStatus!, food);
        if(!ate) {
            alert("배가 불러 음식을 먹을 수 없습니다.\n시간을 경과시키거나,\n놀아주기를 통해 포만 지수를 감소시키세요.");
            return;
        }

        interact.feed--;
        logs.splice(0, 0, {
            type: "feed",
            item: food,
            text: food.effects.map(effect => `${effect.name} + ${effect.value}`).join(", "),
            dateText: dateObj.nowText!
        })
        setLogs([...logs]);
        setInteract({ ...interact });
        setBabyStatus({ ...babyStatus! });
    }

    const playWith = (toy: IToy) => {
        if(!canPlay()) {
            alert("오늘의 놀아주기가 끝났습니다.\n시간을 경과시켜주세요.");
            return;
        }

        const sameDayUseLogs = logs.filter(log => {
            const logDate = new Date(log.dateText);
            const now = new Date(dateObj.nowText!);
            return log.type === "play" && 
                    logDate.getDate() === now.getDate() && 
                    log.item &&
                    log.item.name === toy.name
        });
        if(sameDayUseLogs.length > 0) {
            alert("오늘 이미 사용한 장난감입니다.\n같은 이름의 장난감은 하루에 하나만 사용할 수 있습니다.");
            return;
        }

        const played = play(babyStatus!, toy);
        if(!played) {
            alert("배가 고파 놀아줄 수 없습니다.\n먹이주기를 통해 포만 지수를 증가시키세요.");
            return;
        }

        interact.play--;
        logs.splice(0, 0, {
            type: "play",
            item: toy,
            text: `성장 지수 + ${toy.stature}, 만족도 + ${toy.satisfaction}, 포만 지수 - ${toy.fullness}`,
            dateText: dateObj.nowText!
        })
        setLogs([...logs]);
        setInteract({ ...interact });
        setBabyStatus({ ...babyStatus! });
    }

    const pass90Mins = () => {
        const log = pass90Min(babyStatus!, dateObj.nowText!);
        const newLogs = [log, ...logs];

        const before = new Date(dateObj.nowText!);
        const beforeDay = before.getDate();

        const now = new Date(before.getTime() + 90 * 60 * 1000);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");

        dateObj.nowText = `${year}-${month}-${day} ${hour}:${minute}`;

        setDateObj({ ...dateObj });
        setLogs(newLogs);
        setBabyStatus({ ...babyStatus! });
        if(now.getDate() - beforeDay > 0) {
            setInteract({ play: 3, feed: 5 });
        }
    }

    const passADay = () => {
        const dayLogs = passOneDay(babyStatus!, dateObj.nowText!);
        const newLogs = [...dayLogs, ...logs];

        const before = new Date(dateObj.nowText!);

        const now = new Date(before.getTime() + 24 * 60 * 60 * 1000);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");

        dateObj.nowText = `${year}-${month}-${day} ${hour}:${minute}`;

        setLogs(newLogs);
        setBabyStatus({ ...babyStatus! });
        setInteract({ play: 3, feed: 5 });
    }

    const fireEvolve = () => {
        if(!babyStatus) return;
        if(babyStatus.stature !== 100) {
            alert("성장 지수가 100 일때만 진화할 수 있습니다.\n놀아주기를 통해 성장지수를 올려보세요.");
            return;
        }
        const result = evolve(babyStatus)!;
        getJustAfterEvolution(result.digimon);
        
        if(result.digimon.grade === 2) {
            setBabyStatus({ ...result });
            return;
        }

        // 최종 결산
        console.log(result)
        setChildResult({ ...result });
    }

    const getPassedTimeString = () => {
        if(!dateObj.start || !dateObj.nowText) return;
        let dateString = `${dateObj.start.getFullYear()}-${String(dateObj.start.getMonth() + 1).padStart(2, "0")}-${String(dateObj.start.getDate()).padStart(2, "0")} ${String(dateObj.start.getHours()).padStart(2, "0")}:${String(dateObj.start.getMinutes()).padStart(2, "0")} ~ `;

        const start = dateObj.start.getTime();
        const passed = logs.filter(log => log.type === "90time").length * 90;
        const end = new Date(start + passed * 60 * 1000);

        dateString += `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")} ${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;

        const date = Math.floor(passed / (24 * 60));
        const hours = Math.floor((passed - (date * 24 * 60)) / 60);
        const minutes = passed - date * 24 * 60 - hours * 60;

        dateString += ` (${date}일 ${hours}시간 ${minutes}분)`;

        return dateString;
    }

    return (
        <div className="main">
            <div className="baby-simulator-container">
                <div className="baby-simulator">
                    <div className="hatch-container">
                        <img src="/images/hatch.png" style={{ width: "400px" }}/>
                        { babyStatus && <img src={`/images/${babyStatus.digimon.name}.png`} className="selected" style={{ top: "170px", left: "405px" }}/> }
                        { babyStatus && 
                            <div className="interact-buttons">
                                <button type="button" onClick={() => {
                                    if(openModalName !== "toy") setOpenModalName("toy");
                                    else setOpenModalName("");
                                }}>
                                    <img src="/images/섬_놀아주기.png" />
                                    <span>놀아주기&#40;{interact.play}/3&#41;</span>
                                </button>
                                <div className={`modal ${openModalName === "toy" ? "active" : ""}`} style={{ transform: "translate(40%, 40%)" }}>
                                    <div className="window">
                                        <div className="toys">
                                            { babyItems.toys.map(toy => (
                                                <button type="button" onClick={() => playWith(toy)} key={getUUID()}>
                                                    <img src={`/images/${toy.name}.png`} />
                                                    <div className="description">
                                                        <span className="title">{toy.name}</span>
                                                        <span>성장 지수 + {toy.stature}</span>
                                                        <span>만족도 + {toy.satisfaction}</span>
                                                        <span>포만 지수 - {toy.fullness}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={() => {
                                    if(openModalName !== "feed") setOpenModalName("feed");
                                    else setOpenModalName("");
                                }}>
                                    <img src="/images/섬_먹이주기.png" />
                                    <span>먹이주기&#40;{interact.feed}/5&#41;</span>
                                </button>
                                <div className={`modal ${openModalName === "feed" ? "active" : ""}`} style={{ transform: "translate(100%, 40%)" }}>
                                    <div className="window">
                                        <div className="toys">
                                            { babyItems.feeds.map(food => (
                                                <button type="button" onClick={() => feedTheFood(food)} key={getUUID()}>
                                                    <img src={`/images/${food.name}.png`} />
                                                    <div className="description">
                                                        <span className="title">{food.name}</span>
                                                        <span>포만 지수 + {food.fullness}</span>
                                                        { food.effects.map(effect => <span key={getUUID()}>{effect.name} + {effect.value}</span>)}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={pass90Mins}>
                                    <img src="/images/타임몬의 시계바늘(1시간).png" />
                                    <span>90분 경과</span>
                                </button>
                                <button type="button" onClick={passADay}>
                                    <img src="/images/타임몬의 시계바늘(1시간).png" />
                                    <span>1일 경과</span>
                                </button>
                            </div>}
                    </div>
                    <div className="simulator-logs-container">
                        <div className="title">로그</div>
                        <div className="simulator-logs">
                            { logs.map(log => {
                                if(log.type === "feed")
                                    return <div className="log" key={getUUID()}>
                                        <div className="title">
                                            먹이주기
                                            <img src={`/images/${log.item!.name}.png`} />
                                        </div>
                                        <div className="description">{log.text}</div>
                                    </div>
                                if(log.type === "play")
                                    return <div className="log" key={getUUID()}>
                                    <div className="title">
                                        놀아주기
                                        <img src={`/images/${log.item!.name}.png`} />
                                    </div>
                                    <div className="description">{log.text}</div>
                                </div>

                                return <div className="log" key={getUUID()}>
                                    <div className="title">
                                        90분 경과
                                        <img src={`/images/타임몬의 시계바늘(1시간).png`} />
                                    </div>
                                    <div className="description">{log.text}</div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                { !babyStatus && 
                    <div className="egg-selector">
                        <div className="eggs">
                            { eggs.map(egg => (
                                <button className={`egg ${selectedEgg?.id === egg.id ? "selected" : ""}`} key={getUUID()}
                                        onClick={() => setSelectedEgg(egg)}>
                                    <img src={`/images/${egg.name}.png`} />
                                    <span>{egg.name.replace("(6시간)", "")}</span>
                                </button>
                            ))}
                        </div>
                        <button className="submit" onClick={hatchEgg}>부화</button>
                    </div>}
                { babyStatus && 
                    <div className="baby-informations">
                        <div className="baby-status-container">
                            <div className="baby-status">
                                <div className="baby-shorcut">
                                    <div className="title">{babyStatus.digimon.name}</div>
                                    <img src={`/images/${babyStatus.digimon.name}.png`} />
                                    <div className="grade">{Grades[babyStatus.digimon.grade]}</div>
                                </div>
                                <div className="baby-status-description">
                                    <div className="time-container">
                                        현재 시각 : {dateObj.nowText}
                                    </div>
                                    <div className="gauge-container">
                                        <div className="gauge-title-container">
                                            <div className="title">성장 지수</div>
                                            <div className="value">&#40;{babyStatus.stature}/100&#41;</div>
                                        </div>
                                        <div className="gauge-track">
                                            <span className="gauge cyan" style={{ width: `${(babyStatus.stature/100 * 100)}%`}}></span>
                                        </div>
                                    </div>
                                    <div className="gauge-container">
                                        <div className="gauge-title-container">
                                            <div className="title">포만 지수&#40;{getFullnessState(babyStatus)}&#41;</div>
                                            <div className="value">&#40;{babyStatus.fullness}/300&#41;</div>
                                        </div>
                                        <div className="gauge-track">
                                            <span className="gauge orange" style={{ width: `${Math.round((babyStatus.fullness/300) * 100)}%`}}></span>
                                        </div>
                                    </div>
                                    <div className="gauge-container">
                                        <div className="gauge-title-container">
                                            <div className="title">만족도</div>
                                            <div className="value">{babyStatus.satisfaction}%</div>
                                        </div>
                                        <div className="gauge-track-dot">
                                            { successCellRange.map((v, index) => {
                                                const standard = Math.floor((index + 1) * 12.5);
                                                const sub = babyStatus.satisfaction - standard;
                                                if(sub >= 0) 
                                                    return <span className={`gauge-dot ${index === 0 ? "red": "blue"}`} key={getUUID()} style={{ width: `calc(12.5% - 5px)`}}></span>
                                                if(sub > -12.5)
                                                    return <span className={`gauge-dot ${index === 0 ? "red": "blue"}`} key={getUUID()} style={{ width: `calc(${(sub + 12.5)}%)`}}></span>
                                                
                                                return <span className="gauge-dot blank" key={getUUID()}></span>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <RadarChart weighted={babyStatus.weighted} />
                            </div>
                            <button type="button" className="evolve" onClick={fireEvolve}>진화</button>
                        </div>
                        <div className="baby-evolution-container">
                            <div className="title">진화트리</div>
                            { babyStatus && babyStatus.digimon.afters && 
                                <div className="baby-evolutions">
                                    <Profile digimon={babyStatus.digimon} />
                                    <ToRightProfileLine digimon={babyStatus.digimon} />
                                    <ToRightProfileGroup digimon={babyStatus.digimon} key={getUUID()} />
                                </div>}
                        </div>
                    </div>}
            </div>
            { childResult && 
                <div className="modal active" id="baby-simulator-result-modal">
                    <div className="window">
                        <div className="baby-simulator-result">
                            <div className="title big">유년기 진화 결과</div>
                            <div className="child-evolution-info">
                                <div className="child-digimon">
                                    <img src={`/images/${childResult.digimon.name}.png`}/>
                                    <div className="child-digimon-shortcut">
                                        <div className="digimon-name">{childResult.digimon.name}</div>
                                        <img src={`/images/${childResult.digimon.digimonType}.png`}/>
                                    </div>
                                </div>
                                <Gauges gauges={childResult.adjustments} />
                            </div>
                            <div className="title">사용 아이템 수량</div>
                            <div className="spent-currencies">
                                <div className="foods">
                                    { logs.filter(log => log.type === "feed").map((food, index, array) => {
                                        if(index !== 0) {
                                            const hasBefore = array.slice(0, index).find(each => each.item!.name === food.item!.name);

                                            if(hasBefore) return "";
                                        }

                                        return <div className="spent-item">
                                            <img src={`/images/${food.item!.name}.png`} />
                                            <div className="spent-item-info">
                                                <div className="title">{food.item!.name}</div>
                                                <span>{array.filter(each => each.item!.name === food.item!.name).length}개</span>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <div className="toys">
                                    { logs.filter(log => log.type === "play").map((toy, index, array) => {
                                        if(index !== 0) {
                                            const hasBefore = array.slice(0, index).find(each => each.item!.name === toy.item!.name);

                                            if(hasBefore) return null;
                                        }

                                        return <div className="spent-item">
                                            <img src={`/images/${toy.item!.name}.png`} />
                                            <div className="spent-item-info">
                                                <div className="title">{toy.item!.name}</div>
                                                <span>{array.filter(each => each.item!.name === toy.item!.name).length}개</span>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="title">총 소요시간</div>
                            <div className="title">{ getPassedTimeString() } </div>
                            <button type="button" className="refresh" onClick={() => window.location.reload()}>다시하기</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}