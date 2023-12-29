"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const divideEvolutionByMethod = (evolution) => {
    var _a, _b, _c, _d, _e, _f;
    const commonEvolution = new classes_1.Evolution(evolution);
    let jogressEvolution = null;
    commonEvolution.afters = (_b = (_a = commonEvolution.afters) === null || _a === void 0 ? void 0 : _a.filter(after => after.method === "일반")) !== null && _b !== void 0 ? _b : null;
    if (((_c = commonEvolution.afters) === null || _c === void 0 ? void 0 : _c.length) !== ((_d = evolution.afters) === null || _d === void 0 ? void 0 : _d.length)) {
        jogressEvolution = new classes_1.Evolution(evolution);
        jogressEvolution.afters = (_f = (_e = jogressEvolution.afters) === null || _e === void 0 ? void 0 : _e.filter(after => after.method === "조그레스")) !== null && _f !== void 0 ? _f : null;
    }
    return [commonEvolution, jogressEvolution];
};
exports.default = divideEvolutionByMethod;
