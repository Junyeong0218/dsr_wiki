interface INumberKey {
    [key: number]: string
}
interface IStringKey {
    [key: string]: string
}

const Grades: INumberKey = {
    1: "유년기1",
    2: "유년기2",
    3: "성장기",
    4: "성숙기",
    5: "완전체",
    6: "궁극체"
}

const GradeClassNames: IStringKey = {
    "유년기1": "baby1",
    "유년기2": "baby2",
    "성장기": "child",
    "성숙기": "adult",
    "완전체": "perfect",
    "궁극체": "ultimate"
}

const RequireStatName: IStringKey = {
    "reqLevel": "레벨",
    "reqBonding": "유대감",
    "reqStr": "힘",
    "reqInt": "지능",
    "reqSpd": "속도",
    "reqRes": "저항",
    "reqDef": "수비"
}

const ItemType: INumberKey = {
    1: "포션",
    2: "소모 아이템",
    3: "탐지기",
    4: "스킬 강화석",
    5: "디지타마",
    6: "디지코어",
    7: "기타",
    8: "퀘스트 아이템",
    9: "디지아일랜드",
    10: "코스튬",
    11: "테이머 장비"
}

const NoDropMonsters = ["츄몬", "레어몬", "모노크로몬", "스콜피온몬"];

const PROFILE_HEIGHT = 80;

const DigimonTypesEng: INumberKey = {
    1: "Va",
    2: "Vi",
    3: "Da",
    4: "Uk",
    5: "Fr"
}

const DigimonTypes: INumberKey = {
    1: "백신",
    2: "바이러스",
    3: "데이터",
    4: "언노운",
    5: "프리"
}

const Elements: INumberKey = {
    1: "강철",
    2: "나무",
    3: "물",
    4: "물리",
    5: "바람",
    6: "불",
    7: "빛",
    8: "어둠",
    9: "얼음",
    10: "천둥",
    11: "흙"
}

const FieldTypes: IStringKey = {
    "DA": "다크 에리어",
    "DR": "드래곤즈 로어",
    "DS": "딥 세이버즈",
    "JT": "정글 트루퍼즈",
    "ME": "메탈 엠파이어",
    "NSp": "네이쳐 스피릿츠",
    "Nso": "나이트메어 솔져스",
    "UK": "언노운",
    "VB": "바이러스 버스터즈",
    "WG": "윈드 가디언즈",
}

const IMG_URL_BASE = 'https://raw.githubusercontent.com/Junyeong0218/dsr_wiki/main/public/images';

Object.freeze(Grades);
Object.freeze(GradeClassNames);
Object.freeze(RequireStatName);
Object.freeze(PROFILE_HEIGHT);
Object.freeze(PROFILE_HEIGHT);
Object.freeze(ItemType);
Object.freeze(NoDropMonsters);
Object.freeze(DigimonTypesEng);
Object.freeze(DigimonTypes);
Object.freeze(Elements);
Object.freeze(FieldTypes);

export {
    IStringKey,
    
    Grades,
    GradeClassNames,
    RequireStatName,
    PROFILE_HEIGHT,

    ItemType,
    NoDropMonsters,

    DigimonTypesEng,
    DigimonTypes,
    Elements,
    FieldTypes,

    IMG_URL_BASE
}