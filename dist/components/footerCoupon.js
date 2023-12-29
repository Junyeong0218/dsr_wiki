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
function FooterCoupon({ title, coupon }) {
    const [complete, setComplete] = (0, react_1.useState)("");
    const [copyText, setCopyText] = (0, react_1.useState)("복사하기");
    const copyToClipboard = () => {
        navigator.clipboard.writeText(coupon).then(() => {
            setComplete("complete");
            setCopyText("복사완료!");
            setTimeout(() => {
                setComplete("");
                setCopyText("복사하기");
            }, 2500);
        }).catch(error => {
            alert("복사에 실패했습니다.\n관리자에게 문의해주세요.");
        });
    };
    return (react_1.default.createElement("div", { className: "event" },
        react_1.default.createElement("span", { className: "title" }, title),
        react_1.default.createElement("span", { className: "description accent" },
            "\uCFE0\uD3F0\uBC88\uD638 : ",
            coupon),
        react_1.default.createElement("button", { type: "button", className: `copy-button ${complete}`, onClick: copyToClipboard }, copyText)));
}
exports.default = FooterCoupon;
