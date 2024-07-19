export interface IFieldType {
    type: string;
    stat: string;
    increments: Array<number>;
}

export class FieldType {
    type: string;
    stat: string;
    increments: Array<number>;

    constructor(raw: IFieldType) {
        this.type = raw.type;
        this.stat = raw.stat;
        this.increments = raw.increments;
    }
}