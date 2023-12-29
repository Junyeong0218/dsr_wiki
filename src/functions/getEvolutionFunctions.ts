import { Evolution } from "../classes";
import { IEvolution } from "../classes/Evolution";
import data from "../json/evolutions.json";

const origin = new Array<Evolution>();

const loadEvolutions = (): void => {
    if(origin.length === 0) {
        data.forEach((each: IEvolution) => {
            origin.push(new Evolution(each));
        });
    }
}

const deepCopyAll = (includeMutation: boolean): Array<Evolution> => {
    loadEvolutions();

    const all = new Array();
    for (const each of origin) {
        if(includeMutation || !each.name.includes("[돌연변이]"))
            // all.push(deepCopyDigimon(each));
            all.push(new Evolution(each));
    }

    return all;
};

const getEvolutionById = (id: number): Evolution|null => {
    loadEvolutions();

    const evolution = origin.find(each => each.id === id) ?? null;

    if(!evolution) return evolution;

    return new Evolution(evolution);
}

const getEvolutionByName = (name: string): Evolution|null => {
    loadEvolutions();

    const evolution = origin.find(each => each.name === name) ?? null;

    if(!evolution) return evolution;

    return new Evolution(evolution);
}

const getAllEvolutions = (includeMutation: boolean): Array<Evolution> => deepCopyAll(includeMutation);

export {
    getAllEvolutions,
    getEvolutionById,
    getEvolutionByName
}