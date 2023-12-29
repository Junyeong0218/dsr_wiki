import { Evolution } from "../classes/Evolution";

const toggleFoldBeforeEvolution = (evolution: Evolution, foldFlag: boolean): void => {
    if(!evolution.befores) return;

    evolution.befores.forEach(before => {
        before.isFold = foldFlag;

        toggleFoldBeforeEvolution(before.digimon!, foldFlag);
    });
}

const toggleFoldAfterEvolution = (evolution: Evolution, foldFlag: boolean): void => {
    if(!evolution.afters) return;

    evolution.afters.forEach(after => {
        after.isFold = foldFlag;

        toggleFoldAfterEvolution(after.digimon!, foldFlag);
    });
}

const toggleFoldEvolution = (evolution: Evolution|null, foldFlag: boolean): void => {
    if(!evolution) return;
    
    toggleFoldBeforeEvolution(evolution, foldFlag);
    toggleFoldAfterEvolution(evolution, foldFlag);
}

export default toggleFoldEvolution;