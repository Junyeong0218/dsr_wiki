import { Item } from "./Item";

export interface ICombinationIngredient {
    itemId: number,
    count: number;
}

export class CombinationIngredient {
    itemId: number;
    count: number;

    constructor(raw: ICombinationIngredient) {
        this.itemId = raw.itemId;
        this.count = raw.count;
    }
}

export interface ICombination {
    id: number,
    resultItem: Item,
    reqPro: number,
    reqBit: number,
    rate: number,
    bigRate: number,
    ingredients: Array<CombinationIngredient>
}

export class Combination {
    id: number;
    resultItem: Item;
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
