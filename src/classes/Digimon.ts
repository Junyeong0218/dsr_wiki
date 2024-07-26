import { getDigimonByName } from "../functions/getDigimons";
import { Skill } from "./Skill";

export interface IDigimon {
    id: number,
    name: string,
    grade: number,
    digimonType: string,
    statLevel: number,
    hp: number,
    sp: number,
    str: number,
    int: number,
    spd: number,
    def: number,
    res: number,
    strength: string | null,
    strengthEffect: string | null,
    weakness: string | null,
    weaknessEffect: string | null,
    fieldTypes: Array<string>,
    skills: Array<any>
}

export class Digimon {
    [key: string]: any;
    id: number;
    name: string;
    grade: number;
    digimonType: string;
    statLevel: number;
    hp: number;
    sp: number;
    str: number;
    int: number;
    spd: number;
    def: number;
    res: number;
    strength: string | null;
    strengthEffect: string | null;
    weakness: string | null;
    weaknessEffect: string | null;
    fieldTypes: Array<string>;
    skills: Array<Skill>;

    totalDistance?: number;
    tag?: string;

    constructor(raw: IDigimon) {
        this.id = raw.id;
        this.name = raw.name;
        this.grade = raw.grade;
        this.digimonType = raw.digimonType;
        this.statLevel = raw.statLevel;
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

    static getByName = (name: string): Digimon|null => getDigimonByName(name);
}