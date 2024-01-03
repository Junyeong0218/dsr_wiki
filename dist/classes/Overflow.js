"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overflow = exports.Stage = void 0;
class Stage {
    constructor(raw) {
        this.id = raw.id;
        this.monsters = raw.monsters;
        this.firstRewords = raw.firstRewords;
        this.repeatRewords = raw.repeatRewords;
    }
}
exports.Stage = Stage;
class Overflow {
    constructor(raw) {
        this.mapName = raw.mapName;
        this.reqItem = raw.reqItem;
        this.playableWeekdays = raw.playableWeekdays;
        this.stages = raw.stages;
    }
}
exports.Overflow = Overflow;
