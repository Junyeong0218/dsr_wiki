"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combination = exports.CombinationIngredient = void 0;
class CombinationIngredient {
    constructor(raw) {
        this.itemId = raw.itemId;
        this.count = raw.count;
    }
}
exports.CombinationIngredient = CombinationIngredient;
class Combination {
    constructor(raw) {
        this.id = raw.id;
        this.resultItem = raw.resultItem;
        this.reqPro = raw.reqPro;
        this.reqBit = raw.reqBit;
        this.rate = raw.rate;
        this.bigRate = raw.bigRate;
        this.ingredients = raw.ingredients;
    }
}
exports.Combination = Combination;
