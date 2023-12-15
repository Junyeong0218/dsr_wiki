export default class Skill {
    constructor(raw) {
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

    getPercentByIndex = (index) => {
        const percent = Math.floor(this.coefficients[index] * 10_000) * 100;
        return percent / 10_000;
    }
}