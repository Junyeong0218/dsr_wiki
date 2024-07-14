import { Cube } from "./Cube";
import { Monster } from "./Monster";
import { Portal } from "./Portal";
import { Shop } from "./Shop";
import { Warp } from "./Warp";

export interface IMap {
    id: number,
    name: string,
    category: string,
    disable: boolean,
    portals: Array<any> | null,
    warps: Array<any> | null,
    shops: Array<any> | null,
    monsters: Array<any> | null,
    cubes: Array<any> | null;
}

export class Map {
    id: number;
    name: string;
    category: string;
    disable: boolean;
    portals: Array<Portal> | null;
    warps: Array<Warp> | null;
    shops: Array<Shop> | null;
    monsters: Array<Monster> | null;
    cubes: Array<Cube> | null;

    constructor(raw: IMap) {
        this.id = raw.id;
        this.name = raw.name;
        this.category = raw.category;
        this.disable = raw.disable;
        this.portals = null;
        this.warps = null;
        this.shops = null;
        this.monsters = null;
        this.cubes = null;
    }
}