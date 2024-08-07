import { Evolution } from "./Evolution";

export interface IEvolutionInfo {
    from: number,
    to: number,
    rate: number,
    ingredient: string | null,
    method: string,
    reqLevel: number,
    reqBonding: number,
    reqStr: number,
    reqInt: number,
    reqSpd: number,
    reqRes: number,
    reqDef: number,
    with: number | null;
}

export class EvolutionInfo {
    [key: string]: any
    
    from: number;
    to: number;
    digimon: Evolution | null;
    isFold: boolean = false;
    rate: number;
    ingredient: string | null;
    method: string;
    reqLevel: number;
    reqBonding: number;
    reqStr: number;
    reqInt: number;
    reqSpd: number;
    reqRes: number;
    reqDef: number;
    with: number | null;

    constructor(raw: IEvolutionInfo) {
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

    getRate = (): number => Math.round(this.rate * 1_000_000) / 10_000;
    getBonding = () => Math.round(this.reqBonding * 1_000_000) / 10_000;
}