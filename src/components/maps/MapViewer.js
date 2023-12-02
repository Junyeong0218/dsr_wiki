import React, { useState } from "react";
import MonsterShortcut from "./MonsterShortcut";
import { getUUID } from "../../functions/commons";
import ObjectFilter from "./ObjectFilter";

export default function MapViewer({ map }) {
    const [showPortal, setShowPortal] = useState(true);
    const [showWarp, setShowWarp] = useState(true);
    const [showShop, setShowShop] = useState(true);
    const [showMonster, setShowMonster] = useState(true);
    const [showCube, setShowCube] = useState(false);

    if(!map) return (<div className="map-viewer"></div>);

    return (
        <div className="map-viewer">
            <div className="map-container">
                <img className="map" src={`/images/${map.name}.png`} />

                { map.portals && map.portals.map(portal => (
                    <img src="/images/포탈.png" 
                        className={`object portal ${showPortal ? "" : "hide"}`} 
                        style={{ top: `${portal.point.y}px`, left: `${portal.point.x}px`}} 
                        title={portal.description}
                        key={getUUID()} />
                )) }
                { map.warps && map.warps.map(warp => (
                    <img src="/images/워프 포인트.png" 
                         className={`object warp ${showWarp ? "" : "hide"}`} 
                         style={{ top: `${warp.point.y}px`, left: `${warp.point.x}px`}}
                         title={warp.description}
                         key={getUUID()} />
                )) }
                { map.shops && map.shops.map(shop => (
                    <img src="/images/상점.png" 
                         className={`object shop ${showShop ? "" : "hide"}`} 
                         style={{ top: `${shop.point.y}px`, left: `${shop.point.x}px`}}
                         title={shop.type === "common" ? "소모품 상인" : "배틀아이템 상인"}
                         key={getUUID()} />
                )) }
                { map.monsters && map.monsters.map(monster => (
                    <MonsterShortcut monster={monster} showMonster={showMonster} key={getUUID()} />
                )) }
                { map.cubes && map.cubes.map(cube => (
                    <img src="/images/데뀨.png" 
                         className={`object cube ${showCube ? "" : "hide"}`} 
                         style={{ top: `${cube.point.y}px`, left: `${cube.point.x}px`}}
                         key={getUUID()} />
                )) }
            </div>
            <ObjectFilter portal={showPortal} setPortal={setShowPortal} 
                          warp={showWarp} setWarp={setShowWarp}
                          shop={showShop} setShop={setShowShop}
                          monster={showMonster} setMonster={setShowMonster}
                          cube={showCube} setCube={setShowCube} />
        </div>
    );
}