"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function NotFound() {
    const notFoundStyle = { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", alignItems: "center" };
    return (react_1.default.createElement("div", { style: notFoundStyle },
        react_1.default.createElement("span", null, "\uC798\uBABB\uB41C \uD398\uC774\uC9C0\uC785\uB2C8\uB2E4.")));
}
exports.default = NotFound;
