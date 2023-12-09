import { Grades } from "../enums";
import { getDigimonById } from "../functions";
import { getDigimonByName } from "../functions/getDigimonFunctions";
import Revolution from "./Revolution";

export default class Digimon {
    constructor(raw) {
        // int ( 1 ~ )
        this.id = raw.id;
        // string
        this.name = raw.name;
        // int ( 1 ~ 6 )
        this.grade = raw.grade;
        // string
        this.digimonType = raw.digimonType;

        // 아래 2개는 Revolution[]
        this.befores = raw.befores?.map(before => new Revolution(before)) || null;
        this.afters = raw.afters?.map(after => new Revolution(after)) || null;
    }

    getGradeText = () => Grades[this.grade];
    getBefore = (index) => getDigimonById(this.befores.at(index).from) ?? null;
    getAfter = (index) => getDigimonById(this.afters.at(index).to) ?? null;

    static getById = (id) => getDigimonById(id);
    static getByName = (name) => getDigimonByName(name);
}