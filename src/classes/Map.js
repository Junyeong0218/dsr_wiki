export default class Map {
    constructor(raw) {
        this.id = raw.id;
        this.name = raw.name;
        this.monsters = null;
        this.shop = null;
    }
}