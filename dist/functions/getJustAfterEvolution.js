"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const getJustAfterEvolution = (evolution) => {
    if (evolution.afters === null)
        return;
    evolution.afters.forEach(after => {
        const target = classes_1.Evolution.getById(after.to);
        if (target) {
            target.afters = null;
            after.digimon = target;
        }
    });
};
exports.default = getJustAfterEvolution;
