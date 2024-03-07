"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Preparing_1 = __importDefault(require("../../Preparing"));
function Detectors() {
    return react_1.default.createElement(Preparing_1.default, null);
    // return (
    //     <div className="detectors-contaier">
    //         탐지기 조회 페이지
    //         {/* detectors list - row buttons */}
    //         {/* map image shortcut and monster point */}
    //         {/* monsters - only chuumon is 3 mobs, others is 1 mob && each detector has 2 different spicies of monsters */}
    //         {/* monster - image shortcut + name + type + hp + str&week */}
    //         {/* common rewords */}
    //         {/* monster specific rewords */}
    //     </div>
    // );
}
exports.default = Detectors;
