import Point from "./Point";

export interface ICube {
    id: number,
    point: { x: number, y: number }
}

export class Cube {
    id: number;
    point: Point;

    constructor(raw: ICube) {
        this.id = raw.id;
        this.point = new Point(raw.point.x, raw.point.y);
    }
}