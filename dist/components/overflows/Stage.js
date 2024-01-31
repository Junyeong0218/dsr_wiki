"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Reword_1 = __importDefault(require("./Reword"));
const commons_1 = require("../../functions/commons");
function StageTag({ stage }) {
    return (react_1.default.createElement("div", { className: "stage" },
        react_1.default.createElement("div", { className: "monsters" },
            react_1.default.createElement("span", null,
                "stage ",
                stage.id),
            stage.monsters.map((monster, index) => {
                // const digimon = Digimon.getByName(monster.name)!;
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
