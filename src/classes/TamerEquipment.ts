interface IEquipmentOption {
    name: string;
    minValue: number;
    maxValue: number;
}

interface ITamerEquipment {
    id: number;
    grade: string | null;
    name: string;
    part: string;
    type: string | null;
    reqTamerLevel: number;
    reqDigimonLevel: number;
    fullName: string;
    options: Array<IEquipmentOption>;
}

class TamerEquipment {
    id: number;
    grade: string | null;
    name: string;
    part: string;
    type: string | null;
    reqTamerLevel: number;
    reqDigimonLevel: number;
    fullName: string;
    options: Array<IEquipmentOption>;

    constructor(raw: ITamerEquipment) {
        this.id = raw.id;
        this.grade = raw.grade;
        this.name = raw.name;
        this.part = raw.part;
        this.type = raw.type;
        this.reqTamerLevel = raw.reqTamerLevel;
        this.reqDigimonLevel = raw.reqDigimonLevel;
        this.fullName = raw.fullName;
        this.options = raw.options;
    }
}

interface IStatusOption {
    name: string;
    value: number;
}

interface ITamerEquipmentSet {
    id: number;
    setName: string;
    status: Array<Array<IStatusOption>>
    items: Array<number>
}

class TamerEquipmentSet {
    id: number;
    setName: string;
    status: Array<Array<IStatusOption>>
    items: Array<number>

    constructor(raw: ITamerEquipmentSet) {
        this.id = raw.id;
        this.setName = raw.setName;
        this.status = raw.status;
        this.items = raw.items;
    }
}

export {
    ITamerEquipmentSet,
    ITamerEquipment,

    TamerEquipmentSet,
    TamerEquipment
}