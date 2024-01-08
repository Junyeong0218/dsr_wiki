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
const functions_1 = require("../../functions");
const WeekdayFunctions_1 = require("../../functions/WeekdayFunctions");
const commons_1 = require("../../functions/commons");
const classes_1 = require("../../classes");
function Overflows() {
    const all = (0, functions_1.getAllOverflows)();
    const [selected, setSelected] = (0, react_1.useState)(all[0]);
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "overflow-container" },
            react_1.default.createElement("div", { className: "map-selector" }, all.map(each => (react_1.default.createElement("button", { type: "button", className: `map-name-button ${selected.mapName === each.mapName ? "selected" : ""}`, onClick: () => setSelected(each) }, each.mapName)))),
            react_1.default.createElement("div", { className: "overflow-shortcut" },
                react_1.default.createElement("div", { className: "map-viewer-small" },
                    react_1.default.createElement("img", { src: `/images/${selected.mapName}.png` })),
                react_1.default.createElement("div", { className: "overflow-shortcut-infos" },
                    react_1.default.createElement("div", { className: "overflow-req-item" },
                        react_1.default.createElement("img", { src: `/images/${encodeURIComponent((0, commons_1.getNameExceptColon)(selected.reqItem.name))}.png` }),
                        react_1.default.createElement("span", null, selected.reqItem.name)),
                    react_1.default.createElement("div", { className: "weekdays" }, selected.weekdays.map(weekday => {
                        const weekdayText = (0, WeekdayFunctions_1.getWeekdayText)(weekday);
                        const todayFlag = (0, WeekdayFunctions_1.isToday)(weekday);
                        return react_1.default.createElement("div", { className: `weekday ${todayFlag ? "today" : ""}` },
                            react_1.default.createElement("span", { className: todayFlag ? "today" : "" }, weekdayText),
                            todayFlag ? react_1.default.createElement("img", { src: "/images/green dot.png" }) : "");
                    })))),
            react_1.default.createElement("div", { className: "stages" }, selected.stages.map(stage => (react_1.default.createElement("div", { className: "stage" },
                react_1.default.createElement("div", { className: "monsters" },
                    react_1.default.createElement("span", null,
                        "stage ",
                        stage.id),
                    stage.monsters.map(monster => {
                        const digimon = classes_1.Digimon.getByName(monster.name);
                        return react_1.default.createElement("div", { className: "monster" },
                            react_1.default.createElement("img", { src: `/images/${monster.name}.png` }),
                            react_1.default.createElement("img", { src: `/images/${monster.digimonType}.png` }));
                    })),
                react_1.default.createElement("div", { className: "rewords" },
                    react_1.default.createElement("div", { className: "first-rewords" },
                        react_1.default.createElement("span", { className: "title" }, "\uCCAB \uD074\uB9AC\uC5B4"),
                        stage.firstRewords.map(reword => (react_1.default.createElement("div", { className: "reword" },
                            react_1.default.createElement("img", { src: `/images/${encodeURIComponent((0, commons_1.getNameExceptColon)(reword.item.name))}.png` }),
                            react_1.default.createElement("div", { className: "reword-info" },
                                react_1.default.createElement("span", null, reword.item.name),
                                react_1.default.createElement("span", { className: reword.item.canTrade ? "green" : "red" }, reword.item.canTrade ? "거래가능" : "거래불가"),
                                react_1.default.createElement("span", null,
                                    reword.count,
                                    "ea")))))),
                    react_1.default.createElement("div", { className: "repeat-rewords" },
                        react_1.default.createElement("span", { className: "title" }, "\uBC18\uBCF5"),
                        stage.repeatRewords.map(reword => (react_1.default.createElement("div", { className: "reword" },
                            react_1.default.createElement("img", { src: `/images/${encodeURIComponent((0, commons_1.getNameExceptColon)(reword.item.name))}.png` }),
                            react_1.default.createElement("div", { className: "reword-info" },
                                react_1.default.createElement("span", null, reword.item.name),
                                react_1.default.createElement("span", { className: reword.item.canTrade ? "green" : "red" }, reword.item.canTrade ? "거래가능" : "거래불가"),
                                react_1.default.createElement("span", null,
                                    reword.count,
                                    "ea"))))))))))))));
}
exports.default = Overflows;
