export interface IExperience {
    level: number;
    exp: number;
}

export class Experience {
    level: number;
    exp: number;
    acc: number;

    constructor(raw: IExperience, lastAcc: number) {
        this.level = raw.level;
        this.exp = raw.exp;
        this.acc = lastAcc + raw.exp;
    }
}