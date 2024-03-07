"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
class Map {
    constructor(raw) {
        this.id = raw.id;
        this.name = raw.name;
        this.category = raw.category;
        this.portals = null;
        this.warps = null;
        this.shops = null;
        this.monsters = null;
        this.cubes = null;
    }
}
exports.Map = Map;
