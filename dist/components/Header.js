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
const react_router_dom_1 = require("react-router-dom");
function Header() {
    const HEADER_ORIGIN = "header";
    const shadowList = ["baby1-1", "baby1-2", "baby2-1", "baby2-2", "child1", "child2", "adult1", "adult2", "perfect1", "perfect2", ""];
    const [headerClassName, setHeaderClassName] = (0, react_1.useState)(HEADER_ORIGIN);
    (0, react_1.useEffect)(() => {
        let dial = 0;
        const autoShadow = setInterval(() => {
            setHeaderClassName(`${HEADER_ORIGIN} ${shadowList[dial++]}`);
            if (dial > 10)
                dial = 0;
        }, 2000);
    }, []);
    return (react_1.default.createElement("div", { className: headerClassName },
        react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "to-main-logo" },
            react_1.default.createElement("img", { src: "/images/logo.png" })),
        react_1.default.createElement("nav", null,
            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "text-nav" }, "\uD648"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/evolutions", className: "text-nav" }, "\uC9C4\uD654\uD2B8\uB9AC"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/maps", className: "text-nav" }, "\uB9F5\uC2A4"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/overflows", className: "text-nav" }, "\uC624\uBC84\uD50C\uB85C\uC6B0 \uB358\uC804"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/detectors", className: "text-nav" }, "\uD0D0\uC9C0\uAE30"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/combinations", className: "text-nav" }, "\uC870\uD569\uBC95"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/digidex", className: "text-nav" }, "\uB514\uC9C0\uBAAC \uB3C4\uAC10"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "https://www.digimonsuperrumble.com", target: "_blank", className: "text-nav" }, "\uACF5\uC2DD \uD648\uD398\uC774\uC9C0"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "https://cafe.naver.com/movedsr", target: "_blank", className: "text-nav" }, "\uB124\uC774\uBC84 \uACF5\uC2DD \uCE74\uD398"))));
}
exports.default = Header;
