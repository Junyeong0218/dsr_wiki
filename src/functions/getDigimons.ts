import { Digimon } from "../classes";
import { IDigimon } from "../classes/Digimon";
import data from "../json/digimons.json";

const origin: Array<Digimon> = new Array();

const loadDigimons = (): void => {
    if(origin.length === 0) {
        data.forEach((value: IDigimon) => {
            origin.push(new Digimon(value));
        });
    }
}

const deepCopyAll = (includeMutation: boolean): Array<Digimon> => {
    loadDigimons();

    const all = new Array();
    for (const each of origin) {
        if(includeMutation || !each.name.includes("[돌연변이]"))
            // all.push(deepCopyDigimon(each));
            all.push(new Digimon(each));
    }

    return all;
};

const getDigimonById = (id: number): Digimon|null => {
    loadDigimons();

    const digimon = origin.find(each => each.id === id) ?? null;

    if(!digimon) return digimon;

    return new Digimon(digimon);
}

const getDigimonByName = (name: string): Digimon|null => {
    loadDigimons();

    const digimon = origin.find(each => each.name === name) ?? null;

    if(!digimon) return digimon;

    return new Digimon(digimon);
}

const getAllDigimons = (includeMutation: boolean): Array<Digimon> => deepCopyAll(includeMutation);

export {
    getAllDigimons,
    getDigimonById,
    getDigimonByName
}