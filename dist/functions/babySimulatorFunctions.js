"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evolve = exports.play = exports.feed = exports.passOneDay = exports.pass90Min = exports.getFullnessState = exports.hatch = exports.getDefaultBabyStatus = exports.getBabyItems = exports.successCellRange = void 0;
const BabyItem_1 = require("../classes/BabyItem");
const babyItems_json_1 = __importDefault(require("../json/babyItems.json"));
const getEvolutionFunctions_1 = require("./getEvolutionFunctions");
const origin = new BabyItem_1.BabyItem();
const successCellRange = [12, 25, 38, 51, 64, 77, 90, 100];
exports.successCellRange = successCellRange;
const statPercent = {
    1: 0.1,
    2: 0.35,
    3: 0.35,
    4: 0.2
};
const loadBabyItems = () => {
    if (origin.feeds.length === babyItems_json_1.default.feeds.length && origin.toys.length === babyItems_json_1.default.toys.length)
        return;
    babyItems_json_1.default.feeds.forEach(feed => {
        origin.addFeed(feed);
    });
    babyItems_json_1.default.toys.forEach(toy => {
        origin.addToy(toy);
    });
};
const getRandomNumber = (digit) => Math.round(Math.random() * digit);
const createTable = (cases) => {
    let counts = cases.map(e => e.count).reduce((p, c) => p + c);
    const array = new Array();
    for (let i = 0; i < counts; i++) {
        let index = -1;
        findIndex: while (index === -1) {
            const temp = getRandomNumber(cases.length - 1);
            if (cases[temp].count > 0) {
                index = temp;
                break findIndex;
            }
        }
        array.push(cases[index].type);
        cases[index].count--;
    }
    return { table: array, counts };
};
const getBabyItems = () => {
    loadBabyItems();
    return origin;
};
exports.getBabyItems = getBabyItems;
const getDefaultBabyStatus = (digimon) => {
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
    };
};
exports.getDefaultBabyStatus = getDefaultBabyStatus;
const hatch = (egg) => {
    const type = egg.name.split(" ")[0];
    if (!type.includes("유년기")) {
        const digimon = (0, getEvolutionFunctions_1.getEvolutionByName)(type);
        return getDefaultBabyStatus(digimon);
    }
    const specials = ["도도몬", "쟈리몬", "제리몬", "치코몬", "키몬", "도리몬", "기기몬", "구미몬", "꼬마몬", "야몬"];
    const all = (0, getEvolutionFunctions_1.getAllEvolutions)(false).filter(each => each.grade <= 2);
    if (type === "유년기1") {
        const baby1s = all.filter(each => each.grade === 1 && !specials.includes(each.name));
        const cases = [];
        baby1s.forEach(baby => {
            cases.push({
                type: baby.name,
                count: 1000
            });
        });
        const { table, counts } = createTable(cases);
        const index = getRandomNumber(counts);
        const selected = table[index];
        const digimon = baby1s.find(each => each.name === selected);
        return getDefaultBabyStatus(digimon);
    }
    const baby2s = all.filter(each => each.grade === 2 && !specials.includes(each.name));
    const cases = [];
    baby2s.forEach(baby => {
        cases.push({
            type: baby.name,
            count: 1000
        });
    });
    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);
    const selected = table[index];
    const digimon = baby2s.find(each => each.name === selected);
    return getDefaultBabyStatus(digimon);
};
exports.hatch = hatch;
const getFullnessState = (status) => {
    if (status.fullness < 21)
        return "위험🥵";
    if (status.fullness < 96)
        return "배고픔😰";
    if (status.fullness < 215)
        return "보통👍";
    return "배부름😖";
};
exports.getFullnessState = getFullnessState;
const getStatCounts = (status) => {
    for (let i = 0; i < successCellRange.length; i++) {
        if (status.satisfaction <= successCellRange[i])
            return i;
    }
    return 0;
};
const pass90Min = (status, dateText) => {
    const log = {
        type: "90time",
        text: "",
        dateText
    };
    if (status.fullness < 21) {
        status.fullness--;
        log.text = "포만지수 1 감소";
    }
    else if (status.fullness < 96) {
        status.fullness -= 2;
        log.text = "포만지수 2 감소";
    }
    else if (status.fullness < 215) {
        status.fullness -= 3;
        status.satisfaction++;
        log.text = "포만지수 3 감소, 만족도 1 증가";
    }
    else {
        status.fullness -= 4;
        log.text = "포만지수 4 감소";
    }
    return log;
};
exports.pass90Min = pass90Min;
const passOneDay = (status, dateText) => {
    const logs = [];
    for (let i = 0; i < 16; i++) {
        const log = pass90Min(status, dateText);
        logs.splice(0, 0, log);
    }
    return logs;
};
exports.passOneDay = passOneDay;
const canFeed = (status) => {
    return status.fullness < 215;
};
const feed = (status, food) => {
    if (!canFeed(status))
        return false;
    status.fullness += food.fullness;
    food.effects.forEach(effect => {
        status.weighted[effect.name] += effect.value;
    });
    return true;
};
exports.feed = feed;
const play = (status, toy) => {
    if (status.fullness <= 10)
        return false;
    status.fullness -= toy.fullness;
    status.satisfaction += toy.satisfaction;
    if (status.satisfaction > 100)
        status.satisfaction = 100;
    status.stature += toy.stature;
    if (status.stature > 100)
        status.stature = 100;
    return true;
};
exports.play = play;
const evolve = (status) => {
    if (status.stature < 100)
        return;
    const afters = status.digimon.afters;
    const cases = [];
    afters === null || afters === void 0 ? void 0 : afters.forEach(after => {
        cases.push({
            type: after.digimon.name,
            count: after.rate * 50000
        });
    });
    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);
    const digimonName = table[index];
    status.digimon = (0, getEvolutionFunctions_1.getEvolutionByName)(digimonName);
    status.stature = 0;
    if (status.digimon.grade === 2)
        return status;
    const statCounts = getStatCounts(status);
    for (let i = 0; i < statCounts; i++) {
        const cases = [];
        Object.keys(status.weighted).forEach(statName => {
            const selectedAds = status.adjustments.filter(each => each.type === statName);
            if (selectedAds.length < 2) {
                cases.push({
                    type: statName,
                    count: status.weighted[statName] * 50000
                });
            }
            else {
                const reduced = selectedAds
                    .reduce((a, b) => {
                    return { type: a.type, value: a.value + b.value };
                });
                if (reduced.value < 14)
                    cases.push({
                        type: statName,
                        count: status.weighted[statName] * 50000
                    });
            }
        });
        const statObj = createTable(cases);
        const statIndex = getRandomNumber(statObj.counts);
        const selectedStat = statObj.table[statIndex];
        const statValueCases = [];
        const selectedAds = status.adjustments.filter(each => each.type === selectedStat);
        let sum = 0;
        selectedAds.forEach(each => {
            sum += each.value;
        });
        const sub = 14 - sum;
        Object.keys(statPercent).forEach(statValue => {
            if (Number(statValue) <= sub)
                statValueCases.push({
                    type: statValue,
                    count: statPercent[Number(statValue)] * 50000
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
    for (let i = 0; i < 7 - statCounts; i++) {
        status.adjustments.push({ type: "FAIL", value: 0 });
    }
    return status;
};
exports.evolve = evolve;
