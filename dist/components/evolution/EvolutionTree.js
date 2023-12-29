"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const profile_1 = __importDefault(require("./profile"));
const toLeftProfileLine_1 = __importDefault(require("./toLeftProfileLine"));
const toLeftProfileGroup_1 = __importDefault(require("./toLeftProfileGroup"));
const toRightProfileLine_1 = __importDefault(require("./toRightProfileLine"));
const toRightProfileGroup_1 = __importDefault(require("./toRightProfileGroup"));
const commons_1 = require("../../functions/commons");
function EvolutionTree({ selectedDigimon, reload }) {
    var _a, _b, _c, _d;
    if (!selectedDigimon) {
        return react_1.default.createElement("div", { className: 'evolution' });
    }
    return (react_1.default.createElement("div", { className: 'evolution' },
        selectedDigimon.befores && ((_a = selectedDigimon.befores) === null || _a === void 0 ? void 0 : _a.length) > 0 && react_1.default.createElement(toLeftProfileGroup_1.default, { reload: reload, digimon: selectedDigimon, key: (0, commons_1.getUUID)() }),
        selectedDigimon.befores && ((_b = selectedDigimon.befores) === null || _b === void 0 ? void 0 : _b.length) > 0 && react_1.default.createElement(toLeftProfileLine_1.default, { reload: reload, digimon: selectedDigimon, key: (0, commons_1.getUUID)() }),
        selectedDigimon && react_1.default.createElement(profile_1.default, { digimon: selectedDigimon, key: (0, commons_1.getUUID)() }),
        selectedDigimon.afters && ((_c = selectedDigimon.afters) === null || _c === void 0 ? void 0 : _c.length) > 0 && react_1.default.createElement(toRightProfileLine_1.default, { reload: reload, digimon: selectedDigimon, key: (0, commons_1.getUUID)() }),
        selectedDigimon.afters && ((_d = selectedDigimon.afters) === null || _d === void 0 ? void 0 : _d.length) > 0 && react_1.default.createElement(toRightProfileGroup_1.default, { reload: reload, digimon: selectedDigimon, key: (0, commons_1.getUUID)() })));
}
exports.default = EvolutionTree;
