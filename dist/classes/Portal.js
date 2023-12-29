"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = void 0;
const Point_1 = __importDefault(require("./Point"));
class Portal {
    constructor(raw) {
        this.to = raw.to;
        this.description = raw.description;
        this.point = new Point_1.default(raw.point.x, raw.point.y);
    }
}
exports.Portal = Portal;
