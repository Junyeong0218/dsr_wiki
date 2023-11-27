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

const requireStatName = {
    "reqLevel": "레벨",
    "reqBonding": "유대감",
    "reqStr": "힘",
    "reqInt": "지능",
    "reqSpd": "속도",
    "reqRes": "저항",
    "reqDef": "수비"
}

const PROFILE_HEIGHT = 80;

Object.freeze(Grades);
Object.freeze(GradeClassNames);
Object.freeze(requireStatName);
Object.freeze(PROFILE_HEIGHT);

export {
    Grades,
    GradeClassNames,
    requireStatName,
    PROFILE_HEIGHT
}