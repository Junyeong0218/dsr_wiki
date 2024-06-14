import React from "react";
import { Overflow } from "../../classes/Overflow";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import { getWeekdayText, isToday } from "../../functions/WeekdayFunctions";

type OverflowShortcutProps = { selected: Overflow }

export default function OverflowShortcut({ selected }: OverflowShortcutProps): React.ReactElement {
    console.log(selected)
    return (
        <div className="overflow-shortcut">
            <div className="map-viewer-small">
                <img src={`/images/${selected.mapName === "???" ? "아포카리몬 맵" : selected.mapName}.png`} />
                <img src="/images/오버플로우 던전.png" className="point" style={{top: `${selected.point.y}px`, left: `${selected.point.x}px`}}/>
            </div>
            <div className="overflow-shortcut-infos">
                <span className="title">{selected.mapName} 오버플로우 던전 정보</span>
                <span className="semi-title">
                    <img src="/images/overflow semi title icon.png" />
                    필요 아이템
                </span>
                <div className="overflow-req-item">
                    <img src={`/images/${encodeURIComponent(getNameExceptColon(selected.reqItem.name))}.png`} />
                    <span>{selected.reqItem.name}</span>
                </div>
                <span className="semi-title">
                    <img src="/images/overflow semi title icon.png" />
                    플레이 가능 요일
                </span>
                <div className="weekdays">
                    { selected.weekdays.map(weekday => {
                        const weekdayText = getWeekdayText(weekday);
                        const todayFlag = isToday(weekday);

                        return <div className={`weekday ${todayFlag ? "today" : ""}`} key={getUUID()}>
                                    <span className={todayFlag ? "today" : ""}>{weekdayText}</span>
                                    { todayFlag ? <img src="/images/green dot.png" /> : ""}
                                </div>
                    })}
                </div>
            </div>
        </div>
    );
}