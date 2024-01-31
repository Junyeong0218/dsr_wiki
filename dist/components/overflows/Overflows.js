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
const commons_1 = require("../../functions/commons");
const OverflowShortcut_1 = __importDefault(require("./OverflowShortcut"));
const Stage_1 = __importDefault(require("./Stage"));
const MonsterDescriptionModal_1 = __importDefault(require("./MonsterDescriptionModal"));
function Overflows() {
    const all = (0, functions_1.getAllOverflows)();
    const [selected, setSelected] = (0, react_1.useState)(all[0]);
    const [modalPosition, setModalPosition] = (0, react_1.useState)({ top: 0, left: 0 });
    const [isOpenModal, setIsOpenModal] = (0, react_1.useState)(false);
    const selectedMonster = (0, react_1.useRef)(null);
    const captureMouse = (event) => {
        const target = event.target;
        if ((target === null || target === void 0 ? void 0 : target.tagName) === "IMG") {
            const classList = target.classList;
            if (classList.contains("stage-monster-image")) {
                const [stageId, index] = target.dataset.id.split("-").map(e => Number(e));
                const monster = selected.stages[stageId - 1].monsters[index];
                selectedMonster.current = monster;
                const mapRect = target.parentElement.parentElement.parentElement.parentElement.getBoundingClientRect();
                const modalHeight = 160;
                // console.log(event.pageY, modalHeight, "  ", window.innerHeight, mapRect)
                if (event.pageY + modalHeight >= window.innerHeight - 20) {
                    setModalPosition({ top: event.pageY - modalHeight - 10, left: event.pageX - mapRect.left + 10 });
                }
                else {
                    setModalPosition({ top: event.pageY - 90, left: event.pageX - mapRect.left + 10 });
                }
                setIsOpenModal(true);
                return;
            }
        }
        setIsOpenModal(false);
    };
    const mapSelector = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("div", { className: "map-selector" }, all.map(each => (react_1.default.createElement("button", { type: "button", className: `map-name-button ${selected.mapName === each.mapName ? "selected" : ""}`, onClick: () => setSelected(each), key: (0, commons_1.getUUID)() }, each.mapName))));
    }, [selected]);
    const overflowShortcut = (0, react_1.useMemo)(() => {
        return react_1.default.createElement(OverflowShortcut_1.default, { selected: selected });
    }, [selected]);
    const stages = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("div", { className: "stages" }, selected.stages.map(stage => (react_1.default.createElement(Stage_1.default, { stage: stage, key: (0, commons_1.getUUID)() }))));
    }, [selected]);
    const monsterDescriptionModal = (0, react_1.useMemo)(() => {
        return react_1.default.createElement(MonsterDescriptionModal_1.default, { isOpen: isOpenModal, monster: selectedMonster.current, position: modalPosition, key: (0, commons_1.getUUID)() });
    }, [modalPosition, isOpenModal, selectedMonster.current]);
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "overflow-container", onMouseMove: captureMouse },
            mapSelector,
            overflowShortcut,
            stages,
            monsterDescriptionModal)));
}
exports.default = Overflows;
