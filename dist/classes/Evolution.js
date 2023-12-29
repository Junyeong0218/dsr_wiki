"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evolution = void 0;
const enums_1 = require("../enums");
const functions_1 = require("../functions");
const EvolutionInfo_1 = require("./EvolutionInfo");
class Evolution {
    constructor(raw) {
        var _a, _b;
        this.getGradeText = () => enums_1.Grades[this.grade];
        this.getBefore = (index) => { var _a; return (_a = (0, functions_1.getEvolutionById)(this.befores.at(index).from)) !== null && _a !== void 0 ? _a : null; };
        this.getAfter = (index) => { var _a; return (_a = (0, functions_1.getEvolutionById)(this.afters.at(index).to)) !== null && _a !== void 0 ? _a : null; };
        this.id = raw.id;
        this.name = raw.name;
        this.grade = raw.grade;
        this.digimonType = raw.digimonType;
        this.befores = ((_a = raw.befores) === null || _a === void 0 ? void 0 : _a.map(before => new EvolutionInfo_1.EvolutionInfo(before))) || null;
        this.afters = ((_b = raw.afters) === null || _b === void 0 ? void 0 : _b.map(after => new EvolutionInfo_1.EvolutionInfo(after))) || null;
    }
}
exports.Evolution = Evolution;
Evolution.getById = (id) => (0, functions_1.getEvolutionById)(id);
Evolution.getByName = (name) => (0, functions_1.getEvolutionByName)(name);
