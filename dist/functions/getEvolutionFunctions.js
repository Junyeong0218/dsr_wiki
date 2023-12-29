"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvolutionByName = exports.getEvolutionById = exports.getAllEvolutions = void 0;
const classes_1 = require("../classes");
const evolutions_json_1 = __importDefault(require("../json/evolutions.json"));
const origin = new Array();
const loadEvolutions = () => {
    if (origin.length === 0) {
        evolutions_json_1.default.forEach((each) => {
            origin.push(new classes_1.Evolution(each));
        });
    }
};
const deepCopyAll = (includeMutation) => {
    loadEvolutions();
    const all = new Array();
    for (const each of origin) {
        if (includeMutation || !each.name.includes("[돌연변이]"))
            // all.push(deepCopyDigimon(each));
            all.push(new classes_1.Evolution(each));
    }
    return all;
};
const getEvolutionById = (id) => {
    var _a;
    loadEvolutions();
    const evolution = (_a = origin.find(each => each.id === id)) !== null && _a !== void 0 ? _a : null;
    if (!evolution)
        return evolution;
    return new classes_1.Evolution(evolution);
};
exports.getEvolutionById = getEvolutionById;
const getEvolutionByName = (name) => {
    var _a;
    loadEvolutions();
    const evolution = (_a = origin.find(each => each.name === name)) !== null && _a !== void 0 ? _a : null;
    if (!evolution)
        return evolution;
    return new classes_1.Evolution(evolution);
};
exports.getEvolutionByName = getEvolutionByName;
const getAllEvolutions = (includeMutation) => deepCopyAll(includeMutation);
exports.getAllEvolutions = getAllEvolutions;
