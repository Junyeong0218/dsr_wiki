"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monster = void 0;
const Point_1 = __importDefault(require("./Point"));
class Monster {
    constructor(raw) {
        this.id = raw.id;
        this.name = raw.name;
        this.digimonType = raw.digimonType;
        this.level = raw.level;
        this.hp = raw.hp;
        this.point = new Point_1.default(raw.point.x, raw.point.y);
        this.dropItems = raw.dropItems;
    }
}
exports.Monster = Monster;
