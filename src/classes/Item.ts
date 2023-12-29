export interface IItem {
    id: number,
    type: number,
    name: string,
    price: number,
    canTrade: boolean
}

export class Item {
    id: number;
    type: number;
    name: string;
    price: number;
    canTrade: boolean;
    
    constructor(raw: IItem) {
        this.id = raw.id;
        this.type = raw.type;
        this.name = raw.name;
        this.price = raw.price;
        this.canTrade = raw.canTrade;
    }
}