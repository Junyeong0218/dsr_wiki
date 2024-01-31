import { Grades } from "../enums";
import { getEvolutionById, getEvolutionByName } from "../functions";
import { EvolutionInfo, IEvolutionInfo } from "./EvolutionInfo";

export interface IEvolution {
    id: number,
    name: string,
    grade: number,
    digimonType: string,
    befores: Array<IEvolutionInfo> | null
    afters: Array<IEvolutionInfo> | null
}

export class Evolution {
    id: number;
    name: string;
    grade: number;
    digimonType: string;
    befores: Array<EvolutionInfo> | null;
    afters: Array<EvolutionInfo> | null;

    totalDistance?: number;
    tag?: string;
    
    constructor(raw: IEvolution) {
        this.id = raw.id;
        this.name = raw.name;
        this.grade = raw.grade;
        this.digimonType = raw.digimonType;

        this.befores = raw.befores?.map(before => new EvolutionInfo(before)) || null;
        this.afters = raw.afters?.map(after => new EvolutionInfo(after)) || null;
    }

    getGradeText = (): string => Grades[this.grade];
    getBefore = (index: number) => getEvolutionById(this.befores!.at(index)!.from) ?? null;
    getAfter = (index: number) => getEvolutionById(this.afters!.at(index)!.to) ?? null;

    static getById = (id: number) => getEvolutionById(id);
    static getByName = (name: string) => getEvolutionByName(name);
}