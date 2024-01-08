import React, { useState } from "react";
import { getAllOverflows } from "../../functions";
import { getWeekdayText, isToday } from "../../functions/WeekdayFunctions";
import { getNameExceptColon } from "../../functions/commons";
import { Digimon } from "../../classes";

export default function Overflows(): React.ReactElement {
    const all = getAllOverflows();

    const [selected, setSelected] = useState(all[0]);

    return (
        <div className="main">
            <div className="overflow-container">
                {/* map names - default value = gear savana */}
                <div className="map-selector">
                    { all.map(each => (
                        <button type="button" className={`map-name-button ${selected.mapName === each.mapName ? "selected" : ""}`} onClick={() => setSelected(each)}>{each.mapName}</button>
                    ))
                    }
                </div>
                
                {/* map shortcut - point dungeon of this map */}
                {/* reqItme and playable weekdays */}
                <div className="overflow-shortcut">
                    <div className="map-viewer-small">
                        <img src={`/images/${selected.mapName}.png`} />
                    </div>
                    <div className="overflow-shortcut-infos">
                        <div className="overflow-req-item">
                            <img src={`/images/${encodeURIComponent(getNameExceptColon(selected.reqItem.name))}.png`} />
                            <span>{selected.reqItem.name}</span>
                        </div>
                        <div className="weekdays">
                            { selected.weekdays.map(weekday => {
                                const weekdayText = getWeekdayText(weekday);
                                const todayFlag = isToday(weekday);

                                return <div className={`weekday ${todayFlag ? "today" : ""}`}>
                                    <span className={todayFlag ? "today" : ""}>{weekdayText}</span>
                                    { todayFlag ? <img src="/images/green dot.png" /> : ""}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                
                {/* stage infos - col / 1 card 1 row column list */}
                {/* each stage - row */}
                {/* monsters - col / monsterImage shorcut + name + type + level + hp + str&week */}
                {/* first rewords - col / itemImage shortcut + name + canTrade + count */}
                {/* repeat rewords - col / itemImage shortcut + name + canTrade + count */}
                <div className="stages">
                { selected.stages.map(stage => (
                    <div className="stage">
                        <div className="monsters">
                            <span>stage {stage.id}</span>
                            { stage.monsters.map(monster => {
                                const digimon = Digimon.getByName(monster.name)!;

                                return <div className="monster">
                                    <img src={`/images/${monster.name}.png`} />
                                    <img src={`/images/${monster.digimonType}.png`} />
                                    {/* <span>{monster.name}</span>
                                    <span>Lv.{monster.level}</span>
                                    <span>hp : {monster.hp}</span>
                                    <div>
                                        <img src={`/images/${digimon.strength} 강점.png`} />
                                        <img src={`/images/${digimon.weakness} 약점.png`} />
                                    </div> */}
                                </div>
                            })}
                        </div>
                        <div className="rewords">
                            <div className="first-rewords">
                                <span className="title">첫 클리어</span>
                                { stage.firstRewords.map(reword => (
                                    <div className="reword">
                                        <img src={`/images/${encodeURIComponent(getNameExceptColon(reword.item.name))}.png`} />
                                        <div className="reword-info">
                                            <span>{reword.item.name}</span>
                                            <span className={reword.item.canTrade ? "green" : "red"}>{reword.item.canTrade ? "거래가능" : "거래불가"}</span>
                                            <span>{reword.count}ea</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="repeat-rewords">
                                <span className="title">반복</span>
                                { stage.repeatRewords.map(reword => (
                                    <div className="reword">
                                        <img src={`/images/${encodeURIComponent(getNameExceptColon(reword.item.name))}.png`} />
                                        <div className="reword-info">
                                            <span>{reword.item.name}</span>
                                            <span className={reword.item.canTrade ? "green" : "red"}>{reword.item.canTrade ? "거래가능" : "거래불가"}</span>
                                            <span>{reword.count}ea</span>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {/* monster description modal without drop table */}
                {/* recycle maps drops modal with strength and weakness */}
            </div>
        </div>
    );
}