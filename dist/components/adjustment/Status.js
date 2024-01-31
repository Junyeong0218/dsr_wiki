"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Status({ gauges }) {
    let hp = 0;
    let sp = 0;
    let str = 0;
    let int = 0;
    let def = 0;
    let res = 0;
    let spd = 0;
    gauges.forEach(gauge => {
        switch (gauge.type) {
            case "최대 HP": {
                hp += gauge.value * 100;
                return;
            }
            case "최대 SP": {
                sp += gauge.value * 100;
                return;
            }
            case "힘": {
                str += gauge.value * 100;
                return;
            }
            case "지능": {
                int += gauge.value * 100;
                return;
            }
            case "수비": {
                def += gauge.value * 100;
                return;
            }
            case "저항": {
                res += gauge.value * 100;
                return;
            }
            case "속도": {
                spd += gauge.value * 100;
                return;
            }
        }
    });
    return (react_1.default.createElement("div", { className: "stat-container" },
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "title" }, "\uCD5C\uB300 HP :"),
            react_1.default.createElement("span", { className: `value ${hp > 0 ? "active" : ""}` },
                "+ ",
                hp,
                "%")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "title" }, "\uCD5C\uB300 SP :"),
            react_1.default.createElement("span", { className: `value ${sp > 0 ? "active" : ""}` },
                "+ ",
                sp,
                "%")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "title" }, "\uD798 :"),
            react_1.default.createElement("span", { className: `value ${str > 0 ? "active" : ""}` },
                "+ ",
                str,
                "%")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "title" }, "\uC9C0\uB2A5 :"),
            react_1.default.createElement("span", { className: `value ${int > 0 ? "active" : ""}` },
                "+ ",
                int,
                "%")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "title" }, "\uC218\uBE44 :"),
            react_1.default.createElement("span", { className: `value ${def > 0 ? "active" : ""}` },
                "+ ",
                def,
                "%")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "title" }, "\uC800\uD56D :"),
            react_1.default.createElement("span", { className: `value ${res > 0 ? "active" : ""}` },
                "+ ",
                res,
                "%")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "title" }, "\uC18D\uB3C4 :"),
            react_1.default.createElement("span", { className: `value ${spd > 0 ? "active" : ""}` },
                "+ ",
                spd,
                "%"))));
}
exports.default = Status;
