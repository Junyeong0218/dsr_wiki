"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
const WeekdayFunctions_1 = require("../../functions/WeekdayFunctions");
function OverflowShortcut({ selected }) {
    return (react_1.default.createElement("div", { className: "overflow-shortcut" },
        react_1.default.createElement("div", { className: "map-viewer-small" },
            react_1.default.createElement("img", { src: `/images/${selected.mapName}.png` }),
            react_1.default.createElement("img", { src: "/images/\uC624\uBC84\uD50C\uB85C\uC6B0 \uB358\uC804.png", className: "point", style: { top: `${selected.point.y}px`, left: `${selected.point.x}px` } })),
        react_1.default.createElement("div", { className: "overflow-shortcut-infos" },
            react_1.default.createElement("span", { className: "title" },
                selected.mapName,
                " \uC624\uBC84\uD50C\uB85C\uC6B0 \uB358\uC804 \uC815\uBCF4"),
            react_1.default.createElement("span", { className: "semi-title" },
                react_1.default.createElement("img", { src: "/images/overflow semi title icon.png" }),
                "\uD544\uC694 \uC544\uC774\uD15C"),
            react_1.default.createElement("div", { className: "overflow-req-item" },
                react_1.default.createElement("img", { src: `/images/${encodeURIComponent((0, commons_1.getNameExceptColon)(selected.reqItem.name))}.png` }),
                react_1.default.createElement("span", null, selected.reqItem.name)),
            react_1.default.createElement("span", { className: "semi-title" },
                react_1.default.createElement("img", { src: "/images/overflow semi title icon.png" }),
                "\uD50C\uB808\uC774 \uAC00\uB2A5 \uC694\uC77C"),
            react_1.default.createElement("div", { className: "weekdays" }, selected.weekdays.map(weekday => {
                const weekdayText = (0, WeekdayFunctions_1.getWeekdayText)(weekday);
                const todayFlag = (0, WeekdayFunctions_1.isToday)(weekday);
                return react_1.default.createElement("div", { className: `weekday ${todayFlag ? "today" : ""}`, key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("span", { className: todayFlag ? "today" : "" }, weekdayText),
                    todayFlag ? react_1.default.createElement("img", { src: "/images/green dot.png" }) : "");
            })))));
}
exports.default = OverflowShortcut;
