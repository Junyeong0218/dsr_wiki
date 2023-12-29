"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("../styles");
const profile_1 = __importDefault(require("./profile"));
const toLeftProfileLine_1 = __importDefault(require("./toLeftProfileLine"));
const commons_1 = require("../../functions/commons");
function ToLeftProfileGroup({ digimon, reload }) {
    var _a;
    const wrapperStyle = ((_a = digimon.befores) === null || _a === void 0 ? void 0 : _a.length) === 1 ? styles_1.flexRow : styles_1.flexColumn;
    if (!digimon.befores || digimon.befores[0].isFold)
        return react_1.default.createElement(react_1.default.Fragment, null);
    if (digimon.befores.length === 1) {
        if (digimon.befores[0].digimon.befores) {
            return (react_1.default.createElement("div", { className: "profile-group", style: wrapperStyle, key: (0, commons_1.getUUID)() },
                react_1.default.createElement(ToLeftProfileGroup, { digimon: digimon.befores[0].digimon, reload: reload, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(toLeftProfileLine_1.default, { digimon: digimon.befores[0].digimon, reload: reload, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(profile_1.default, { digimon: digimon.befores[0].digimon, key: (0, commons_1.getUUID)() })));
        }
        return react_1.default.createElement(profile_1.default, { digimon: digimon.befores[0].digimon, key: (0, commons_1.getUUID)() });
        // } else if(digimon.befores[0].isFold) {
        // 접은 경우
    }
    else {
        return (react_1.default.createElement("div", { className: "profile-group", style: wrapperStyle, key: (0, commons_1.getUUID)() }, digimon.befores.map(before => {
            const beforeDigimon = before.digimon;
            if (!beforeDigimon.befores) {
                return react_1.default.createElement(profile_1.default, { digimon: beforeDigimon, align: "end", key: (0, commons_1.getUUID)() });
            }
            return (react_1.default.createElement("div", { className: "profile-group", style: styles_1.flexRowAndAlignEnd, key: (0, commons_1.getUUID)() },
                react_1.default.createElement(ToLeftProfileGroup, { digimon: beforeDigimon, reload: reload, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(toLeftProfileLine_1.default, { digimon: beforeDigimon, reload: reload, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(profile_1.default, { digimon: beforeDigimon, key: (0, commons_1.getUUID)() })));
        })));
    }
}
exports.default = ToLeftProfileGroup;
