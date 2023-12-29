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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const commons_1 = require("../../functions/commons");
const enums_1 = require("../../enums");
function EvolutionDescriptionModal({ isActive, position, digimon }) {
    var _a, _b;
    // export default function RevolutionDescriptionModal({ isActive, top, left, digimon }) {
    if (digimon === null)
        return (react_1.default.createElement("div", { id: "evolution-description", className: `modal ${isActive ? "active" : ""}` },
            react_1.default.createElement("div", { className: "window" })));
    const style = { top: `${position.top + 10}px`, left: `${position.left + 10}px` };
    // const style = {top: `${position.current.top + 10}px`, left: `${position.current.left + 10}px`};
    // const style = {top: `${top + 10}px`, left: `${left + 10}px`};
    const commons = ((_a = digimon.befores) === null || _a === void 0 ? void 0 : _a.filter(b => b.method === "일반")) || [];
    const jogress = ((_b = digimon.befores) === null || _b === void 0 ? void 0 : _b.filter(b => b.method === "조그레스")) || [];
    const commonsRevolution = (0, react_1.useMemo)(() => {
        var _a;
        return commons.length > 0 &&
            // return 
            react_1.default.createElement("div", { className: "commons" },
                react_1.default.createElement("svg", { width: 200, height: 20 },
                    react_1.default.createElement("line", { x1: 10, y1: 10, x2: 190, y2: 10, style: { stroke: "var(--white)", strokeWidth: `${2}px` }, strokeDasharray: "4,4" })),
                react_1.default.createElement("span", { className: "semi-title" }, "\uC77C\uBC18 \uC9C4\uD654"),
                commons.length > 0 && digimon.grade < 5 &&
                    react_1.default.createElement("div", { className: "targets" }, commons.map(d => (react_1.default.createElement("div", { className: "target", key: (0, commons_1.getUUID)() },
                        react_1.default.createElement("img", { src: `/images/${d.digimon.name}.png` }),
                        react_1.default.createElement("span", null, d.digimon.name),
                        react_1.default.createElement("span", null, `${d.getRate()}%`))))),
                commons.length > 0 && digimon.grade < 5 &&
                    react_1.default.createElement("div", { className: "conditions" },
                        react_1.default.createElement("div", { className: "conditions common" }, (_a = Object.keys(commons[0])) === null || _a === void 0 ? void 0 :
                            _a.filter(key => Object.keys(enums_1.RequireStatName).includes(key) && commons[0][key] !== 0 && commons[0][key] !== "").map(key => (react_1.default.createElement("div", { className: "condition", key: (0, commons_1.getUUID)() },
                                react_1.default.createElement("span", { className: "condition-title" }, enums_1.RequireStatName[key]),
                                react_1.default.createElement("span", { className: "condition-value" }, key === "reqBonding" ? commons[0].getBonding() + "%" : commons[0][key])))),
                            commons[0].ingredient !== "" &&
                                react_1.default.createElement("div", { className: "condition" },
                                    react_1.default.createElement("span", { className: "condition-title" }, "\uC544\uC774\uD15C"),
                                    react_1.default.createElement("span", null,
                                        commons[0].ingredient,
                                        "\u00A0",
                                        react_1.default.createElement("img", { src: `/images/${commons[0].ingredient}.png` }))))),
                commons.length > 0 && digimon.grade >= 5 &&
                    react_1.default.createElement("div", { className: "conditions" }, commons.map(common => {
                        var _a;
                        return (react_1.default.createElement("div", { className: "conditions common", key: (0, commons_1.getUUID)() },
                            react_1.default.createElement("img", { src: `/images/${common.digimon.name}.png` }),
                            react_1.default.createElement("span", { className: "digimon-name" },
                                common.digimon.name,
                                react_1.default.createElement("br", null),
                                `${common.getRate()}%`), (_a = Object.keys(common)) === null || _a === void 0 ? void 0 :
                            _a.filter(key => Object.keys(enums_1.RequireStatName).includes(key) && common[key] !== 0 && common[key] !== "").map(key => (react_1.default.createElement("div", { className: "condition", key: (0, commons_1.getUUID)() },
                                react_1.default.createElement("span", { className: "condition-title" }, enums_1.RequireStatName[key]),
                                react_1.default.createElement("span", { className: "condition-value" }, key === "reqBonding" ? common.getBonding() + "%" : common[key])))),
                            common.ingredient !== "" &&
                                react_1.default.createElement("div", { className: "condition", style: { alignSelf: "flex-end" } },
                                    react_1.default.createElement("img", { src: `/images/${common.ingredient}.png` }),
                                    react_1.default.createElement("span", { className: "digimon-name" }, common.ingredient))));
                    })));
    }, [digimon]);
    const jogressRevolution = (0, react_1.useMemo)(() => {
        var _a, _b;
        return jogress.length > 0 &&
            // return 
            react_1.default.createElement("div", { className: "jogress" },
                react_1.default.createElement("svg", { width: 200, height: 20 },
                    react_1.default.createElement("line", { x1: 10, y1: 10, x2: 190, y2: 10, style: { stroke: "var(--white)", strokeWidth: `${2}px` }, strokeDasharray: "4,4" })),
                react_1.default.createElement("span", { className: "semi-title" }, "\uC870\uADF8\uB808\uC2A4 \uC9C4\uD654"),
                react_1.default.createElement("div", { className: "conditions" },
                    react_1.default.createElement("div", { className: "conditions jogress" },
                        react_1.default.createElement("img", { src: `/images/${jogress[0].digimon.name}.png` }),
                        react_1.default.createElement("span", { className: "digimon-name" }, jogress[0].digimon.name), (_a = Object.keys(jogress[0])) === null || _a === void 0 ? void 0 :
                        _a.filter(key => Object.keys(enums_1.RequireStatName).includes(key) && jogress[0][key] !== 0 && jogress[0][key] !== "").map(key => (react_1.default.createElement("div", { className: "condition", key: (0, commons_1.getUUID)() },
                            react_1.default.createElement("span", { className: "condition-title" }, enums_1.RequireStatName[key]),
                            react_1.default.createElement("span", { className: "condition-value" }, key === "reqBonding" ? jogress[0].getBonding() + "%" : jogress[0][key]))))),
                    react_1.default.createElement("div", { className: "conditions jogress" },
                        react_1.default.createElement("img", { src: `/images/${jogress[1].digimon.name}.png` }),
                        react_1.default.createElement("span", { className: "digimon-name" }, jogress[1].digimon.name), (_b = Object.keys(jogress[1])) === null || _b === void 0 ? void 0 :
                        _b.filter(key => Object.keys(enums_1.RequireStatName).includes(key) && jogress[1][key] !== 0 && jogress[1][key] !== "").map(key => (react_1.default.createElement("div", { className: "condition", key: (0, commons_1.getUUID)() },
                            react_1.default.createElement("span", { className: "condition-title" }, enums_1.RequireStatName[key]),
                            react_1.default.createElement("span", { className: "condition-value" }, key === "reqBonding" ? jogress[1].getBonding() + "%" : jogress[1][key]))))),
                    jogress[0].ingredient !== "" && react_1.default.createElement("div", { className: "conditions jogress" },
                        react_1.default.createElement("img", { src: `/images/${jogress[0].ingredient}.png` }),
                        react_1.default.createElement("span", { className: "digimon-name" }, jogress[0].ingredient))));
    }, [digimon]);
    return (react_1.default.createElement("div", { id: "evolution-description", className: `modal ${isActive ? "active" : ""}`, style: style },
        react_1.default.createElement("div", { className: "window" },
            react_1.default.createElement("span", { className: "title" }, "\uC9C4\uD654 \uC870\uAC74"),
            commonsRevolution,
            jogressRevolution)));
}
exports.default = EvolutionDescriptionModal;
