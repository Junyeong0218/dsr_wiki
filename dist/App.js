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
const react_router_dom_1 = require("react-router-dom");
const Main_1 = __importDefault(require("./Main"));
const NotFound_1 = __importDefault(require("./NotFound"));
const Header_1 = __importDefault(require("./components/Header"));
const Footer_1 = __importDefault(require("./components/Footer"));
const Maps_1 = __importDefault(require("./components/maps/Maps"));
const Combination_1 = __importDefault(require("./components/combination/Combination"));
const Digidex_1 = __importDefault(require("./components/digidex/Digidex"));
const EvolutionSearcher_1 = __importDefault(require("./components/evolution/EvolutionSearcher"));
const Overflows_1 = __importDefault(require("./components/overflows/Overflows"));
const Detector_1 = __importDefault(require("./components/detector/Detector"));
const Adjustments_1 = __importDefault(require("./components/adjustment/Adjustments"));
const Potentials_1 = __importDefault(require("./components/potential/Potentials"));
// import Raids from "./components/raids/Raid";
const Guides_1 = __importDefault(require("./components/guides/Guides"));
const Guide_1 = __importDefault(require("./components/guides/Guide"));
const SkillSimulator_1 = __importDefault(require("./components/skillSimulator/SkillSimulator"));
const BabySimulator_1 = __importDefault(require("./components/babySimulator/BabySimulator"));
function App() {
    return (react_1.default.createElement(react_1.StrictMode, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { id: "container" },
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/**", element: react_1.default.createElement(Header_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Main_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/guides", element: react_1.default.createElement(Guides_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/guides/:id", element: react_1.default.createElement(Guide_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/digimons/digidex", element: react_1.default.createElement(Digidex_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/digimons/evolutions", element: react_1.default.createElement(EvolutionSearcher_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/maps", element: react_1.default.createElement(Maps_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/dungeons/overflows", element: react_1.default.createElement(Overflows_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/dungeons/detectors", element: react_1.default.createElement(Detector_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/adjustments", element: react_1.default.createElement(Adjustments_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/babies", element: react_1.default.createElement(BabySimulator_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/potentials", element: react_1.default.createElement(Potentials_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/tools/skills", element: react_1.default.createElement(SkillSimulator_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/items/combinations", element: react_1.default.createElement(Combination_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(NotFound_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/**", element: react_1.default.createElement(Footer_1.default, null) }))))));
}
exports.default = App;
