import React, { useMemo, useRef, useState } from "react";
import MonsterShortcut from "./MonsterShortcut";
import { getUUID } from "../../functions/commons";
import ObjectFilter from "./ObjectFilter";
import ShopModal from "./ShopModal";
import DropsModal from "./DropsModal";
import { getItemById } from "../../functions/getItemsFunctions";
import { NoDropMonsters } from "../../enums";
import { getBlankFlags, makeAllInFlags } from "../../functions/getDropItemFilteringFlags";
import { Item, Map, Monster, Shop } from "../../classes";

type MapViewerProps = {
    map: Map
}

export default function MapViewer({ map }: MapViewerProps) {
    const [showPortal, setShowPortal] = useState(true);
    const [showWarp, setShowWarp] = useState(true);
    const [showShop, setShowShop] = useState(true);
    const [showCube, setShowCube] = useState(false);
    const [itemCheckFlags, setItemCheckFlags] = useState(getBlankFlags());

    const [isOpenShop, setIsOpenShop] = useState(false);
    const [shopModalPosition, setShopModalPosition] = useState({ top: 0, left: 0 });
    const selectedShop = useRef<Shop|null>(null);
    
    const [isOpenDrops, setIsOpenDrops] = useState(false);
    const [dropsModalPosition, setDropsModalPosition] = useState({ top: 0, left: 0 });
    const selectedDigimon = useRef<Monster|null>(null);

    const captureMouse = (event: React.MouseEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLImageElement;
        if(target?.tagName === "IMG") {
            const classList = target.classList;
            
            if(classList.contains("shop") && map.shops) {
                const shop = map.shops.find(s => s.point.x === Number(target.style.left.replace("px", "")) && s.point.y === Number(target.style.top.replace("px", "")))!;
                console.log(Number(target.style.left.replace("px", "")));
                console.log(Number(target.style.top.replace("px", "")));
                console.log(map.shops);
                console.log(shop);
                // if(target.id === "common") selectedShop.current = map.shops[0];
                // else selectedShop.current = map.shops[1];
                selectedShop.current = shop;
                
                const mapRect = target.parentElement!.getBoundingClientRect();
                if(event.pageY + 450 > window.innerHeight) {
                    setShopModalPosition({ top: 450 - mapRect.top + 10, left: event.pageX - mapRect.left + 2 });
                } else {
                    setShopModalPosition({ top: event.pageY - mapRect.top, left: event.pageX - mapRect.left + 2 });
                }
                setIsOpenShop(true);
                setIsOpenDrops(false);
            } else if(classList.contains("monster-image") && map.monsters) {
                const id = Number(target.dataset.id);
                const digimon = map.monsters.find(monster => monster.id === id)!;
                selectedDigimon.current = digimon;

                const mapRect = target.parentElement!.parentElement!.getBoundingClientRect();
                const modalHeight = 211 + (digimon.dropItems?.length || 0) * 28;
                
                // console.log(event.pageY, modalHeight, "  ", window.innerHeight)
                // console.log(event.pageY + modalHeight, "  ", window.innerHeight - 20)
                if(event.pageY + modalHeight >= window.innerHeight - 10) {
                    setDropsModalPosition({ top: window.innerHeight - modalHeight - mapRect.top - 10, left: event.pageX - mapRect.left + 2 });
                } else {
                    setDropsModalPosition({ top: event.pageY - mapRect.top - 10, left: event.pageX - mapRect.left + 2 });
                }
                setIsOpenDrops(true);
                setIsOpenShop(false);
            } else {
                setIsOpenDrops(false);
                setIsOpenShop(false);
            }
        }
    }

    const mouseLeaveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const relatedTarget = event.relatedTarget as HTMLDivElement;
        try {
            if(relatedTarget.classList.contains("modal") || relatedTarget.classList.contains("map-container")) return;

            setIsOpenDrops(false);
            setIsOpenShop(false);
        } catch (e) {
            setIsOpenDrops(false);
            setIsOpenShop(false);
        }
    }

    const getItems = () => {
        const temp = new Set<Item>();
        if(!map.monsters) return [];
        for(const monster of map.monsters) {
            monster.dropItems?.forEach(itemId => {
                const item = getItemById(itemId)!;
                
                // if(item.type === 3 || item.type === 4 || item.type === 5) {
                    temp.add(item);
                // }
            });
        }

        const items = [ ...temp.values() ];
        if(items.length === 0) return [];
        
        items.sort((a, b) => {
            const typeSub = a.type - b.type;
            if(typeSub !== 0) return typeSub;

            return a.id - b.id;
        });
        
        const flags = makeAllInFlags(items);
        // const flags = new Array();
        // items.forEach(item => flags.push(item.id));

        setItemCheckFlags(flags);

        return items;
    }

    const items = useMemo(() => getItems(), [map]);

    const hasCheckedItem = (monster: Monster): boolean => {
        if(!monster.dropItems && NoDropMonsters.includes(monster.name)) return true;

        for(let i = 0; i < monster.dropItems?.length; i++) {
            const keys = Object.keys(itemCheckFlags);
            for(let j = 0; j < keys.length; j++) {
                if(itemCheckFlags[`${keys[j]}`].includes(monster.dropItems[i]))
                    return true;
            }
            // if(itemCheckFlags.includes(monster.dropItems[i]))
            //     return true;
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
    const shopModal = useMemo(() => <ShopModal isOpen={isOpenShop} items={selectedShop.current?.items ?? []} position={shopModalPosition} />, [isOpenShop, shopModalPosition]);
    const monsterModal = useMemo(() => <DropsModal isOpen={isOpenDrops} monster={selectedDigimon.current} position={dropsModalPosition} />, [isOpenDrops, dropsModalPosition]);

    return (
        <div className="map-viewer">
            <div className="map-container" onMouseMove={captureMouse} onMouseLeave={mouseLeaveHandler}>
                <img className="map" src={`/images/${map.name === "???" ? "아포카리몬 맵" : map.name}.png`} />

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