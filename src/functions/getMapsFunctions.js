import { Map, Monster } from "../classes";
import data from "../json/maps.json";

const origin = new Array();

const loadMaps = () => {
    if(origin.length === 0) {
        data.forEach(each => {
            const map = new Map(each);

            if(each.monsters) {
                map.monsters = new Array();
                each.monsters.forEach(m => {
                    map.monsters.push(new Monster(m));
                });
            }
            if(each.shop) {
                map.shop = new Array();
                each.shop.forEach(s => {
                    map.shop.push(s);
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