import Potentials from "../components/potential/Potentials"

type PotentialGroup = {
    type: string,
    potentials: Array<Potential>
}

type Case = {
    type: string,
    count: number
}

type Potential = {
    statType: string,
    value: number
}

const rate = {
    type: {
        "ONE": 2,
        "ROW": 1,
        "COLUMN": 1,
        "RIGHT_DOWN": 1,
        "RIGHT_UP": 1
    },
    statType: {
        "힘": 3,
        "지능": 3,
        "수비": 5,
        "저항": 5,
        "속도": 4,
        "체인스킬": 1,
        "회피율": 1,
        "크리율": 1
    },
    value: {
        "1%": 0.5,
        "2%": 0.3,
        "3%": 0.15,
        "4%": 0.05
    },
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

const getRandomType = () => {
    const cases: Array<Case> = [
        { type: "ONE", count: rate.type["ONE"] * 2000 },
        { type: "ROW", count: rate.type["ROW"] * 2000 },
        { type: "COLUMN", count: rate.type["COLUMN"] * 2000 },
        { type: "RIGHT_DOWN", count: rate.type["RIGHT_DOWN"] * 2000 },
        { type: "RIGHT_UP", count: rate.type["RIGHT_UP"] * 2000 }
    ];

    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);

    return table[index];
}

const getRandomStatType = () => {
    const cases: Array<Case> = [
        { type: "힘", count: rate.statType["힘"] * 2000 },
        { type: "지능", count: rate.statType["지능"] * 2000 },
        { type: "수비", count: rate.statType["수비"] * 2000 },
        { type: "저항", count: rate.statType["저항"] * 2000 },
        { type: "속도", count: rate.statType["속도"] * 2000 },
        { type: "체인스킬", count: rate.statType["체인스킬"] * 2000 },
        { type: "회피율", count: rate.statType["회피율"] * 2000 },
        { type: "크리율", count: rate.statType["크리율"] * 2000 }
    ];

    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);

    return table[index];
}

const getRandomValue = () => {
    let cases: Array<Case> = [
        { type: "1%", count: rate.value["1%"] * 10000 },
        { type: "2%", count: rate.value["2%"] * 10000 },
        { type: "3%", count: rate.value["3%"] * 10000 },
        { type: "4%", count: rate.value["4%"] * 10000 }
    ];

    const { table, counts } = createTable(cases);
    const index = getRandomNumber(counts);
    
    return Number(table[index].replace("%", ""));
}

const generatePotential = (): PotentialGroup => {
    const type = getRandomType();
    const firstStat = getRandomStatType();
    const firstValue = getRandomValue();

    const group: PotentialGroup = {
        type,
        potentials: [
            { statType: firstStat, value: firstValue }
        ]
    }

    if(type !== "ONE") {
        const secondStat = getRandomStatType();
        const secondValue = getRandomValue();

        group.potentials.push({
            statType: secondStat, value: secondValue
        });
    }

    return group;
}

const generateTenPotentials = (): Array<PotentialGroup> => {
    const array = new Array<PotentialGroup>();

    for(let i = 0; i < 10; i++) {
        array.push(generatePotential());
    }

    return array;
}

const getDefaultPotentials = (): Array<Array<Potential>> => {
    return [
        [
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 }
        ],
        [
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 }
        ],
        [
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 }
        ],
        [
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 },
            { statType: "BLANK", value: 0 }
        ]
    ];
}

const getTotalStats = (potentials: Array<Array<Potential>>): Array<Potential> => {
    const total: Array<Potential> = [
        { statType: "힘", value: 0 },
        { statType: "지능", value: 0 },
        { statType: "수비", value: 0 },
        { statType: "저항", value: 0 },
        { statType: "속도", value: 0 },
        { statType: "체인스킬", value: 0 },
        { statType: "회피율", value: 0 },
        { statType: "크리율", value: 0 }
    ]

    for(let i = 0; i < potentials.length; i++) {
        const row = potentials[i];

        column:
        for(let j = 0; j < row.length; j++) {
            const cell = row[j];

            if(cell.statType === "BLANK") continue column;

            total.find(e => e.statType === cell.statType)!.value += cell.value;
        }
    }

    return total;
}

export {
    PotentialGroup,
    Potential,

    getDefaultPotentials,
    generateTenPotentials,
    getTotalStats
}