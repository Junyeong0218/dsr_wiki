"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enums_1 = require("../../enums");
const styles_1 = require("../styles");
const requiredItem_1 = __importDefault(require("./requiredItem"));
const commons_1 = require("../../functions/commons");
function ToLeftProfileLine({ digimon, reload }) {
    var _a, _b, _c, _d;
    const commons = (_a = digimon.befores) === null || _a === void 0 ? void 0 : _a.filter(each => each.method === "일반");
    const jogress = ((_b = digimon.befores) === null || _b === void 0 ? void 0 : _b.filter(each => each.method === "조그레스")) || [];
    const commonReqItems = (commons === null || commons === void 0 ? void 0 : commons.filter((each, index) => each.ingredient !== "")) || [];
    const jogressReqItems = jogress.filter((each, index) => each.ingredient !== "" && index === 0) || [];
    const getLeftScore = (d) => {
        var _a;
        if (d.befores === null)
            return 1;
        if (d.befores[0].isFold)
            return 1;
        if (d.grade === 2)
            return d.befores.length;
        let acc = 0;
        (_a = d.befores) === null || _a === void 0 ? void 0 : _a.forEach((b, i) => {
            if (b.duplicated) {
                acc++;
            }
            else {
                acc += getLeftScore(b.digimon);
            }
        });
        return acc;
    };
    const getLeftScoreUntil = (digimon, index) => {
        var _a, _b;
        let acc = 0;
        for (let i = 0; i < ((_b = (_a = digimon.befores) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0); i++) {
            if (i >= index)
                break;
            acc += getLeftScore(digimon.befores[i].digimon);
        }
        return acc;
    };
    const getWholeTop = (digimon) => enums_1.PROFILE_HEIGHT * getLeftScore(digimon);
    const getMiddleTop = (digimon) => getWholeTop(digimon) / 2;
    const getRateTop = (_digimon, i) => {
        const ownIndex = digimon.befores.findIndex(before => before.from === _digimon.id);
        // 이전까지의 순수 높이 + 현재 높이의 절반 - 20
        return enums_1.PROFILE_HEIGHT * getLeftScoreUntil(digimon, i)
            + getMiddleTop(digimon.befores[ownIndex].digimon)
            - 20;
    };
    const toggleFold = () => {
        digimon.befores.forEach(before => {
            before.isFold = !before.isFold;
        });
        if (reload)
            reload();
    };
    if (digimon.befores[0].isFold) {
        return (react_1.default.createElement("div", { className: "line-wrapper", style: { width: "20px", height: "80px" }, key: (0, commons_1.getUUID)() },
            react_1.default.createElement("button", { type: "button", className: "toggle-fold-button", style: { top: "30px", right: "5px" }, onClick: toggleFold },
                react_1.default.createElement("i", { className: "fa-solid fa-plus" }))));
    }
    return (react_1.default.createElement("div", { className: "line-wrapper", key: (0, commons_1.getUUID)() }, (_c = digimon.befores) === null || _c === void 0 ? void 0 :
        _c.map((before, i) => react_1.default.createElement("span", { style: (0, styles_1.getToLeftTextStyle)(getRateTop(before.digimon, i)), key: (0, commons_1.getUUID)() }, `${before.getRate()}%`)),
        react_1.default.createElement("svg", { width: 100, height: getWholeTop(digimon) }, (_d = digimon.befores) === null || _d === void 0 ? void 0 :
            _d.map((before, i) => react_1.default.createElement("line", { x1: 0, y1: getRateTop(before.digimon, i) + 20, x2: 50, y2: getRateTop(before.digimon, i) + 20, style: styles_1.revolutionLineStyle, key: (0, commons_1.getUUID)() })),
            digimon.befores.length > 1 &&
                react_1.default.createElement("line", { x1: 50, y1: getMiddleTop(digimon.befores[0].digimon), x2: 50, y2: getWholeTop(digimon) - getMiddleTop(digimon.befores.at(-1).digimon), style: styles_1.revolutionLineStyle, key: (0, commons_1.getUUID)() }),
            react_1.default.createElement("line", { x1: 50, y1: getMiddleTop(digimon), x2: 100, y2: getMiddleTop(digimon), style: styles_1.revolutionLineStyle, key: (0, commons_1.getUUID)() }),
            jogress.length > 0 &&
                jogress.map(each => (react_1.default.createElement("line", { x1: 0, y1: getRateTop(each.digimon, digimon.befores.findIndex(before => before.from === each.from && before.method === "조그레스")) + 20, x2: 50, y2: getRateTop(each.digimon, digimon.befores.findIndex(before => before.from === each.from && before.method === "조그레스")) + 20, style: styles_1.jogressLineStyle, key: (0, commons_1.getUUID)() }))),
            jogress.length > 0 &&
                react_1.default.createElement("line", { x1: 50, y1: getRateTop(jogress[0].digimon, digimon.befores.findIndex(before => before.from === jogress[0].from && before.method === "조그레스")) + 20, x2: 50, y2: getRateTop(jogress.at(-1).digimon, digimon.befores.findIndex(before => before.from === jogress.at(-1).from && before.method === "조그레스")) + 20, style: styles_1.jogressLineStyle, key: (0, commons_1.getUUID)() })),
        commonReqItems.length > 0 &&
            react_1.default.createElement(requiredItem_1.default, { fileName: commonReqItems[0].ingredient, left: 43, top: getMiddleTop(digimon) - 15, key: (0, commons_1.getUUID)() }),
        jogressReqItems.length > 0 &&
            react_1.default.createElement(requiredItem_1.default, { fileName: jogressReqItems[0].ingredient, left: 43, top: getMiddleTop(digimon) - 15, key: (0, commons_1.getUUID)() }),
        reload &&
            react_1.default.createElement("button", { type: "button", className: "toggle-fold-button", onClick: toggleFold, style: { top: `${getMiddleTop(digimon) - 22}px`, right: "5px" } },
                react_1.default.createElement("i", { className: "fa-solid fa-minus" }))));
}
exports.default = ToLeftProfileLine;
