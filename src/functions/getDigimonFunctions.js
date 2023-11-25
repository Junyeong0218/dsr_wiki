import data from "../json/a.json";
import Digimon from "../classes/Digimon";
import Revolution from "../components/revolution";

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

const getOne = (id) => {
    loadDigimons();

    const digimon = origin.at(id - 1);

    return new Digimon(digimon);
}

const getAllDigimons = (includeMutation) => deepCopyAll(includeMutation);
const getDigimonById = (id) => getOne(id);

export {
    getAllDigimons,
    getDigimonById
}