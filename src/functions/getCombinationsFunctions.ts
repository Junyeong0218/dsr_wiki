import { Combination, ICombination } from "../classes/Combination";
import data from "../json/combinations.json";

const origin = new Array<Combination>();

const loadCombinations = (): void => {
    if(origin.length === 0) {
        data.forEach((each: ICombination) => {
            origin.push(new Combination(each));
        });
    }
}

const getCombinations = (): Array<Combination> => {
    loadCombinations();

    return origin;
}

export {
    getCombinations
}