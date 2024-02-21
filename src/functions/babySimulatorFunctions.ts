import { Evolution, Item } from "../classes";
import { BabyItem, IFeed, IToy } from "../classes/BabyItem";
import data from "../json/babyItems.json";
import { getAllEvolutions, getEvolutionByName } from "./getEvolutionFunctions";

type Gauge = {
    type: string,
    value: number
}

type Case = {
    type: string,
    count: number
}

type Log = {
    type: string,
    item?: IFeed|IToy,
    text?: string,
    dateText: string
}

interface IWeighted {
    [key:string]: number

    "HP": number,
    "SP": number,
    "STR": number,
    "INT": number,
    "DEF": number,
    "RES": number,
    "SPD": number
}

interface IBabyStatus {
    "digimon": Evolution
    "stature": number,
    "fullness": number,
    "satisfaction": number,
    "weighted": IWeighted,
    "adjustments": Array<Gauge>
}

const origin = new BabyItem();

const successCellRange = [ 12, 25, 38, 51, 64, 77, 90, 100 ];
const statPercent: { [key:number]: number } = {
    1: 0.1,
    2: 0.35,
    3: 0.35,
    4: 0.2
}

const loadBabyItems = () => {
    if(origin.feeds.length === data.feeds.length && origin.toys.length === data.toys.length) return;

    data.feeds.forEach(feed => {
        origin.addFeed(feed);
    });
    data.toys.forEach(toy => {
        origin.addToy(toy);
    });
}

const getRandomNumber = (digit: number) => Math.round(Math.random() * digit);

const createTable = (cases: Array<Case>) => {
    let counts = cases.map(e => e.count).reduce((p, c) => p + c);
    const array = new Array<string>();

    for(let i = 0; i < counts; i++) {
        let index = -1;

        findIndex:
        while(index === -1) {
            const temp = getRandomNumber(cases.length - 1);
            
            if(cases[temp].count > 0) {
                index = temp;
                break findIndex;
            }
        }

        array.push(cases[index].type);
        cases[index].count--;
    }

    return { table: array, counts };
}

const getBabyItems = () => {
    loadBabyItems();

    return origin;
}

const getDefaultBabyStatus = (digimon: Evolution): IBabyStatus => {
    return {
        digimon,
        stature: 0,
        fullness: 50,
        satisfaction: 0,
        weighted: {
            HP: 5,
            SP: 5,
            STR: 5,
            INT: 5,
            DEF: 5,
            RES: 5,
            SPD: 5
        },
        adjustments: []
    }
}

const hatch = (egg: Item) => {
    const type = egg.name.split(" ")[0];
    if(!type.includes("유년기")) {
        const digimon = getEvolutionByName(type)!;

        return getDefaultBabyStatus(digimon);
    }

    const specials = [ "도도몬", "쟈리몬", "제리몬", "치코몬", "키몬", "도리몬", "기기몬", "구미몬", "꼬마몬", "야몬" ];
    const all = getAllEvolutions(false).filter(each => each.grade <= 2);
    if(type === "유년기1") {
        const baby1s = all.filter(each => each.grade === 1 && !specials.includes(each.name));
        const cases: Array<Case> = [];
        baby1s.forEach(baby => {
            cases.push({
                type: baby.name,
                count: 1_000
            });
        });

        const { table, counts } = createTable(cases);
        const index = getRandomNumber(counts);
        const selected = table[index];

        const digimon = baby1s.find(each => each.name === selected)!;

        return getDefaultBabyStatus(digimon);
    }

    const baby2s = all.filter(each => each.grade === 2 && !specials.includes(each.name));
    const cases: Array<Case> = [];
    baby2s.forEach(baby => {
        cases.push({
            type: baby.name,
            count: 1_000
        });
    });

    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);
    const selected = table[index];

    const digimon = baby2s.find(each => each.name === selected)!;

    return getDefaultBabyStatus(digimon);
}

const getFullnessState = (status: IBabyStatus) => {
    if(status.fullness < 21) return "위험🥵";
    if(status.fullness < 96) return "배고픔😰";
    if(status.fullness < 215) return "보통👍";
    return "배부름😖";
}

const getStatCounts = (status: IBabyStatus) => {
    for(let i = 0; i < successCellRange.length; i++) {
        if(status.satisfaction <= successCellRange[i])
            return i;
    }
    
    return 0;
}

const pass90Min = (status: IBabyStatus, dateText: string): Log => {
    const log = {
        type: "90time",
        text: "",
        dateText
    }

    if(status.fullness < 21) {
        status.fullness--;

        log.text = "포만지수 1 감소";
    } else if(status.fullness < 96) {
        status.fullness -= 2;

        log.text = "포만지수 2 감소";
    } else if(status.fullness < 215) {
        status.fullness -= 3;
        status.satisfaction++;

        log.text = "포만지수 3 감소, 만족도 1 증가";
    } else {
        status.fullness -= 4;

        log.text = "포만지수 4 감소";
    }

    return log;
}

const passOneDay = (status: IBabyStatus, dateText: string): Array<Log> => {
    const logs: Array<Log> = [];

    for(let i = 0; i < 16; i++) {
        const log = pass90Min(status, dateText);
        logs.splice(0, 0, log);
    }

    return logs;
}

const canFeed = (status: IBabyStatus): boolean => {
    return status.fullness < 215;
}

const feed = (status: IBabyStatus, food: IFeed): boolean => {
    if(!canFeed(status)) return false;

    status.fullness += food.fullness;
    food.effects.forEach(effect => {
        status.weighted[effect.name] += effect.value;
    });

    return true;
}

const play = (status: IBabyStatus, toy: IToy): boolean => {
    if(status.fullness <= 10) return false;

    status.fullness -= toy.fullness;

    status.satisfaction += toy.satisfaction;
    if(status.satisfaction > 100) status.satisfaction = 100;
    
    status.stature += toy.stature;
    if(status.stature > 100) status.stature = 100;

    return true;
}

const evolve = (status: IBabyStatus) => {
    if(status.stature < 100) return;

    const afters = status.digimon.afters;
    const cases: Array<Case> = [];
    afters?.forEach(after => {
        cases.push({
            type: after.digimon!.name,
            count: after.rate * 50_000
        });
    });

    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);

    const digimonName = table[index];

    status.digimon = getEvolutionByName(digimonName)!;
    status.stature = 0;

    if(status.digimon.grade === 2) return status;

    const statCounts = getStatCounts(status);
    for(let i = 0; i < statCounts; i++) {
        const cases: Array<Case> = [];
        Object.keys(status.weighted).forEach(statName => {
            const selectedAds = status.adjustments.filter(each => each.type === statName);
            if(selectedAds.length < 2) {
                cases.push({
                    type: statName,
                    count: status.weighted[statName] * 50_000
                });
            } else {
                const reduced = selectedAds
                                .reduce((a, b) => {
                                    return { type: a.type, value: a.value + b.value }
                                });
                if(reduced.value < 14)
                    cases.push({
                        type: statName,
                        count: status.weighted[statName] * 50_000
                    });
            }
        });

        const statObj = createTable(cases);
        const statIndex = getRandomNumber(statObj.counts);
        const selectedStat = statObj.table[statIndex];

        const statValueCases: Array<Case> = [];
        const selectedAds = status.adjustments.filter(each => each.type === selectedStat);
        let sum = 0;
        selectedAds.forEach(each => {
            sum += each.value;
        });

        const sub = 14 - sum;
        Object.keys(statPercent).forEach(statValue => {
            if(Number(statValue) <= sub)
                statValueCases.push({
                    type: statValue,
                    count: statPercent[Number(statValue)] * 50_000
                });
        });

        const valueObj = createTable(statValueCases);
        const valueIndex = getRandomNumber(valueObj.counts);
        const selectedValue = valueObj.table[valueIndex];

        status.adjustments.push({
            type: selectedStat,
            value: Number(selectedValue)
        });
    }

    for(let i = 0; i < 7-statCounts; i++) {
        status.adjustments.push({ type: "FAIL", value: 0 });
    }

    return status;
}

export {
    IBabyStatus,
    IWeighted,
    successCellRange,

    getBabyItems,
    getDefaultBabyStatus,
    hatch,

    getFullnessState,
    pass90Min,
    passOneDay,
    feed,
    play,
    evolve
}