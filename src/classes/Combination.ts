import { IItem, Item } from "./Item";

export interface ICombinationIngredient {
    itemId: number,
    count: number;
    canTrade: string;
}

export class CombinationIngredient {
    itemId: number;
    count: number;
    canTrade: string;

    constructor(raw: ICombinationIngredient) {
        this.itemId = raw.itemId;
        this.count = raw.count;
        this.canTrade = raw.canTrade;
    }
}

export interface IResultItem {
    id: number;
    type: number;
    name: string;
    canTrade: boolean;
}

export class ResultItem {
    id: number;
    type: number;
    name: string;
    canTrade: boolean;

    constructor(raw: IResultItem) {
        this.id = raw.id;
        this.type = raw.type;
        this.name = raw.name;
        this.canTrade = raw.canTrade;
    }
}

export interface ICombination {
    id: number,
    resultItem: ResultItem,
    reqPro: number,
    reqBit: number,
    rate: number,
    bigRate: number,
    ingredients: Array<CombinationIngredient>
}

export class Combination {
    id: number;
    resultItem: ResultItem;
    reqPro: number;
    reqBit: number;
    rate: number;
    bigRate: any;
    ingredients: Array<CombinationIngredient>;

    // 조합 검색 결과 출력을 위한 프로퍼티
    totalDistance?: number;
    tag?: string;

    constructor(raw: ICombination) {
        this.id = raw.id;
        this.resultItem = raw.resultItem;
        this.reqPro = raw.reqPro;
        this.reqBit = raw.reqBit;
        this.rate = raw.rate;
        this.bigRate = raw.bigRate;
        this.ingredients = raw.ingredients;
    }
}
