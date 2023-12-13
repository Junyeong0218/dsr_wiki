const Grades = {
    1: "유년기1",
    2: "유년기2",
    3: "성장기",
    4: "성숙기",
    5: "완전체",
    6: "궁극체"
}

const GradeClassNames = {
    "유년기1": "baby1",
    "유년기2": "baby2",
    "성장기": "child",
    "성숙기": "adult",
    "완전체": "perfect",
    "궁극체": "ultimate"
}

const RequireStatName = {
    "reqLevel": "레벨",
    "reqBonding": "유대감",
    "reqStr": "힘",
    "reqInt": "지능",
    "reqSpd": "속도",
    "reqRes": "저항",
    "reqDef": "수비"
}

const ItemType = {
    1: "포션",
    2: "소모 아이템",
    3: "탐지기",
    4: "스킬 강화석",
    5: "디지타마",
    6: "디지코어",
    7: "기타",
    8: "퀘스트 아이템",
    9: "디지아일랜드",
    10: "코스튬"
}

const NoDropMonsters = ["츄몬", "레어몬", "모노크로몬", "스콜피온몬"];

const PROFILE_HEIGHT = 80;

Object.freeze(Grades);
Object.freeze(GradeClassNames);
Object.freeze(RequireStatName);
Object.freeze(PROFILE_HEIGHT);
Object.freeze(PROFILE_HEIGHT);
Object.freeze(ItemType);
Object.freeze(NoDropMonsters);

export {
    Grades,
    GradeClassNames,
    RequireStatName,
    PROFILE_HEIGHT,

    ItemType,
    NoDropMonsters
}