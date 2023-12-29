"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const commons_1 = require("./commons");
const temp = new Array();
let standard = null;
const getDownEvolutions = (evolution, isFold = false) => {
    if (evolution.befores === null)
        return;
    evolution.befores.forEach(before => {
        const target = classes_1.Evolution.getById(before.from);
        // if(temp.includes(target.id)) {
        //   before['duplicated'] = true;
        //   target.befores = null;
        // } else {
        //   temp.push(target.id);
        // }
        before.isFold = isFold;
        before.digimon = target;
        if (target) {
            const foldFlag = target.grade < 4 ? true : false;
            getDownEvolutions(target, foldFlag);
        }
    });
};
const getUpEvolutions = (evolution, isFold = false) => {
    if (evolution.afters === null)
        return;
    evolution.afters.forEach(after => {
        const target = classes_1.Evolution.getById(after.to);
        // if(temp.includes(target.id)) {
        //   after['duplicated'] = true;
        //   target.afters = null;
        // } else {
        //   temp.push(target.id);
        // }
        after.isFold = isFold;
        after.digimon = target;
        // const gradeSub = Math.abs(standard.grade - target.grade);
        // const foldFlag = gradeSub > 1 ? true : false;
        if (target) {
            const foldFlag = target.grade > 2 ? true : false;
            getUpEvolutions(target, foldFlag);
        }
    });
};
const getEvolutions = (evolution) => {
    standard = evolution;
    getDownEvolutions(evolution);
    (0, commons_1.clearArray)(temp);
    getUpEvolutions(evolution);
    (0, commons_1.clearArray)(temp);
    standard = null;
};
exports.default = getEvolutions;
