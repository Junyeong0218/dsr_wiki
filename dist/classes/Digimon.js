"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Digimon = void 0;
const getDigimons_1 = require("../functions/getDigimons");
const Skill_1 = require("./Skill");
class Digimon {
    constructor(raw) {
        this.id = raw.id;
        this.name = raw.name;
        this.grade = raw.grade;
        this.digimonType = raw.digimonType;
        this.hp = raw.hp;
        this.sp = raw.sp;
        this.str = raw.str;
        this.int = raw.int;
        this.spd = raw.spd;
        this.def = raw.def;
        this.res = raw.res;
        this.strength = raw.strength;
        this.strengthEffect = raw.strengthEffect;
        this.weakness = raw.weakness;
        this.weaknessEffect = raw.weaknessEffect;
        this.fieldTypes = raw.fieldTypes;
        this.skills = [];
        raw.skills.forEach(rawSkill => {
            this.skills.push(new Skill_1.Skill(rawSkill));
        });
    }
}
exports.Digimon = Digimon;
Digimon.getByName = (name) => (0, getDigimons_1.getDigimonByName)(name);
