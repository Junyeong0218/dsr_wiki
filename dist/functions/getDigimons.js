"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDigimonByName = exports.getDigimonById = exports.getAllDigimons = void 0;
const classes_1 = require("../classes");
const digimons_json_1 = __importDefault(require("../json/digimons.json"));
const origin = new Array();
const loadDigimons = () => {
    if (origin.length === 0) {
        digimons_json_1.default.forEach((value) => {
            origin.push(new classes_1.Digimon(value));
        });
    }
};
const deepCopyAll = (includeMutation) => {
    loadDigimons();
    const all = new Array();
    for (const each of origin) {
        if (includeMutation || !each.name.includes("[돌연변이]"))
            // all.push(deepCopyDigimon(each));
            all.push(new classes_1.Digimon(each));
    }
    return all;
};
const getDigimonById = (id) => {
    var _a;
    loadDigimons();
    const digimon = (_a = origin.find(each => each.id === id)) !== null && _a !== void 0 ? _a : null;
    if (!digimon)
        return digimon;
    return new classes_1.Digimon(digimon);
};
exports.getDigimonById = getDigimonById;
const getDigimonByName = (name) => {
    var _a;
    loadDigimons();
    const digimon = (_a = origin.find(each => each.name === name)) !== null && _a !== void 0 ? _a : null;
    if (!digimon)
        return digimon;
    return new classes_1.Digimon(digimon);
};
exports.getDigimonByName = getDigimonByName;
const getAllDigimons = (includeMutation) => deepCopyAll(includeMutation);
exports.getAllDigimons = getAllDigimons;
