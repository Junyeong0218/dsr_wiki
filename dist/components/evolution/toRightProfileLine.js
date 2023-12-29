"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enums_1 = require("../../enums");
const styles_1 = require("../styles");
const jogressProfile_1 = __importDefault(require("./jogressProfile"));
const requiredItem_1 = __importDefault(require("./requiredItem"));
const commons_1 = require("../../functions/commons");
const classes_1 = require("../../classes");
function ToRightProfileLine({ digimon, reload }) {
    var _a, _b, _c, _d;
    const commons = (_a = digimon.afters) === null || _a === void 0 ? void 0 : _a.filter(each => each.method === "일반");
    const jogress = ((_b = digimon.afters) === null || _b === void 0 ? void 0 : _b.filter(each => each.method === "조그레스")) || [];
    const commonReqItems = (commons === null || commons === void 0 ? void 0 : commons.filter((each, index) => each.ingredient !== "")) || [];
    const jogressReqItems = (jogress === null || jogress === void 0 ? void 0 : jogress.filter((each, index) => each.ingredient !== "" && index === 0)) || [];
    const getRightScore = (d) => {
        var _a;
        if (d.afters === null)
            return 1;
        if (d.afters[0].isFold)
            return 1;
        if (d.grade === 5)
            return d.afters.length;
        let acc = 0;
        (_a = d.afters) === null || _a === void 0 ? void 0 : _a.forEach((a, i) => {
            if (a.duplicated) {
                acc++;
            }
            else {
                acc += getRightScore(a.digimon);
            }
        });
        return acc;
    };
    const getRightScoreUntil = (digimon, index) => {
        var _a, _b;
        let acc = 0;
        for (let i = 0; i < ((_b = (_a = digimon.afters) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0); i++) {
            if (i >= index)
                break;
            acc += getRightScore(digimon.afters[i].digimon);
        }
        return acc;
    };
    const getWholeTop = (digimon) => enums_1.PROFILE_HEIGHT * getRightScore(digimon);
    const getMiddleTop = (digimon) => getWholeTop(digimon) / 2;
    const getRateTop = (_digimon, i) => {
        const ownIndex = digimon.afters.findIndex(after => after.to === _digimon.id);
        // 이전까지의 순수 높이 + 현재 높이의 절반 - 20
        return enums_1.PROFILE_HEIGHT * getRightScoreUntil(digimon, i)
            + getMiddleTop(digimon.afters[ownIndex].digimon)
            - 20;
    };
    const toggleFold = () => {
        digimon.afters.forEach(after => {
            after.isFold = !after.isFold;
        });
        if (reload)
            reload();
    };
    if (digimon.afters[0].isFold) {
        return (react_1.default.createElement("div", { className: "line-wrapper", style: { width: "20px", height: "80px" }, key: (0, commons_1.getUUID)() },
            react_1.default.createElement("button", { type: "button", className: "toggle-fold-button", style: { top: "30px", left: "5px" }, onClick: toggleFold },
                react_1.default.createElement("i", { className: "fa-solid fa-plus" }))));
    }
    return (react_1.default.createElement("div", { className: "line-wrapper", key: (0, commons_1.getUUID)() }, (_c = digimon.afters) === null || _c === void 0 ? void 0 :
        _c.map((after, i) => react_1.default.createElement("span", { style: (0, styles_1.getToRightTextStyle)(getRateTop(after.digimon, i)), key: (0, commons_1.getUUID)() }, `${after.getRate()}%`)),
        react_1.default.createElement("svg", { width: 100, height: getWholeTop(digimon) },
            react_1.default.createElement("line", { x1: 0, y1: getMiddleTop(digimon), x2: 50, y2: getMiddleTop(digimon), style: styles_1.revolutionLineStyle, key: (0, commons_1.getUUID)() }), (_d = digimon.afters) === null || _d === void 0 ? void 0 :
            _d.map((after, i) => react_1.default.createElement("line", { x1: 50, y1: getRateTop(after.digimon, i) + 20, x2: 100, y2: getRateTop(after.digimon, i) + 20, style: styles_1.revolutionLineStyle, key: (0, commons_1.getUUID)() })),
            digimon.afters.length > 1 &&
                react_1.default.createElement("line", { x1: 50, y1: getMiddleTop(digimon.afters[0].digimon), x2: 50, y2: getWholeTop(digimon) - getMiddleTop(digimon.afters.at(-1).digimon), style: styles_1.revolutionLineStyle, key: (0, commons_1.getUUID)() }),
            jogress.length > 0 &&
                jogress.map(each => (react_1.default.createElement("line", { x1: 50, y1: getRateTop(each.digimon, digimon.afters.findIndex(after => after.to === each.to && after.method === "조그레스")) + 20, x2: 100, y2: getRateTop(each.digimon, digimon.afters.findIndex(after => after.to === each.to && after.method === "조그레스")) + 20, style: styles_1.jogressLineStyle, key: (0, commons_1.getUUID)() }))),
            jogress.length > 0 &&
                react_1.default.createElement("line", { x1: 50, y1: getRateTop(jogress[0].digimon, digimon.afters.findIndex(after => after.to === jogress[0].to && after.method === "조그레스")) + 20, x2: 50, y2: getRateTop(jogress.at(-1).digimon, digimon.afters.findIndex(after => after.to === jogress.at(-1).to && after.method === "조그레스")) + 20, style: styles_1.jogressLineStyle, key: (0, commons_1.getUUID)() })),
        jogress.length > 0 &&
            react_1.default.createElement(jogressProfile_1.default, { digimon: classes_1.Evolution.getById(jogress[0].with), top: getRateTop(jogress[0].digimon, digimon.afters.findIndex(after => after.to === jogress[0].to && after.method === "조그레스")) + 30, key: (0, commons_1.getUUID)() }),
        commonReqItems.length > 0 &&
            react_1.default.createElement(requiredItem_1.default, { fileName: commonReqItems[0].ingredient, left: 7, top: enums_1.PROFILE_HEIGHT * (commonReqItems.length / 2) - 15, key: (0, commons_1.getUUID)() }),
        jogressReqItems.length > 0 &&
            react_1.default.createElement(requiredItem_1.default, { fileName: jogressReqItems[0].ingredient, left: 45, top: getRateTop(jogress[0].digimon, digimon.afters.findIndex(after => after.to === jogress[0].to && after.method === "조그레스")) + 45, key: (0, commons_1.getUUID)() }),
        reload &&
            react_1.default.createElement("button", { type: "button", className: "toggle-fold-button", onClick: toggleFold, style: { top: `${getMiddleTop(digimon) - 22}px`, left: "5px" } },
                react_1.default.createElement("i", { className: "fa-solid fa-minus" }))));
}
exports.default = ToRightProfileLine;
