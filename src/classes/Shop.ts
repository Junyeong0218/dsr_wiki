import Point from "./Point";

export interface IShopItem {
    shopId: number;
    name: string;
    price: number;
    currency: string;
    limitPeriod: string | null;
    limitCount: number | null;
}

export interface IShop {
    type: string,
    point: { x: number, y: number },
    items: Array<IShopItem>
}

export class Shop {
    type: string;
    point: Point;
    items: Array<IShopItem>;

    constructor(raw: IShop) {
        this.type = raw.type;
        this.point = new Point(raw.point.x, raw.point.y);
        this.items = raw.items;
    }
}