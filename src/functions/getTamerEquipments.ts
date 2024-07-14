import { ITamerEquipment, TamerEquipment } from "../classes/TamerEquipment";
import data from "../json/tamerEquipments.json";

const origin = new Array<TamerEquipment>();

const loadEquipments = (): void => {
    if(origin.length === 0) {
        data.forEach((each: ITamerEquipment) => {
            origin.push(new TamerEquipment(each));
        });
    }
}

const getTamerEquipments = (): Array<TamerEquipment> => {
    loadEquipments();

    return origin;
}

const getEquipmentByFullname = (fullName: string) => {
    return origin.find(e => e.fullName === fullName);
}

export {
    getTamerEquipments,

    getEquipmentByFullname
}