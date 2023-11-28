export default class Monster {
    constructor(raw) {
        this.level = raw.level;
        this.name = raw.name;
        this.digimonType = raw.digimonType;
        this.hp = raw.hp;
        this.dropItems = raw.dropItems;
        this.point = raw.point;
    }
}