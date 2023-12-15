import data from "../json/evolutions.json";
import Evolution from "../classes/Evolution";

const origin = new Array();

const loadEvolutions = () => {
    if(origin.length === 0) {
        data.forEach(each => {
            origin.push(new Evolution(each));
        });
    }
}

const deepCopyAll = (includeMutation) => {
    loadEvolutions();

    const all = new Array();
    for (const each of origin) {
        if(includeMutation || !each.name.includes("[돌연변이]"))
            // all.push(deepCopyDigimon(each));
            all.push(Object.assign({}, each));
    }

    return all;
};

const getEvolutionById = (id) => {
    loadEvolutions();

    const digimon = origin.find(each => each.id === id);

    return new Evolution(digimon);
}

const getEvolutionByName = (name) => {
    loadEvolutions();

    const digimon = origin.find(each => each.name === name);

    return new Evolution(digimon);
}

const getAllEvolutions = (includeMutation) => deepCopyAll(includeMutation);

export {
    getAllEvolutions,
    getEvolutionById,
    getEvolutionByName
}