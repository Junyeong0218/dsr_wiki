import { getDigimonByName } from "../functions/getDigimons";
import Skill from "./Skill";

export default class Digimon {
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
            this.skills.push(new Skill(rawSkill));
        });
    }

    static getByName = (name) => getDigimonByName(name);
}