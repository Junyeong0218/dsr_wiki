"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = void 0;
class Skill {
    constructor(raw) {
        this.getPercentByIndex = (index) => {
            const percent = Math.floor(this.coefficients[index] * 10000) * 100;
            return percent / 10000;
        };
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
}
exports.Skill = Skill;
