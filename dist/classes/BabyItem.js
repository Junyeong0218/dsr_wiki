"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BabyItem = void 0;
class BabyItem {
    constructor() {
        this.feeds = [];
        this.toys = [];
        this.addFeed = (feed) => this.feeds.push(feed);
        this.addToy = (toy) => this.toys.push(toy);
    }
}
exports.BabyItem = BabyItem;
