"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const commons_1 = require("../../functions/commons");
function MapSelector({ maps, selectedMap, setMap }) {
    return (react_1.default.createElement("div", { className: "map-selector" }, maps.map(map => (react_1.default.createElement("button", { type: "button", className: `map-name-button ${(selectedMap === null || selectedMap === void 0 ? void 0 : selectedMap.id) === map.id ? "selected" : ""}`, onClick: () => setMap(map.id), key: (0, commons_1.getUUID)() }, map.name)))));
}
exports.default = MapSelector;
