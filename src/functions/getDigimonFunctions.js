import data from "../json/data.json";
import Digimon from "../classes/Digimon";

const origin = new Array();

const loadDigimons = () => {
    if(origin.length === 0) {
        data.forEach(each => {
            origin.push(new Digimon(each));
        });
    }
}

const deepCopyAll = (includeMutation) => {
    loadDigimons();

    const all = new Array();
    for (const each of origin) {
        if(includeMutation || !each.name.includes("[돌연변이]"))
            // all.push(deepCopyDigimon(each));
            all.push(Object.assign({}, each));
    }

    return all;
};

const getDigimonById = (id) => {
    loadDigimons();

    const digimon = origin.find(each => each.id === id);

    return new Digimon(digimon);
}

const getDigimonByName = (name) => {
    loadDigimons();

    const digimon = origin.find(each => each.name === name);

    return new Digimon(digimon);
}

const getAllDigimons = (includeMutation) => deepCopyAll(includeMutation);

export {
    getAllDigimons,
    getDigimonById,
    getDigimonByName
}