import Point from "./Point";

export interface IPortal {
    to: number,
    description: string,
    point: { x: number, y: number }
}

export class Portal {
    to: number;
    description: string;
    point: Point;

    constructor(raw: IPortal) {
        this.to = raw.to;
        this.description = raw.description;
        this.point = new Point(raw.point.x, raw.point.y);
    }
}