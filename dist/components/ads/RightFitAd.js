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
function RightFitAd() {
    const ad = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        var _a;
        const scr = (0, functions_1.createAdScript)();
        (_a = ad.current) === null || _a === void 0 ? void 0 : _a.appendChild(scr);
        return () => {
            const globalAdfit = window.adfit;
            if (globalAdfit)
                globalAdfit.destroy("DAN-EfclxRdL7MlO66g3");
        };
    }, []);
    return (react_1.default.createElement("div", { className: "ad-container", ref: ad },
        react_1.default.createElement("ins", { className: "kakao_ad_area", style: { display: "none" }, "data-ad-unit": "DAN-EfclxRdL7MlO66g3", "data-ad-width": "320", "data-ad-height": "100" })));
}
exports.default = RightFitAd;
