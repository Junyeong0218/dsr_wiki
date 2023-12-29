import Point from "./Point";

export interface IShop {
    type: string,
    point: { x: number, y: number },
    items: Array<number>
}

export class Shop {
    type: string;
    point: Point;
    items: Array<number>;

    constructor(raw: IShop) {
        this.type = raw.type;
        this.point = new Point(raw.point.x, raw.point.y);
        this.items = raw.items;
    }
}