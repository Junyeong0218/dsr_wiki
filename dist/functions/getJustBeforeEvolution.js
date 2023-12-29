"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const getJustBeforeEvolution = (evolution) => {
    if (evolution.befores === null)
        return;
    evolution.befores.forEach(before => {
        const target = classes_1.Evolution.getById(before.from);
        if (target) {
            target.befores = null;
            before.digimon = target;
        }
    });
};
exports.default = getJustBeforeEvolution;
