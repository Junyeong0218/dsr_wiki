export default class Item {
    constructor(raw) {
        this.id = raw.id;
        this.type = raw.type;
        this.name = raw.name;
        this.price = raw.price;
        this.canTrade = raw.canTrade;
    }
}