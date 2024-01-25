import { getItemByName } from "./getItemsFunctions";

type Gauge = {
    type: string,
    value: number
}

type Case = {
    type: string,
    count: number
}

type ValueSum = {
    [key: string]: number
}

const rate = {
    success: 0.5,
    fail: 0.5,
    value: {
        "1%": 0.25,
        "2%": 0.35,
        "3%": 0.30,
        "4%": 0.10
    },
    type: {
        "최대 HP": 1,
        "최대 SP": 1,
        "힘": 1,
        "지능": 1,
        "수비": 1,
        "저항": 1,
        "속도": 1
    }
}

const getDefaultGauges = (): Array<Gauge> => {
    return [
        { type: "NONE", value: 0 },
        { type: "NONE", value: 0 },
        { type: "NONE", value: 0 },
        { type: "NONE", value: 0 },
        { type: "NONE", value: 0 },
        { type: "NONE", value: 0 },
        { type: "NONE", value: 0 }
    ];
}

const isFirstAdjust = (gauges: Array<Gauge>): boolean => {
    let count = 0;
    gauges.forEach(gauge => {
        if(gauge.type === "NONE") count++;
    });

    return count === 7;
}

const hasFailAdjust = (gauges: Array<Gauge>): boolean => {
    let count = 0;
    gauges.forEach(gauge => {
        if(gauge.type === "FAIL") count++;
    });

    return count > 0;
}

const hasSuccessedAdjustsOverTwo = (gauges: Array<Gauge>): boolean => {
    let count = 0;
    gauges.forEach(gauge => {
        if(gauge.type !== "NONE" && gauge.type !== "FAIL") count++;
    });

    return count > 1;
}

const getImpossibleStats = (gauges: Array<Gauge>) => {
    const possibles = gauges.filter(gauge => gauge.type !== "NONE" && gauge.type !== "FAIL");

    const valueSum: ValueSum = {
        "최대 HP": 0,
        "최대 SP": 0,
        "힘": 0,
        "지능": 0,
        "수비": 0,
        "저항": 0,
        "속도": 0
    }

    possibles.forEach(gauge => valueSum[gauge.type] += gauge.value * 100);

    const impossibles = new Array<Gauge>();

    Object.keys(valueSum).forEach(type => {
        if(valueSum[type] > 13) impossibles.push({
            type,
            value: valueSum[type]
        });
    });

    return impossibles;
}

const getRandomNumber = (digit: number) => Math.round(Math.random() * digit);
const getRandomNumberExceptZero = (digit: number) => Math.round(Math.random() * digit) + 1;

const createSuccessTable = (cases: Array<Case>) => {
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

const trySuccess = () => {
    const cases: Array<Case> = [
        { type: "success", count: rate.success * 10000 },
        { type: "fail", count: rate.fail * 10000 }
    ];
    const { table, counts } = createSuccessTable(cases);
    const index = getRandomNumber(counts);

    return table[index];
}

const getRandomStat = (impossibles: Array<Gauge>) => {
    let cases: Array<Case> = [
        { type: "최대 HP", count: rate.type["최대 HP"] * 1000 },
        { type: "최대 SP", count: rate.type["최대 SP"] * 1000 },
        { type: "힘", count: rate.type["힘"] * 1000 },
        { type: "지능", count: rate.type["지능"] * 1000 },
        { type: "수비", count: rate.type["수비"] * 1000 },
        { type: "저항", count: rate.type["저항"] * 1000 },
        { type: "속도", count: rate.type["속도"] * 1000 }
    ];

    const impossibleTypes = impossibles.map(each => each.type);
    cases = cases.filter(each => !impossibleTypes.includes(each.type));

    const { table, counts } = createSuccessTable(cases);
    const index = getRandomNumber(counts);

    return table[index];
}

const getRandomValue = (prevValue: number) => {
    let cases: Array<Case> = [
        { type: "1%", count: rate.value["1%"] * 10000 },
        { type: "2%", count: rate.value["2%"] * 10000 },
        { type: "3%", count: rate.value["3%"] * 10000 },
        { type: "4%", count: rate.value["4%"] * 10000 }
    ];

    const sub = 14 - prevValue;
    
    if(sub < 4) {
        cases = cases.filter(each => Number(each.type.replace("%", "")) <= sub)
    }

    const { table, counts } = createSuccessTable(cases);
    const index = getRandomNumber(counts);
    
    return Number(table[index].replace("%", "")) / 100;
}

const adjust = (gauges: Array<Gauge>): Gauge => {
    const impossibles = getImpossibleStats(gauges);
    const stat = getRandomStat(impossibles);

    const prevValues = gauges.filter(gauge => gauge.type === stat)
                            .map(e => e.value * 100);
    
    let prevValue = 0;
    if(prevValues.length > 0)
        prevValue = prevValues.reduce((p, c) => p + c);

    const value = getRandomValue(prevValue);

    return {
        type: stat,
        value
    }
}

const adjustAll = () => {
    const gauges = getDefaultGauges();
    for(let i = 0; i < 7; i++) {
        if(trySuccess() === "fail") {
            gauges.splice(i, 1, {
                type: "FAIL",
                value: 0
            });
        } else {
            const gauge = adjust(gauges);
            gauges.splice(i, 1, gauge);
        }
    }

    return gauges;
}

const adjustFailToSuccess = (guages: Array<Gauge>, index: number) => {
    let rerollCount = 0;
    let successFlag = "fail";

    while(successFlag === "fail") {
        successFlag = trySuccess();
        rerollCount++;
    }

    const newGauge = adjust(guages);

    guages.splice(index, 1, newGauge);

    return {
        guages: [ ...guages ],
        count: rerollCount
    }
}

const adjustTwo = (guages: Array<Gauge>, indexes: Array<number>) => {
    const firstGauge = adjust(guages);

    guages.splice(indexes[0], 1, firstGauge);
    
    const secondGauge = adjust(guages);

    guages.splice(indexes[1], 1, secondGauge);

    return {
        guages: [ ...guages ],
        count: 1
    }
}

const getDefaultSpentItems = () => {
    return [
        {
            item: getItemByName("제로유니트")!,
            count: 0
        },
        {
            item: getItemByName("빛나는 제로유니트")!,
            count: 0
        },
        {
            item: getItemByName("부서진 제로유니트")!,
            count: 0
        },
    ]
}

export {
    Gauge,
    getDefaultGauges,
    isFirstAdjust,
    hasFailAdjust,
    hasSuccessedAdjustsOverTwo,
    adjustAll,
    adjustFailToSuccess,
    adjustTwo,

    getDefaultSpentItems
}