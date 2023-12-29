"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(raw) {
        this.id = raw.id;
        this.type = raw.type;
        this.name = raw.name;
        this.price = raw.price;
        this.canTrade = raw.canTrade;
    }
}
exports.Item = Item;
