import { Combination } from "../classes";
import data from "../json/combinations.json";

const origin = new Array();

const loadCombinations = () => {
    if(origin.length === 0) {
        data.forEach(each => {
            origin.push(new Combination(each));
        });
    }
}

const getCombinations = () => {
    loadCombinations();

    return origin;
}

export {
    getCombinations
}