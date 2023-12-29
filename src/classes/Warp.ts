import Point from "./Point";

export interface IWarp {
    id: number,
    description: string,
    point: { x: number, y: number }
}

export class Warp {
    id: number;
    description: string;
    point: Point;

    constructor(raw: IWarp) {
        this.id = raw.id;
        this.description = raw.description;
        this.point = new Point(raw.point.x, raw.point.y);
    }
}