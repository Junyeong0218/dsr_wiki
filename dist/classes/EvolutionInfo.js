"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionInfo = void 0;
class EvolutionInfo {
    constructor(raw) {
        this.isFold = false;
        this.getRate = () => Math.round(this.rate * 1000000) / 10000;
        this.getBonding = () => Math.round(this.reqBonding * 1000000) / 10000;
        this.from = raw.from;
        this.to = raw.to;
        this.digimon = null;
        this.rate = raw.rate;
        this.ingredient = raw.ingredient;
        this.method = raw.method;
        this.reqLevel = raw.reqLevel;
        this.reqBonding = raw.reqBonding;
        this.reqStr = raw.reqStr;
        this.reqInt = raw.reqInt;
        this.reqSpd = raw.reqSpd;
        this.reqRes = raw.reqRes;
        this.reqDef = raw.reqDef;
        this.with = raw.with;
    }
}
exports.EvolutionInfo = EvolutionInfo;
