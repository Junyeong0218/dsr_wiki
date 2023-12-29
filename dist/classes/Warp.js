"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warp = void 0;
const Point_1 = __importDefault(require("./Point"));
class Warp {
    constructor(raw) {
        this.id = raw.id;
        this.description = raw.description;
        this.point = new Point_1.default(raw.point.x, raw.point.y);
    }
}
exports.Warp = Warp;
