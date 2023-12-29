"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classes_1 = require("../../classes");
const functions_1 = require("../../functions");
const toLeftProfileGroup_1 = __importDefault(require("../evolution/toLeftProfileGroup"));
const toLeftProfileLine_1 = __importDefault(require("../evolution/toLeftProfileLine"));
const profile_1 = __importDefault(require("../evolution/profile"));
const toRightProfileLine_1 = __importDefault(require("../evolution/toRightProfileLine"));
const toRightProfileGroup_1 = __importDefault(require("../evolution/toRightProfileGroup"));
const react_router_dom_1 = require("react-router-dom");
function Evolutions({ selected }) {
    const evolution = classes_1.Evolution.getByName(selected);
    if (!evolution)
        return react_1.default.createElement(react_1.default.Fragment, null);
    (0, functions_1.getJustBeforeEvolution)(evolution);
    (0, functions_1.getJustAfterEvolution)(evolution);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [commonEvolution, jogressEvolution] = (0, functions_1.divideEvolutionByMethod)(evolution);
    const changeDigimon = (event) => {
        const target = event.target;
        let digimonName = "";
        if (target.className === "profile") {
            digimonName = target.children[1].innerText;
        }
        else if (target.className === "profile-image") {
            digimonName = target.nextElementSibling.innerText;
        }
        else
            return;
        console.log(digimonName);
        if (digimonName.includes("돌연변이"))
            return;
        navigate(`/digidex?digimon=${digimonName}`);
    };
    const evolutions = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("div", { className: "evolutions", onClick: changeDigimon },
            react_1.default.createElement("div", { className: "evolution" },
                react_1.default.createElement("span", { className: "title" }, "\uC774\uC804 \uC9C4\uD654"),
                react_1.default.createElement(toLeftProfileGroup_1.default, { digimon: evolution }),
                react_1.default.createElement(toLeftProfileLine_1.default, { digimon: evolution }),
                react_1.default.createElement(profile_1.default, { digimon: evolution })),
            commonEvolution.afters &&
                react_1.default.createElement("div", { className: "evolution" },
                    react_1.default.createElement("span", { className: "title" }, "\uC77C\uBC18 \uC9C4\uD654"),
                    react_1.default.createElement(profile_1.default, { digimon: commonEvolution }),
                    react_1.default.createElement(toRightProfileLine_1.default, { digimon: commonEvolution }),
                    react_1.default.createElement(toRightProfileGroup_1.default, { digimon: commonEvolution })),
            jogressEvolution &&
                react_1.default.createElement("div", { className: "evolution" },
                    react_1.default.createElement("span", { className: "title" }, "\uC870\uADF8\uB808\uC2A4 \uC9C4\uD654"),
                    react_1.default.createElement(profile_1.default, { digimon: jogressEvolution }),
                    react_1.default.createElement(toRightProfileLine_1.default, { digimon: jogressEvolution }),
                    react_1.default.createElement(toRightProfileGroup_1.default, { digimon: jogressEvolution })));
    }, [selected]);
    return evolutions;
}
exports.default = Evolutions;
