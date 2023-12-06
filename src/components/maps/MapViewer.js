import React, { useMemo, useRef, useState } from "react";
import MonsterShortcut from "./MonsterShortcut";
import { getUUID } from "../../functions/commons";
import ObjectFilter from "./ObjectFilter";
import ShopModal from "./ShopModal";
import DropsModal from "./DropsModal";
import { getItemById } from "../../functions/getItemsFunctions";

export default function MapViewer({ map }) {
    const [showPortal, setShowPortal] = useState(true);
    const [showWarp, setShowWarp] = useState(true);
    const [showShop, setShowShop] = useState(true);
    const [itemCheckFlags, setItemCheckFlags] = useState([]);
    const [showCube, setShowCube] = useState(false);

    const [isOpenShop, setIsOpenShop] = useState(false);
    const [shopModalPosition, setShopModalPosition] = useState({ top: 0, y: 0 });
    const selectedShop = useRef(null);
    
    const [isOpenDrops, setIsOpenDrops] = useState(false);
    const [dropsModalPosition, setDropsModalPosition] = useState({ top: 0, y: 0 });
    const selectedDigimon = useRef(null);

    const captureMouse = (event) => {
        if(event.target?.tagName === "IMG") {
            const classList = event.target.classList;
            
            if(classList.contains("shop") && map.shops) {
                if(event.target.id === "common") selectedShop.current = map.shops[0];
                else selectedShop.current = map.shops[1];
                
                const mapRect = event.target.parentElement.getBoundingClientRect();
                if(event.pageY + 450 > window.innerHeight) {
                    setShopModalPosition({ top: 450 - mapRect.top + 10, left: event.pageX - mapRect.left + 2 });
                } else {
                    setShopModalPosition({ top: event.pageY - mapRect.top, left: event.pageX - mapRect.left + 2 });
                }
                setIsOpenShop(true);
                setIsOpenDrops(false);
            } else if(classList.contains("monster-image") && map.monsters) {
                const id = Number(event.target.dataset.id);
                const digimon = map.monsters.find(monster => monster.id === id);
                selectedDigimon.current = digimon;

                const mapRect = event.target.parentElement.parentElement.getBoundingClientRect();
                const modalHeight = 171 + (digimon.dropItems?.length || 0) * 28;
                
                // console.log(event.pageY, modalHeight, "  ", window.innerHeight)
                if(event.pageY + modalHeight >= window.innerHeight - 20) {
                    setDropsModalPosition({ top: event.pageY - modalHeight - mapRect.top, left: event.pageX - mapRect.left + 2 });
                } else {
                    setDropsModalPosition({ top: event.pageY - mapRect.top + 10, left: event.pageX - mapRect.left + 2 });
                }
                setIsOpenDrops(true);
                setIsOpenShop(false);
            } else {
                setIsOpenDrops(false);
                setIsOpenShop(false);
            }
        }
    }

    const getItems = () => {
        const temp = new Set();
        for(const monster of map.monsters) {
            monster.dropItems?.forEach(itemId => {
                const item = getItemById(itemId);
                
                // if(item.type === 3 || item.type === 4 || item.type === 5) {
                    temp.add(item);
                // }
            });
        }

        if(temp.values().length === 0) return null;

        const items = [ ...temp.values() ];
        items.sort((a, b) => {
            const typeSub = a.type - b.type;
            if(typeSub !== 0) return typeSub;

            return a.id - b.id;
        });

        const flags = new Array();
        items.forEach(item => flags.push(item.id));

        setItemCheckFlags(flags);

        return items;
    }

    const items = useMemo(() => getItems(), [map]);

    const hasCheckedItem = (monster) => {
        if(!monster.dropItems && (monster.name === "츄몬" || monster.name === "레어몬")) return true;

        for(let i = 0; i < monster.dropItems?.length; i++) {
            if(itemCheckFlags.includes(monster.dropItems[i]))
                return true;
        }
        return false;
    }

    if(!map) return (<div className="map-viewer"></div>);

    const portals = useMemo(() => {
        return map.portals && map.portals.map(portal => (
            <img src="/images/포탈.png" 
                className={`object portal ${showPortal ? "" : "hide"}`} 
                style={{ top: `${portal.point.y}px`, left: `${portal.point.x}px`}} 
                title={portal.description}
                key={getUUID()} />
        ));
    }, [showPortal, map]);
    const warps = useMemo(() => {
        return map.warps && map.warps.map(warp => (
            <img src="/images/워프 포인트.png" 
                 className={`object warp ${showWarp ? "" : "hide"}`} 
                 style={{ top: `${warp.point.y}px`, left: `${warp.point.x}px`}}
                 title={`${warp.description}\n워프 포인트`}
                 key={getUUID()} />
        ))
    }, [showWarp, map]);
    const shops = useMemo(() => {
        return map.shops && map.shops.map(shop => (
            <img src="/images/상점.png" 
                 className={`object shop ${showShop ? "" : "hide"}`} 
                 style={{ top: `${shop.point.y}px`, left: `${shop.point.x}px`}}
                 title={shop.type === "common" ? "소모품 상인" : "배틀아이템 상인"}
                 id={shop.type}
                 key={getUUID()} />
        ))
    }, [showShop, map]);
    const monsters = useMemo(() => {
        return map.monsters && map.monsters.map(monster => (
            <MonsterShortcut monster={monster} hasDropItem={hasCheckedItem} key={getUUID()} />
        ))
    }, [itemCheckFlags, map]);
    const cubes = useMemo(() => {
        return map.cubes && map.cubes.map(cube => (
            <img src="/images/데뀨.png" 
                 className={`object cube ${showCube ? "" : "hide"}`} 
                 style={{ top: `${cube.point.y}px`, left: `${cube.point.x}px`}}
                 title={`데뀨 #${cube.id}`}
                 key={getUUID()} />
        ))
    }, [showCube, map]);
    const shopModal = useMemo(() => <ShopModal isOpen={isOpenShop} items={selectedShop.current?.items} position={shopModalPosition} />, [isOpenShop, shopModalPosition]);
    const monsterModal = useMemo(() => <DropsModal isOpen={isOpenDrops} digimon={selectedDigimon.current} position={dropsModalPosition} />, [isOpenDrops, dropsModalPosition]);

    return (
        <div className="map-viewer">
            <div className="map-container" onMouseMove={captureMouse}>
                <img className="map" src={`/images/${map.name}.png`} />

                { monsters }
                { portals }
                { warps }
                { shops }
                { cubes }
            </div>
            <ObjectFilter portal={showPortal} setPortal={setShowPortal} 
                          warp={showWarp} setWarp={setShowWarp}
                          shop={showShop} setShop={setShowShop}
                          itemCheckFlags={itemCheckFlags} setItemCheckFlags={setItemCheckFlags} items={items}
                          cube={showCube} setCube={setShowCube} />

            { shopModal }
            { monsterModal }
        </div>
    );
}