import { IOverflow, IStage, Overflow, Stage } from "../classes/Overflow";
import data from "../json/overflows.json";
import { getItems } from "./getItemsFunctions";

const origin = new Array<Overflow>();

const loadOverflows = (): void => {
    const items = getItems();
    if(origin.length === 0) {
        data.forEach((each: IOverflow) => {
            const overflow = new Overflow(each);
            origin.push(overflow);

            each.stages.forEach((es: IStage) => {
                const stage = new Stage(es, items);

                overflow.addStage(stage);
            });
        });
    }
}

const deepCopyAll = (): Array<Overflow> => {
    loadOverflows();

    const all = new Array();
    for (const each of origin) {
        const overflow = new Overflow(each);
        all.push(overflow);

        each.stages.forEach((s: Stage) => {
            overflow.addStage(Object.assign({}, s));
        });
    }

    return all;
};

// const getEvolutionById = (id: number): Evolution|null => {
//     loadEvolutions();

//     const evolution = origin.find(each => each.id === id) ?? null;

//     if(!evolution) return evolution;

//     return new Evolution(evolution);
// }

// const getEvolutionByName = (name: string): Evolution|null => {
//     loadEvolutions();

//     const evolution = origin.find(each => each.name === name) ?? null;

//     if(!evolution) return evolution;

//     return new Evolution(evolution);
// }

const getAllOverflows = (): Array<Overflow> => deepCopyAll();

export {
    getAllOverflows,
    // getEvolutionById,
    // getEvolutionByName
}