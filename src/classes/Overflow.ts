import { Item } from "./Item";
import { Monster } from "./Monster";

export interface IStage {
    id: number,
    monsters: Array<Monster>,
    firstRewords: Array<number>,
    repeatRewords: Array<number>
}

export class Stage {
    id: number;
    monsters: Array<Monster>;
    firstRewords: Array<number>;
    repeatRewords: Array<number>;

    constructor(raw: IStage) {
        this.id = raw.id;
        this.monsters = raw.monsters;
        this.firstRewords = raw.firstRewords;
        this.repeatRewords = raw.repeatRewords;
    }
}

export interface IOverflow {
    mapName: string,
    reqItem: Item,
    playableWeekdays: Array<string>,
    stages: Array<Stage>
}

export class Overflow {
    mapName: string;
    reqItem: Item;
    playableWeekdays: Array<string>;
    stages: Array<Stage>;

    constructor(raw: IOverflow) {
        this.mapName = raw.mapName;
        this.reqItem = raw.reqItem;
        this.playableWeekdays = raw.playableWeekdays;
        this.stages = raw.stages;
    }
}