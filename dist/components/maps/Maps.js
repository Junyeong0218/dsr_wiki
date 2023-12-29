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
const functions_1 = require("../../functions");
const mapSelector_1 = __importDefault(require("./mapSelector"));
const MapViewer_1 = __importDefault(require("./MapViewer"));
const enums_1 = require("../../enums");
function Maps() {
    const [maps, setMaps] = (0, react_1.useState)((0, functions_1.getMaps)());
    const [selectedMap, setSelectedMap] = (0, react_1.useState)((0, functions_1.getMaps)()[0]);
    const initLocalStorageFold = () => {
        Object.values(enums_1.ItemType).forEach(value => {
            if (!localStorage.getItem(`${value}_isFold`))
                localStorage.setItem(`${value}_isFold`, "true");
        });
    };
    const setMap = (id) => {
        const map = maps.find(map => map.id === id) || null;
        if (map)
            setSelectedMap(map);
    };
    initLocalStorageFold();
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "maps" },
            react_1.default.createElement(mapSelector_1.default, { maps: maps, selectedMap: selectedMap, setMap: setMap }),
            react_1.default.createElement(MapViewer_1.default, { map: selectedMap }))));
}
exports.default = Maps;
