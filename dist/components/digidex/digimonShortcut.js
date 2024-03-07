"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enums_1 = require("../../enums");
const react_router_dom_1 = require("react-router-dom");
const evolutions_1 = __importDefault(require("./evolutions"));
function DigimonShortcut({ digimon }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement("div", { className: "digimon-shortcut-container" },
        react_1.default.createElement("img", { className: `${enums_1.GradeClassNames[enums_1.Grades[`${digimon.grade}`]]}2`, src: `/images/${digimon.name}.png` }),
        react_1.default.createElement("div", { className: "digimon-shortcut-info" },
            react_1.default.createElement("div", { className: "digimon-name-container" },
                react_1.default.createElement("span", { className: "digimon-name" }, digimon.name),
                react_1.default.createElement(evolutions_1.default, { digimon: digimon })),
            react_1.default.createElement("span", null, enums_1.Grades[`${digimon.grade}`]),
            react_1.default.createElement("img", { src: `/images/${digimon.digimonType}.png` })),
        react_1.default.createElement("button", { type: "button", className: "back-button", onClick: () => navigate("/digimons/digidex") }, "\uB3C4\uAC10\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30")));
}
exports.default = DigimonShortcut;
