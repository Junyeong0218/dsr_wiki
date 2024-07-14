import { ITamerEquipmentSet, TamerEquipmentSet } from "../classes/TamerEquipment";
import data from "../json/tamerEquipmentSets.json";

const origin = new Array<ITamerEquipmentSet>();

const loadSets = (): void => {
    if(origin.length === 0) {
        data.forEach((each: ITamerEquipmentSet) => {
            origin.push(new TamerEquipmentSet(each));
        });
    }
}

const getTamerEquipmentSets = (): Array<ITamerEquipmentSet> => {
    loadSets();

    return origin;
}

export {
    getTamerEquipmentSets
}