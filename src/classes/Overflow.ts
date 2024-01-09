import { getItems } from "../functions/getItemsFunctions";
import { Item } from "./Item";
import { Monster } from "./Monster";
import Point from "./Point";

interface IRewordItem {
    itemId: number,
    count: number
}

export class RewordItem {
    item: Item;
    count: number;

    constructor(item: Item, count: number) {
        this.item = item;
        this.count = count;
    }
}

export interface IStage {
    stage: number,
    monsters: Array<Monster>,
    firstRewords: Array<IRewordItem>,
    repeatRewords: Array<IRewordItem>
}

export class Stage {
    id: number;
    monsters: Array<Monster>;
    firstRewords: Array<RewordItem>;
    repeatRewords: Array<RewordItem>;

    constructor(raw: IStage, items: Array<Item>) {
        this.id = raw.stage;
        this.monsters = raw.monsters;
        this.firstRewords = raw.firstRewords.map(reword => {
            const item = items.find(item => item.id === reword.itemId);
            return new RewordItem(item!, reword.count);
        });
        this.repeatRewords = raw.repeatRewords.map(reword => {
            const item = items.find(item => item.id === reword.itemId);
            return new RewordItem(item!, reword.count);
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