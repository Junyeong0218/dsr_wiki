import React, { useRef, useState } from "react";
import { getMaps } from "../../functions";
import MapSelector from "./mapSelector";
import MapViewer from "./MapViewer";
import { getItemById } from "../../functions/getItemsFunctions";
import { ItemType } from "../../enums";

export default function Maps() {
    const [maps, setMaps] = useState(getMaps());
    const [selectedMap, setSelectedMap] = useState(null);

    const setMap = (id) => {
        const map = maps.find(map => map.id === id) || null;

        if(map) setSelectedMap(map);
    }
    // 3. 데이터 필터링 및 관련정보 오버레이
    // 몹 데이터 (이름, 레벨, 속성, 드랍 아이템)
    // 포탈 (name, point-x,y)
    // 워프 포인트 (from, to, name, point-x,y)
    // npc 데이터 (name, point)

    // 4. 
    return (
        <div className="main">
            <div className="maps">
                {/* 1. 맵 이름 선택 */}
                <MapSelector maps={maps} selectedMap={selectedMap} setSelectedMap={setMap} />

                {/* 2. 맵 표시 */}
                <MapViewer map={selectedMap} />

                {/* temp 맵 정보 */}
                {/* { selectedMap &&
                    <div className="temp">
                        <span>{selectedMap.name}</span>
                        { selectedMap.monsters.map(monster => (
                            <div className="monster">
                                <img src={`/images/${monster.name}.png`} />
                                <span>{monster.level}</span>
                                <span>{monster.name}</span>
                                <span>{monster.type}</span>
                                <span>{monster.hp}</span>
                                { monster.dropItems &&
                                    monster.dropItems.map(itemId => {
                                        const item = getItemById(itemId);
                                        console.log(monster.dropItems);
                                        console.log(itemId);
                                        console.log(item);
                                        return (
                                            <div className="drop">
                                                <img src={`/images/${item.name}.png`} />
                                                <span>{item.name}</span>
                                                <span>{ItemType[item.type]}</span>
                                                <span>{item.price}</span>
                                                <span>{item.canTrade ? "거래가능" : "거래불가"}</span>
                                            </div>
                                        );
                                    })
                                }
                                <span>{`x: ${monster.point.x} / y: ${monster.point.y}`}</span>
                            </div>
                        )) }
                    </div>
                } */}
            </div>
        </div>
    );
}