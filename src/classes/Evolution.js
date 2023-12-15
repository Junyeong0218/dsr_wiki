import { Grades } from "../enums";
import { getEvolutionById, getEvolutionByName } from "../functions";
import EvolutionInfo from "./EvolutionInfo";

export default class Evolution {
    constructor(raw) {
        // int ( 1 ~ )
        this.id = raw.id;
        // string
        this.name = raw.name;
        // int ( 1 ~ 6 )
        this.grade = raw.grade;
        // string
        this.digimonType = raw.digimonType;

        // 아래 2개는 EvolutionInfo[]
        this.befores = raw.befores?.map(before => new EvolutionInfo(before)) || null;
        this.afters = raw.afters?.map(after => new EvolutionInfo(after)) || null;
    }

    getGradeText = () => Grades[this.grade];
    getBefore = (index) => getEvolutionById(this.befores.at(index).from) ?? null;
    getAfter = (index) => getEvolutionById(this.afters.at(index).to) ?? null;

    static getById = (id) => getEvolutionById(id);
    static getByName = (name) => getEvolutionByName(name);
}