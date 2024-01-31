"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overflow = exports.Stage = exports.RewordItem = void 0;
const Point_1 = __importDefault(require("./Point"));
class RewordItem {
    constructor(item, count) {
        this.item = item;
        this.count = count;
    }
}
exports.RewordItem = RewordItem;
class Stage {
    constructor(raw, items) {
        this.id = raw.stage;
        this.monsters = raw.monsters;
        this.firstRewords = raw.firstRewords.map(reword => {
            const item = items.find(item => item.id === reword.itemId);
            return new RewordItem(item, reword.count);
        });
        this.repeatRewords = raw.repeatRewords.map(reword => {
            const item = items.find(item => item.id === reword.itemId);
            return new RewordItem(item, reword.count);
        });
    }
}
exports.Stage = Stage;
class Overflow {
    constructor(raw) {
        this.addStage = (stage) => this.stages.push(stage);
        this.mapName = raw.mapName;
        this.reqItem = raw.reqItem;
        this.weekdays = raw.weekdays;
        this.point = new Point_1.default(raw.point.x, raw.point.y);
        this.stages = [];
    }
}
exports.Overflow = Overflow;
