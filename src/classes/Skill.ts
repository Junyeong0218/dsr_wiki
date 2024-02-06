export interface ISkill {
    name: string,
    attackCount: number,
    range: string,
    element: string,
    target: string,
    targetCount: string,
    effect: string | null,
    additionalTurn: number | null,
    coefficients: Array<number>
}

export class Skill {
    name: string;
    attackCount: number;
    range: string;
    element: string;
    target: string;
    targetCount: string;
    effect: string | null;
    additionalTurn: number | null;
    coefficients: Array<number>;

    constructor(raw: ISkill) {
        this.name = raw.name;
        this.attackCount = raw.attackCount;
        this.range = raw.range;
        this.element = raw.element;
        this.target = raw.target;
        this.targetCount = raw.targetCount;
        this.effect = raw.effect;
        this.additionalTurn = raw.additionalTurn;
        this.coefficients = raw.coefficients;
    }

    getPercentByIndex = (index: number): number => {
        const percent = Math.floor(this.coefficients[index] * 10_000) * 100;
        return percent / 10_000;
    }
}