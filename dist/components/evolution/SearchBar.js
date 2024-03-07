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
function SearchBar({ setSelectedDigimon }) {
    const [isFocus, setIsFocus] = (0, react_1.useState)(false);
    const searchBar = (0, react_1.useRef)(null);
    const textInputRef = (0, react_1.useRef)(null);
    const searchListTag = (0, react_1.useRef)(null);
    const moveFocusToButton = (event) => {
        const key = event.keyCode;
        if (key === 40) {
            const buttons = searchListTag.current.children;
            if (buttons.length > 0) {
                event.preventDefault();
                buttons[0].focus();
            }
        }
    };
    // const moveFocusInList = (event: React.KeyboardEvent, digimonName: string) => {
    //     event.preventDefault();
    //     const key = event.keyCode;
    //     if(key === 13) {
    //         selectDigimon(event, digimonName);
    //         return;
    //     }
    //     const buttons = searchListTag.current!.children;
    //     let currentIndex = -1;
    //     for(let i = 0; i < buttons.length; i++) {
    //         if(buttons[i].id === (event.target as HTMLElement).id) {
    //             currentIndex = i;
    //             break;
    //         }
    //     }
    //     if(currentIndex === -1) return;
    //     if(key === 38) {
    //         if(currentIndex === 0) {
    //             textInputRef.current!.focus();
    //         } else if(currentIndex > 0) {
    //             (buttons[currentIndex - 1] as HTMLButtonElement).focus();
    //         }
    //     } else if(key === 40 && currentIndex < buttons.length - 1) {
    //         (buttons[currentIndex + 1] as HTMLButtonElement).focus();
    //     }
    // }
    const updateFocus = (event) => {
        var _a;
        if (event.type === "focus") {
            setIsFocus(true);
        }
        else if (event.type === "blur") {
            if (((_a = event.relatedTarget) === null || _a === void 0 ? void 0 : _a.className) !== "searched-item") {
                setIsFocus(false);
            }
        }
    };
    const moveFocusToInput = (event) => {
        textInputRef.current.focus();
    };
    const selectDigimon = (event, digimonName) => {
        const evolution = (0, functions_1.getEvolutionByName)(digimonName);
        setIsFocus(false);
        (0, functions_1.getEvolutions)(evolution);
        setSelectedDigimon(evolution);
    };
    // const searchList = useMemo(() => {
    //     return <div ref={searchListTag} className={`search-list ${isFocus ? "active" : ""}`}>
    //             { searched.length > 0 && searched.map(digimon => (
    //                 <button type="button" className="searched-item"
    //                         onClick={(event) => {selectDigimon(event, digimon.name)}}
    //                         onKeyDown={(event) => moveFocusInList(event, digimon.name)}
    //                         id={digimon.name}
    //                         key={getUUID()}>
    //                     <img src={`/images/${digimon.name}.png`} />
    //                     <span dangerouslySetInnerHTML={{__html: digimon.tag}}></span>
    //                 </button>
    //             ))}
    //         </div>;
    // }, [searched, text, isFocus])
    return (react_1.default.createElement("div", { ref: searchBar, className: "search-bar", onFocus: updateFocus, onBlur: updateFocus },
        react_1.default.createElement("button", { type: "button", className: "search-image", onClick: moveFocusToInput },
            react_1.default.createElement("img", { src: "/images/magnifying-glass.png" }))));
}
exports.default = SearchBar;
