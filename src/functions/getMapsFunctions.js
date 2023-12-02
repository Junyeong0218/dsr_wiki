import { Map, Monster } from "../classes";
import data from "../json/maps.json";

const origin = new Array();

const loadMaps = () => {
    if(origin.length === 0) {
        data.forEach(each => {
            const map = new Map(each);

            if(each.portals) {
                map.portals = new Array();
                each.portals.forEach(p => {
                    map.portals.push(p);
                });
            }
            if(each.warps) {
                map.warps = new Array();
                each.warps.forEach(w => {
                    map.warps.push(w);
                });
            }
            if(each.shops) {
                map.shops = new Array();
                each.shops.forEach(s => {
                    map.shops.push(s);
                });
            }
            if(each.monsters) {
                map.monsters = new Array();
                each.monsters.forEach(m => {
                    map.monsters.push(new Monster(m));
                });
            }
            if(each.cubes) {
                map.cubes = new Array();
                each.cubes.forEach(c => {
                    map.cubes.push(c);
                });
            }

            origin.push(map);
        });
    }
}

const getMaps = () => {
    loadMaps();

    return origin;
}

export {
    getMaps
}