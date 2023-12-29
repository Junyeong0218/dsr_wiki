"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toggleFoldBeforeEvolution = (evolution, foldFlag) => {
    if (!evolution.befores)
        return;
    evolution.befores.forEach(before => {
        before.isFold = foldFlag;
        toggleFoldBeforeEvolution(before.digimon, foldFlag);
    });
};
const toggleFoldAfterEvolution = (evolution, foldFlag) => {
    if (!evolution.afters)
        return;
    evolution.afters.forEach(after => {
        after.isFold = foldFlag;
        toggleFoldAfterEvolution(after.digimon, foldFlag);
    });
};
const toggleFoldEvolution = (evolution, foldFlag) => {
    if (!evolution)
        return;
    toggleFoldBeforeEvolution(evolution, foldFlag);
    toggleFoldAfterEvolution(evolution, foldFlag);
};
exports.default = toggleFoldEvolution;
