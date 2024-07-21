import Point from "./Point";

export interface IMonster {
    id: number,
    name: string,
    digimonType: string,
    level: number,
    hp: number,
    def: number,
    isForceEncounter: boolean,
    forceEvolution: string | null,
    anotherName: string | null,
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
    isForceEncounter: boolean;
    forceEvolution: string | null;
    anotherName: string | null;
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
        this.isForceEncounter = raw.isForceEncounter;
        this.forceEvolution = raw.forceEvolution;
        this.anotherName = raw.anotherName;
        this.point = new Point(raw.point.x, raw.point.y);
        this.dropItems = raw.dropItems;
    }
}