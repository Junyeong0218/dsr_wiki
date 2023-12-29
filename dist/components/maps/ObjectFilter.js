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
const Checkbox_1 = __importDefault(require("./Checkbox"));
const MonsterCheckboxes_1 = __importDefault(require("./MonsterCheckboxes"));
function ObjectFilter({ portal, setPortal, warp, setWarp, shop, setShop, itemCheckFlags, setItemCheckFlags, items, cube, setCube }) {
    const filter = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("div", { className: "object-filter" },
            react_1.default.createElement(Checkbox_1.default, { id: "portal", text: "포탈", checked: portal, setChecked: setPortal }),
            react_1.default.createElement(Checkbox_1.default, { id: "warp", text: "워프 포인트", checked: warp, setChecked: setWarp }),
            react_1.default.createElement(Checkbox_1.default, { id: "shop", text: "상점", checked: shop, setChecked: setShop }),
            react_1.default.createElement(MonsterCheckboxes_1.default, { itemCheckFlags: itemCheckFlags, setItemCheckFlags: setItemCheckFlags, items: items }),
            react_1.default.createElement(Checkbox_1.default, { id: "cube", text: "데뀨", checked: cube, setChecked: setCube }));
    }, [portal, warp, shop, itemCheckFlags, items, cube]);
    return filter;
}
exports.default = ObjectFilter;
