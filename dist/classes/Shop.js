"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const Point_1 = __importDefault(require("./Point"));
class Shop {
    constructor(raw) {
        this.type = raw.type;
        this.point = new Point_1.default(raw.point.x, raw.point.y);
        this.items = raw.items;
    }
}
exports.Shop = Shop;
