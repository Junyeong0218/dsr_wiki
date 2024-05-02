interface ITamerEquipmentSet {
    setName: string,
    equipments: Array<ITamerEquipment>
}

class TamerEquipmentSet {
    setName: string;
    equipments: Array<TamerEquipment> = [];

    constructor(raw: ITamerEquipmentSet) {
        this.setName = raw.setName;
        raw.equipments.forEach(e => this.equipments.push(new TamerEquipment(e)));
    }
}

interface ITamerEquipment {
    setName: string,
    part: string,
    reqTamerLevel: number,
    reqDigimonLevel: number,
    isReleased: boolean
}

class StatRange {
    min: number;
    max: number;

    constructor() {
        this.min = 0;
        this.max = 0;
    }
}

class TamerEquipment {
    setName: string;
    part: string;
    reqTamerLevel: number;
    reqDigimonLevel: number;
    isReleased: boolean;
    normal: StatRange = new StatRange();
    useful: StatRange = new StatRange();
    intact: StatRange = new StatRange();
    perfect: StatRange = new StatRange();

    constructor(raw: ITamerEquipment) {
        this.setName = raw.setName;
        this.part = raw.part;
        this.reqTamerLevel = raw.reqTamerLevel;
        this.reqDigimonLevel = raw.reqDigimonLevel;
        this.isReleased = raw.isReleased;
    }
}

export {
    ITamerEquipmentSet,
    ITamerEquipment,

    TamerEquipmentSet,
    TamerEquipment
}