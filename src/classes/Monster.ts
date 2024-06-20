import Point from "./Point";

export interface IMonster {
    id: number,
    name: string,
    digimonType: string,
    level: number,
    hp: number,
    def: number,
    point: { x: number, y: number },
    dropItems: Array<number>
}

export class Monster {
    id: number;
    name: string;
    digimonType: string;
    level: number;
    hp: number;
    def: number;
    point: Point;
    dropItems: Array<number>;

    mapId: number = 0;

    constructor(raw: IMonster) {
        this.id = raw.id;
        this.name = raw.name;
        this.digimonType = raw.digimonType;
        this.level = raw.level;
        this.hp = raw.hp;
        this.def = raw.def;
        this.point = new Point(raw.point.x, raw.point.y);
        this.dropItems = raw.dropItems;
    }
}