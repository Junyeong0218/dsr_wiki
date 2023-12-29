"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classes_1 = require("../../classes");
const digimonShortcut_1 = __importDefault(require("./digimonShortcut"));
const digimonStatus_1 = __importDefault(require("./digimonStatus"));
const digimonSkills_1 = __importDefault(require("./digimonSkills"));
const react_router_dom_1 = require("react-router-dom");
function DigimonInfo({ selected }) {
    const digimon = classes_1.Digimon.getByName(selected);
    const navigate = (0, react_router_dom_1.useNavigate)();
    if (!digimon) {
        navigate("/digidex");
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "digimon-info" },
        react_1.default.createElement(digimonShortcut_1.default, { digimon: digimon }),
        react_1.default.createElement(digimonStatus_1.default, { digimon: digimon }),
        react_1.default.createElement(digimonSkills_1.default, { digimon: digimon })));
}
exports.default = DigimonInfo;
