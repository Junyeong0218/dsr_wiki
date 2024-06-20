import { Cube, Map, Monster, Portal, Shop, Warp } from "../classes";
import { ICube } from "../classes/Cube";
import { IMap } from "../classes/Map";
import { IMonster } from "../classes/Monster";
import { IPortal } from "../classes/Portal";
import { IShop } from "../classes/Shop";
import { IWarp } from "../classes/Warp";
import data from "../json/maps.json";

const origin = new Array<Map>();

const loadMaps = (): void => {
    if(origin.length === 0) {
        data.forEach((each: IMap) => {
            const map = new Map(each);

            if(each.portals) {
                map.portals = new Array();
                each.portals.forEach((p: IPortal) => {
                    map.portals!.push(new Portal(p));
                });
            }
            if(each.warps) {
                map.warps = new Array();
                each.warps.forEach((w: IWarp) => {
                    map.warps!.push(new Warp(w));
                });
            }
            if(each.shops) {
                map.shops = new Array();
                each.shops.forEach((s: IShop) => {
                    map.shops!.push(new Shop(s));
                });
            }
            if(each.monsters) {
                map.monsters = new Array();
                each.monsters.forEach((m: IMonster) => {
                    const monster = new Monster(m);
                    monster.mapId = map.id;
                    
                    map.monsters!.push(monster);
                });
            }
            if(each.cubes) {
                map.cubes = new Array();
                each.cubes.forEach((c: ICube) => {
                    map.cubes!.push(new Cube(c));
                });
            }

            origin.push(map);

            // if(map.id === 13) console.log(map)
        });
    }
}

const getMaps = (): Array<Map> => {
    loadMaps();

    return origin;
}

export {
    getMaps
}