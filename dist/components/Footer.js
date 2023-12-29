"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const footerCoupon_1 = __importDefault(require("./footerCoupon"));
function Footer() {
    const coupons = ["2023XMAS", "ADIEU2023"];
    return (react_1.default.createElement("div", { className: "footer" },
        react_1.default.createElement("div", { className: "descriptions" },
            react_1.default.createElement("span", { className: "description" }, "\uAC1C\uC778\uC774 \uB9CC\uB4E0 \uD648\uD398\uC774\uC9C0\uB85C \uAC8C\uC784\uC0AC\uC640 \uBB34\uAD00\uD569\uB2C8\uB2E4."),
            react_1.default.createElement("span", { className: "description" },
                "\uC624\uB958, \uAC1C\uC120 \uB4F1 \uBB38\uC758\uB294 \uCE74\uD398 \uB313\uAE00 \uD639\uC740 ",
                react_1.default.createElement("img", { src: "/images/discord.png" }),
                " \uB514\uC2A4\uCF54\uB4DC hippo2003\uC73C\uB85C \uC5F0\uB77D\uBC14\uB78D\uB2C8\uB2E4.")),
        react_1.default.createElement("div", { className: "events" },
            react_1.default.createElement(footerCoupon_1.default, { title: "\uD06C\uB9AC\uC2A4\uB9C8\uC2A4 \uCFE0\uD3F0", coupon: coupons[0] }),
            react_1.default.createElement(footerCoupon_1.default, { title: "\uC5F0\uB9D0 \uCFE0\uD3F0", coupon: coupons[1] }))));
}
exports.default = Footer;
