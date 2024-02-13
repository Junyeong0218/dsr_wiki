import data from "../json/skillEnhanceRates.json";
import { getItemById } from "./getItemsFunctions";

type Case = {
    type: string,
    count: number
}

type IEnhanceRate = {
    level: number,
    successRate: number,
    downRate: number
}

type EnhancedHelper = {
    upId: number,
    downId: number
}

interface ISkillEnhanceRate {
    grade: number,
    rates: Array<IEnhanceRate>
}

class SkillEnhanceRate {
    grade: number;
    rates: Array<IEnhanceRate>;

    constructor(raw: ISkillEnhanceRate) {
        this.grade = raw.grade;
        this.rates = raw.rates;
    }
}

const origin: Array<SkillEnhanceRate> = new Array();

const loadRates = (): void => {
    if(origin.length === 0) {
        data.forEach((value: ISkillEnhanceRate) => {
            origin.push(new SkillEnhanceRate(value));
        });
    }
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

const getEnhanceRate = (grade: number|undefined, skillLevel: number) => {
    loadRates();

    if(grade === undefined || grade < 3 || grade > 6) return {
        level: skillLevel,
        successRate: 0,
        downRate: 0
    }

    return origin.find(each => each.grade === grade)!.rates.find(rate => rate.level === skillLevel)!;
}

const tryEnhance = (rate: IEnhanceRate, enhanceHelper: EnhancedHelper): boolean => {
    const cases: Array<Case> = [
        { type: "success", count: rate.successRate },
        { type: "fail", count: (100 - rate.successRate * 100)/100 },
    ]

    if(enhanceHelper.upId !== 0) {
        const upItem = getItemById(enhanceHelper.upId)!;
        if(upItem.name === "고급 강화 재료") {
            cases[0].count += 0.1;
            cases[1].count -= 0.1;
        } else if(upItem.name === "최고급 강화 재료") {
            cases[0].count += 0.15;
            cases[1].count -= 0.15;
        }

        if(cases[0].count > 1) cases[0].count = 1;
        if(cases[1].count < 0) cases[1].count = 0;
    }

    cases[0].count = Math.floor(cases[0].count * 50000);
    cases[1].count = Math.floor(cases[1].count * 50000);

    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);

    return table[index] === "success";
}

const tryDown = (rate: IEnhanceRate, enhanceHelper: EnhancedHelper): boolean => {
    const cases: Array<Case> = [
        { type: "down", count: rate.downRate },
        { type: "keep", count: (100 - rate.successRate * 100)/100 },
    ]

    if(enhanceHelper.downId !== 0) {
        const downItem = getItemById(enhanceHelper.downId)!;
        if(downItem.name === "최하급 스킬 보호석") {
            cases[0].count += 0.05;
            cases[1].count -= 0.05;
        }

        if(cases[0].count > 1) cases[0].count = 1;
        if(cases[1].count < 0) cases[1].count = 0;

    }

    cases[0].count = Math.floor(cases[0].count * 50000);
    cases[1].count = Math.floor(cases[1].count * 50000);

    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);

    return table[index] === "down";
}

const enhanceSkill = (grade: number|undefined, skillLevel: number, enhanceHelper: EnhancedHelper) => {
    const rate = getEnhanceRate(grade, skillLevel);
    if(rate.successRate === 0) return;

    const isSuccess = tryEnhance(rate, enhanceHelper);
    if(isSuccess) return "success";
    if(rate.downRate === 0) return "fail";

    const isDown = tryDown(rate, enhanceHelper);
    if(isDown) return "down";
    return "fail";
}

export {
    getEnhanceRate,
    enhanceSkill
}