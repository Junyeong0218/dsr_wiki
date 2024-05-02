import { ITamerEquipmentSet, TamerEquipmentSet } from "../classes/TamerEquipment";
import data from "../json/tamerEquipmentSets.json";

type TamerEquipmentLogs = {
    rank: string,
    setName: string,
    part: string,
    type: string,
    mapNum: number,
    dropMap: string,
    dropMonster: string,
    option1Name: string,
    option1Value: number,
    option2Name: string,
    option2Value: number
}

const origin = new Array<TamerEquipmentSet>();

const loadSets = (): void => {
    if(origin.length === 0) {
        data.forEach((each: ITamerEquipmentSet) => {
            origin.push(new TamerEquipmentSet(each));
        });
    }
}

const getTamerEquipmentSets = (): Array<TamerEquipmentSet> => {
    loadSets();

    return origin;
}

const getSetBySetName = (setName: string) => {
    loadSets();

    return origin.find(equipment => equipment.setName === setName);
}

const getEquipmentByFullname = (fullName: string) => {
    const [setName, part] = fullName.split(" ");

    return origin.find(e => e.setName === setName)!.equipments.find(e => e.part === part);
}

const setAllRangeStandard = () => {
    loadSets();

    origin.forEach(set => {
        set.equipments.forEach(equipment => {
            equipment.normal.min = 1000;
            equipment.useful.min = 1000;
            equipment.intact.min = 1000;
            equipment.perfect.min = 1000;
            equipment.normal.max = -1;
            equipment.useful.max = -1;
            equipment.intact.max = -1;
            equipment.perfect.max = -1;
        });
    });
}

const setAllNotSetRangeToZero = () => {
    origin.forEach(set => {
        set.equipments.forEach(equipment => {
            if(equipment.normal.min === 1000) equipment.normal.min = 0;
            if(equipment.useful.min === 1000) equipment.useful.min = 0;
            if(equipment.intact.min === 1000) equipment.intact.min = 0;
            if(equipment.perfect.min === 1000) equipment.perfect.min = 0;
            if(equipment.normal.max === -1) equipment.normal.max = 0;
            if(equipment.useful.max === -1) equipment.useful.max = 0;
            if(equipment.intact.max === -1) equipment.intact.max = 0;
            if(equipment.perfect.max === -1) equipment.perfect.max = 0;
        });
    });
}

const applyRangeData = (logs: Array<TamerEquipmentLogs>) => {
    setAllRangeStandard();

    logs.forEach(log => {
        const equipment = getEquipmentByFullname(`${log.setName} ${log.part}`);

        if(equipment) {
            const min = Math.min(log.option1Value, log.option2Value);
            const max = Math.max(log.option1Value, log.option2Value);
            if(log.rank === "normal") {
                if(min < equipment.normal.min) equipment.normal.min = min;
                if(max > equipment.normal.max) equipment.normal.max = max;
            } else if(log.rank === "useful") {
                if(min < equipment.useful.min) equipment.useful.min = min;
                if(max > equipment.useful.max) equipment.useful.max = max;
            } else if(log.rank === "intact") {
                if(min < equipment.intact.min) equipment.intact.min = min;
                if(max > equipment.intact.max) equipment.intact.max = max;
            } else if(log.rank === "perfect") {
                if(min < equipment.perfect.min) equipment.perfect.min = min;
                if(max > equipment.perfect.max) equipment.perfect.max = max;
            }
        }
    });

    setAllNotSetRangeToZero();
}

export {
    TamerEquipmentLogs,

    getTamerEquipmentSets,
    getSetBySetName,
    getEquipmentByFullname,
    applyRangeData
}