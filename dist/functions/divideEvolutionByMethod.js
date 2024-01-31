"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const divideEvolutionByMethod = (evolution) => {
    var _a, _b, _c, _d, _e;
    const commonEvolution = new classes_1.Evolution(evolution);
    let jogressEvolution = null;
    commonEvolution.afters = (_b = (_a = evolution.afters) === null || _a === void 0 ? void 0 : _a.filter(after => after.method === "일반")) !== null && _b !== void 0 ? _b : [];
    if (evolution.afters && evolution.afters.filter(after => after.method !== "일반").length > 0) {
        jogressEvolution = new classes_1.Evolution(evolution);
        jogressEvolution.afters = (_d = (_c = jogressEvolution.afters) === null || _c === void 0 ? void 0 : _c.filter(after => after.method === "조그레스")) !== null && _d !== void 0 ? _d : null;
        (_e = jogressEvolution.afters) === null || _e === void 0 ? void 0 : _e.forEach(after => {
            after.digimon = evolution.afters.find(a => a.to === after.to).digimon;
        });
    }
    return [commonEvolution, jogressEvolution];
};
exports.default = divideEvolutionByMethod;
