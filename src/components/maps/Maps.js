import React, { useRef, useState } from "react";
import { getMaps } from "../../functions";
import MapSelector from "./mapSelector";
import MapViewer from "./MapViewer";
import { getItemById } from "../../functions/getItemsFunctions";
import { ItemType } from "../../enums";

export default function Maps() {
    const [maps, setMaps] = useState(getMaps());
    const [selectedMap, setSelectedMap] = useState(getMaps()[0]);

    const initLocalStorageFold = () => {
        Object.values(ItemType).forEach(value => {
            if(!localStorage.getItem(`${value}_isFold`))
                localStorage.setItem(`${value}_isFold`, true);
        })
    }

    const setMap = (id) => {
        const map = maps.find(map => map.id === id) || null;

        if(map) setSelectedMap(map);
    }

    initLocalStorageFold();

    return (
        <div className="main">
            <div className="maps">
                {/* 1. 맵 이름 선택 */}
                <MapSelector maps={maps} selectedMap={selectedMap} setSelectedMap={setMap} />

                {/* 2. 맵 표시 */}
                <MapViewer map={selectedMap} />
            </div>
        </div>
    );
}