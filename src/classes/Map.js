export default class Map {
    constructor(raw) {
        this.id = raw.id;
        this.name = raw.name;
        this.portals = null;
        this.warps = null;
        this.shops = null;
        this.monsters = null;
        this.cubes = null;
    }
}