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
const lodash_1 = require("lodash");
const commons_1 = require("../../functions/commons");
function Gauges({ gauges, mode, setMode, rerollEach, rerollPart }) {
    const [failed, setFailed] = (0, react_1.useState)(-1);
    const [parts, setParts] = (0, react_1.useState)([-1, -1]);
    const selectFailed = (event, index) => {
        const div = event.target;
        if (div.classList.contains("selectable") || div.classList.contains("selected")) {
            setFailed(index);
        }
    };
    const selectParts = (event, index) => {
        const div = event.target;
        if (div.classList.contains("selectable") || div.classList.contains("selected")) {
            let secondIndex = gauges.findIndex((gauge, i) => i > index && (gauge.type !== "NONE" && gauge.type !== "FAIL"));
            if (secondIndex === -1) {
                secondIndex = gauges.findIndex((gauge, i) => i < index && (gauge.type !== "NONE" && gauge.type !== "FAIL"));
            }
            if (secondIndex === -1)
                return;
            const newParts = [index, secondIndex];
            setParts(newParts);
        }
    };
    const submit = () => {
        if (!mode) {
            setMode(null);
            return;
        }
        if (mode === "failed" && failed !== -1) {
            rerollEach(failed);
            setFailed(-1);
            return;
        }
        if (mode === "part" && parts[0] !== -1 && parts[1] !== -1) {
            rerollPart(parts);
            setParts([-1, -1]);
            return;
        }
    };
    const cancel = () => {
        setFailed(-1);
        setParts([-1, -1]);
        setMode(null);
    };
    return (react_1.default.createElement("div", { className: "gauges-container" },
        mode === "failed" ?
            react_1.default.createElement("div", { className: "help-text" }, "\uC2E4\uD328\uD55C \uAD50\uC815\uC744 \uC120\uD0DD\uD558\uC138\uC694.") :
            mode === "part" ?
                react_1.default.createElement("div", { className: "help-text" }, "\uC5F0\uC18D\uD55C \uAD50\uC815 2\uAC1C\uB97C \uC120\uD0DD\uD558\uC138\uC694.") : "",
        react_1.default.createElement("div", { className: "gauges" }, gauges.map((gauge, index) => {
            if (gauge.type === "NONE")
                return react_1.default.createElement("div", { className: "gauge", key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("img", { src: "/images/\uAD50\uC815_\uBE48\uCE78.png" }));
            if (gauge.type === "FAIL")
                return react_1.default.createElement("div", { className: `gauge ${mode === "failed" ? index === failed ? "selected" : "selectable" : ""}`, onClick: (event) => selectFailed(event, index), key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("img", { src: "/images/\uAD50\uC815_\uC2E4\uD328.png" }));
            return react_1.default.createElement("div", { className: `gauge ${mode === "part" ? parts.includes(index) ? "selected" : "selectable" : ""}`, onClick: (event) => selectParts(event, index), key: (0, commons_1.getUUID)() },
                react_1.default.createElement("span", null,
                    gauge.type,
                    " ",
                    (0, lodash_1.toInteger)(gauge.value * 100),
                    "%"),
                react_1.default.createElement("img", { src: "/images/\uAD50\uC815_\uC131\uACF5.png" }));
        })),
        mode !== null &&
            react_1.default.createElement("div", { className: "buttons" },
                react_1.default.createElement("button", { type: "button", className: "submit-button", onClick: submit }, "\uC801\uC6A9"),
                react_1.default.createElement("button", { type: "button", className: "cancel-button", onClick: cancel }, "\uCDE8\uC18C"))));
}
exports.default = Gauges;
