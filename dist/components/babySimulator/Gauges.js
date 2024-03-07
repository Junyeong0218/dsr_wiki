"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lodash_1 = require("lodash");
const commons_1 = require("../../functions/commons");
function Gauges({ gauges }) {
    return (react_1.default.createElement("div", { className: "gauges-container" },
        react_1.default.createElement("div", { className: "gauges" }, gauges.map((gauge, index) => {
            if (gauge.type === "NONE")
                return react_1.default.createElement("div", { className: "gauge", key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("img", { src: "/images/\uAD50\uC815_\uBE48\uCE78.png" }));
            if (gauge.type === "FAIL")
                return react_1.default.createElement("div", { className: `gauge`, key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("img", { src: "/images/\uAD50\uC815_\uC2E4\uD328.png" }));
            return react_1.default.createElement("div", { className: `gauge`, key: (0, commons_1.getUUID)() },
                react_1.default.createElement("span", null,
                    gauge.type,
                    " ",
                    (0, lodash_1.toInteger)(gauge.value),
                    "%"),
                react_1.default.createElement("img", { src: "/images/\uAD50\uC815_\uC131\uACF5.png" }));
        }))));
}
exports.default = Gauges;
