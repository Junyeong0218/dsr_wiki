"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOverflows = void 0;
const Overflow_1 = require("../classes/Overflow");
const overflows_json_1 = __importDefault(require("../json/overflows.json"));
const getItemsFunctions_1 = require("./getItemsFunctions");
const origin = new Array();
const loadOverflows = () => {
    const items = (0, getItemsFunctions_1.getItems)();
    if (origin.length === 0) {
        overflows_json_1.default.forEach((each) => {
            const overflow = new Overflow_1.Overflow(each);
            origin.push(overflow);
            each.stages.forEach((es) => {
                const stage = new Overflow_1.Stage(es, items);
                overflow.addStage(stage);
            });
        });
    }
};
const deepCopyAll = () => {
    loadOverflows();
    const all = new Array();
    for (const each of origin) {
        const overflow = new Overflow_1.Overflow(each);
        all.push(overflow);
        each.stages.forEach((s) => {
            overflow.addStage(Object.assign({}, s));
        });
    }
    return all;
};
// const getEvolutionById = (id: number): Evolution|null => {
//     loadEvolutions();
//     const evolution = origin.find(each => each.id === id) ?? null;
//     if(!evolution) return evolution;
//     return new Evolution(evolution);
// }
// const getEvolutionByName = (name: string): Evolution|null => {
//     loadEvolutions();
//     const evolution = origin.find(each => each.name === name) ?? null;
//     if(!evolution) return evolution;
//     return new Evolution(evolution);
// }
const getAllOverflows = () => deepCopyAll();
exports.getAllOverflows = getAllOverflows;
