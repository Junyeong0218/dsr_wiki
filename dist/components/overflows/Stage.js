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
const Reword_1 = __importDefault(require("./Reword"));
const commons_1 = require("../../functions/commons");
function StageTag({ stage }) {
    const [isFold, SetIsFold] = (0, react_1.useState)(true);
    return (react_1.default.createElement("div", { className: `stage ${isFold ? "fold" : ""}` },
        react_1.default.createElement("button", { type: "button", className: "title", onClick: () => SetIsFold(!isFold) },
            "stage ",
            stage.id),
        react_1.default.createElement("div", { className: "monsters" }, stage.monsters.map((monster, index) => {
            return react_1.default.createElement("div", { className: "monster", key: (0, commons_1.getUUID)() },
                react_1.default.createElement("img", { src: `/images/${monster.name}.png`, className: "stage-monster-image", "data-id": `${stage.id}-${index}` }),
                react_1.default.createElement("img", { src: `/images/${monster.digimonType}.png` }));
        })),
        react_1.default.createElement("div", { className: "rewords" },
            react_1.default.createElement("div", { className: "first-rewords" },
                react_1.default.createElement("span", { className: "title" }, "\uCCAB \uD074\uB9AC\uC5B4"),
                stage.firstRewords.map(reword => (react_1.default.createElement(Reword_1.default, { reword: reword, key: (0, commons_1.getUUID)() })))),
            react_1.default.createElement("div", { className: "repeat-rewords" },
                react_1.default.createElement("span", { className: "title" }, "\uBC18\uBCF5"),
                stage.repeatRewords.map(reword => (react_1.default.createElement(Reword_1.default, { reword: reword, key: (0, commons_1.getUUID)() })))))));
}
exports.default = StageTag;
