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
const classes_1 = require("../../classes");
const functions_1 = require("../../functions");
const Filters_1 = __importDefault(require("./Filters"));
const EvolutionTree_1 = __importDefault(require("./EvolutionTree"));
const evolutionDescriptionModal_1 = __importDefault(require("./evolutionDescriptionModal"));
const commons_1 = require("../../functions/commons");
function EvolutionSearcher() {
    const [selectedDigimon, setSelectedDigimon] = (0, react_1.useState)(null);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [position, setPosition] = (0, react_1.useState)({ top: 0, left: 0 });
    const [hideFoldButton, setHideFoldButton] = (0, react_1.useState)(false);
    const modalDigimon = (0, react_1.useRef)(null);
    const captureMouse = (event) => {
        var _a;
        const target = event.target;
        if ((target === null || target === void 0 ? void 0 : target.className) === "profile-image") {
            // const targetName = (target.nextElementSibling! as HTMLSpanElement).innerText;
            const targetName = target.dataset.id;
            if (targetName.includes("[돌연변이]")) {
                setPosition({ top: 0, left: 0 });
                setIsOpen(false);
                return;
            }
            if (targetName === selectedDigimon.name)
                modalDigimon.current = selectedDigimon;
            else if (targetName !== ((_a = modalDigimon.current) === null || _a === void 0 ? void 0 : _a.name)) {
                const digimon = classes_1.Evolution.getByName(targetName);
                if (!digimon || digimon.grade === 1)
                    return;
                (0, functions_1.getJustBeforeEvolution)(digimon);
                modalDigimon.current = digimon;
            }
            const mapRect = document.querySelector(".main").getBoundingClientRect();
            const modalHeight = modalDigimon.current.grade === 6 ? 396 :
                modalDigimon.current.grade === 5 && modalDigimon.current.befores[0].method === "일반" ? 236 :
                    modalDigimon.current.grade === 5 && modalDigimon.current.befores[0].method === "조그레스" ? 297 :
                        modalDigimon.current.grade === 4 ? 179 : 159;
            if (event.clientY + modalHeight >= window.innerHeight - 20) {
                setPosition({ top: window.innerHeight - modalHeight - mapRect.top - 20, left: event.pageX - mapRect.left + 2 });
            }
            else {
                setPosition({ top: event.clientY - mapRect.top, left: event.clientX - mapRect.left + 2 });
            }
            setIsOpen(true);
        }
        else if ((target === null || target === void 0 ? void 0 : target.id) === "revolution-description") {
        }
        else {
            setPosition({ top: 0, left: 0 });
            setIsOpen(false);
        }
    };
    const changeDigimon = (event) => {
        const target = event.target;
        let digimonName = "";
        if (target.className === "profile") {
            digimonName = target.querySelector(".profile-image").dataset.id;
        }
        else if (target.className === "profile-image") {
            digimonName = target.dataset.id;
        }
        else
            return;
        if (digimonName.includes("돌연변이"))
            return;
        const digimon = classes_1.Evolution.getByName(digimonName);
        if (digimon) {
            (0, functions_1.getEvolutions)(digimon);
            setSelectedDigimon(digimon);
            // window.scrollTo(0, 0);
            setPosition({ top: 0, left: 0 });
            setIsOpen(false);
        }
    };
    const reload = () => {
        setSelectedDigimon(Object.assign({}, selectedDigimon));
    };
    const foldAll = () => {
        (0, functions_1.toggleFoldEvolution)(selectedDigimon, true);
        reload();
    };
    const spreadAll = () => {
        (0, functions_1.toggleFoldEvolution)(selectedDigimon, false);
        reload();
    };
    const comboFilters = (0, react_1.useMemo)(() => {
        return react_1.default.createElement(Filters_1.default, { selectedDigimon: selectedDigimon, setSelectedDigimon: setSelectedDigimon, key: "digimon_filter" });
    }, [selectedDigimon]);
    // const searchBar = useMemo(() => {
    //     return <SearchBar setSelectedDigimon={setSelectedDigimon}/>
    // }, []);
    const evolution = (0, react_1.useMemo)(() => {
        return react_1.default.createElement(EvolutionTree_1.default, { selectedDigimon: selectedDigimon, reload: reload, key: (0, commons_1.getUUID)() });
    }, [selectedDigimon]);
    const inputs = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("div", { className: 'evolution-checkboxes' },
            react_1.default.createElement("div", { className: 'toggle-all-buttons' },
                react_1.default.createElement("button", { type: 'button', onClick: spreadAll, key: (0, commons_1.getUUID)() }, "\uBAA8\uB450 \uD3BC\uCE58\uAE30"),
                react_1.default.createElement("button", { type: 'button', onClick: foldAll, key: (0, commons_1.getUUID)() }, "\uBAA8\uB450 \uC811\uAE30")),
            react_1.default.createElement("label", { className: "check-box-container", htmlFor: 'hide-toggle-fold' },
                react_1.default.createElement("input", { type: 'checkbox', id: "hide-toggle-fold", checked: hideFoldButton, onChange: (e) => setHideFoldButton(e.target.checked) }),
                "\uC811\uAE30/\uD3BC\uCE58\uAE30 \uBC84\uD2BC \uC228\uAE30\uAE30"));
    }, [selectedDigimon, hideFoldButton]);
    return (react_1.default.createElement("div", { className: `main ${hideFoldButton ? "hide-fold-button" : ""}`, onMouseMove: captureMouse, onClick: changeDigimon },
        comboFilters,
        inputs,
        evolution,
        react_1.default.createElement(evolutionDescriptionModal_1.default, { isActive: isOpen, digimon: modalDigimon.current, position: position })));
}
exports.default = EvolutionSearcher;
