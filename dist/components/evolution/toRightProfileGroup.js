"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("../styles");
const profile_1 = __importDefault(require("./profile"));
const toRightProfileLine_1 = __importDefault(require("./toRightProfileLine"));
const commons_1 = require("../../functions/commons");
function ToRightProfileGroup({ digimon, reload }) {
    if (!digimon.afters || digimon.afters[0].isFold)
        return react_1.default.createElement(react_1.default.Fragment, null);
    const wrapperStyle = digimon.afters.length === 1 ? styles_1.flexRow : styles_1.flexColumn;
    if (digimon.afters.length === 1) {
        if (digimon.afters[0].digimon.afters) {
            return (react_1.default.createElement("div", { className: "profile-group", style: wrapperStyle, key: (0, commons_1.getUUID)() },
                react_1.default.createElement(profile_1.default, { digimon: digimon.afters[0].digimon, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(toRightProfileLine_1.default, { digimon: digimon.afters[0].digimon, reload: reload, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(ToRightProfileGroup, { digimon: digimon.afters[0].digimon, reload: reload, key: (0, commons_1.getUUID)() })));
        }
        return react_1.default.createElement(profile_1.default, { digimon: digimon.afters[0].digimon, key: (0, commons_1.getUUID)() });
    }
    else {
        return (react_1.default.createElement("div", { className: "profile-group", style: wrapperStyle }, digimon.afters.map(after => {
            const afterDigimon = after.digimon;
            if (!(afterDigimon === null || afterDigimon === void 0 ? void 0 : afterDigimon.afters)) {
                return react_1.default.createElement(profile_1.default, { digimon: afterDigimon, align: "start", key: (0, commons_1.getUUID)() });
            }
            return (react_1.default.createElement("div", { className: "profile-group", style: styles_1.flexRowAndAlignStart, key: (0, commons_1.getUUID)() },
                react_1.default.createElement(profile_1.default, { digimon: afterDigimon, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(toRightProfileLine_1.default, { digimon: afterDigimon, reload: reload, key: (0, commons_1.getUUID)() }),
                react_1.default.createElement(ToRightProfileGroup, { digimon: afterDigimon, reload: reload, key: (0, commons_1.getUUID)() })));
        })));
    }
}
exports.default = ToRightProfileGroup;
