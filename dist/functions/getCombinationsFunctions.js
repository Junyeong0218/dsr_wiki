"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCombinations = void 0;
const Combination_1 = require("../classes/Combination");
const combinations_json_1 = __importDefault(require("../json/combinations.json"));
const origin = new Array();
const loadCombinations = () => {
    if (origin.length === 0) {
        combinations_json_1.default.forEach((each) => {
            origin.push(new Combination_1.Combination(each));
        });
    }
};
const getCombinations = () => {
    loadCombinations();
    return origin;
};
exports.getCombinations = getCombinations;
