import { getItems } from "../functions/getItemsFunctions";
import { Item } from "./Item";
import { Monster } from "./Monster";
import Point from "./Point";

interface IRewordItem {
    itemId: number,
    count: number,
    canTrade: boolean
}

export class RewordItem {
    item: Item;
    count: number;
    canTrade: boolean;

    constructor(item: Item, count: number, canTrade: boolean) {
        this.item = item;
        this.count = count;
        this.canTrade = canTrade;
    }
}

export interface IStageMontser {
    name: string;
    digimonType: string;
    level: number;
    hp: number;
}

export interface IStage {
    stage: number,
    monsters: Array<IStageMontser>,
    firstRewards: Array<IRewordItem>,
    repeatRewards: Array<IRewordItem>
}

export class Stage {
    id: number;
    monsters: Array<IStageMontser>;
    firstRewards: Array<RewordItem>;
    repeatRewards: Array<RewordItem>;

    constructor(raw: IStage, items: Array<Item>) {
        this.id = raw.stage;
        this.monsters = raw.monsters;
        this.firstRewards = raw.firstRewards.map(reword => {
            const item = items.find(item => item.id === reword.itemId);
            return new RewordItem(item!, reword.count, reword.canTrade);
        });
        this.repeatRewards = raw.repeatRewards.map(reword => {
            const item = items.find(item => item.id === reword.itemId);
            return new RewordItem(item!, reword.count, reword.canTrade);
        });
    }
}

export interface IOverflow {
    mapName: string,
    reqItem: Item,
    weekdays: Array<number>,
    point: Point,
    stages: Array<any>
}

export class Overflow {
    mapName: string;
    reqItem: Item;
    weekdays: Array<number>;
    point: Point;
    stages: Array<Stage>;

    constructor(raw: IOverflow) {
        this.mapName = raw.mapName;
        this.reqItem = raw.reqItem;
        this.weekdays = raw.weekdays;
        this.point = new Point(raw.point.x, raw.point.y);
        this.stages = [];
    }

    addStage = (stage: Stage) => this.stages.push(stage);
}