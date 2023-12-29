"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Profile({ digimon, align = null }) {
    const alignStyle = !align ? {} : align === "end" ? { alignSelf: "flex-end" } :
        { alignSelf: "flex-start" };
    const fileName = digimon.name.includes("[돌연변이]") ? digimon.name.replace("[돌연변이]", "") :
        digimon.name;
    if (!digimon.name.includes("돌연변이"))
        alignStyle['cursor'] = "pointer";
    return (react_1.default.createElement("div", { className: "profile", style: alignStyle },
        react_1.default.createElement("img", { className: "profile-image", src: `/images/${fileName}.png` }),
        react_1.default.createElement("span", null, digimon.name),
        digimon.grade > 2 &&
            react_1.default.createElement("img", { className: "profile-digimon-type", src: `/images/${digimon.digimonType}.png` })));
}
exports.default = Profile;
