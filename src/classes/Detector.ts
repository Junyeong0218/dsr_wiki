import Point from "./Point";

export interface IStrategy {
    id: number;
    type: string;
    skillName: string | null;
    description: string;
    turn: number;
}

export interface IDetectorDropItem {
    itemId: number;
    canTrade: boolean;
    count: number;
    isAlways: boolean;
}

export interface IDetectorMonster {
    mapName: string;
    id: number;
    name: string;
    level: number;
    hp: number;
    count: number;
    relatedId: number | null;
    point: Point;
    strategies: Array<IStrategy>;
    dropItems: Array<IDetectorDropItem>;
}

export interface IDetector {
    name: string;
    monsters: Array<IDetectorMonster>
}

export class Strategy {
    id: number;
    type: string;
    skillName: string | null;
    description: string;
    turn: number;

    constructor(raw: IStrategy) {
        this.id = raw.id;
        this.type = raw.type;
        this.skillName = raw.skillName;
        let d = raw.description;
        while(d.includes("\r\n")) {
            d = d.replace("\r\n", "<br />");
        }
        this.description = d;
        this.turn = raw.turn;
    }
}

export class DetectorDropItem {
    itemId: number;
    canTrade: boolean;
    count: number;
    isAlways: boolean;

    constructor(raw: IDetectorDropItem) {
        this.itemId = raw.itemId;
        this.canTrade = raw.canTrade;
        this.count = raw.count;
        this.isAlways = raw.isAlways;
    }
}

export class DetectorMonster {
    mapName: string;
    id: number;
    name: string;
    level: number;
    hp: number;
    count: number;
    relatedId: number | null;
    point: Point;
    strategies: Array<IStrategy>;
    dropItems: Array<IDetectorDropItem>;

    constructor(raw: IDetectorMonster) {
        this.mapName = raw.mapName;
        this.id = raw.id;
        this.name = raw.name;
        this.level = raw.level;
        this.hp = raw.hp;
        this.count = raw.count;
        this.relatedId = raw.relatedId;
        this.point = new Point(raw.point.x, raw.point.y);
        this.strategies = [];
        for(let i = 0; i < raw.strategies.length; i++) {
            const s = raw.strategies[i];
            const strategy = new Strategy(s);
            this.strategies.push(strategy);
        }
        this.dropItems = [];
        for(let i = 0; i < raw.dropItems.length; i++) {
            const d = raw.dropItems[i];
            const dropItem = new DetectorDropItem(d);
            this.dropItems.push(dropItem);
        }
    }
}

export class Detector {
    name: string;
    monsters: Array<IDetectorMonster>;

    constructor(raw: IDetector) {
        this.name = raw.name;
        this.monsters = [];

        raw.monsters.forEach(m => {
            const monster = new DetectorMonster(m);

            this.monsters.push(monster);
        });
    }
}