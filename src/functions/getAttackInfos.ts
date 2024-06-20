import { Digimon, Monster, Skill } from "../classes";
import { getDigimonByName } from "./getDigimons";

type SkillInfo = {
    skillIndex: number
    skillLevel: number
}

type DigimonOptionalStats = {
    potential: number
    adjustment: number
    synergy: number
    buff: number
    specialize: number
    equipment: number
}

const LOWEST_DAMAGE_RATE = 0.95;

const getGoalHp = (monster: Monster, useCount: number) => Math.ceil(monster.hp / useCount);

const getLevelConstant = (level: number) => level * 12 + 24;

// 강약점
// 몬스터 약점 효과가 "약점"이고 약점 속성과 스킬 속성이 같으면 1.25
// 몬스터 강점 효과가 "내성"이고 강점 속성과 스킬 속성이 같으면 0.75
const getAdvantage = (skill: Skill, monster: Monster) => {
    const monsterInfo = getDigimonByName(monster.name)!;

    if(monsterInfo.weaknessEffect === "약점" &&
       skill.element === monsterInfo.weakness) {
        return 1.25;
    }

    if(monsterInfo.strengthEffect === "내성" &&
       skill.element === monsterInfo.strength) {
        return 0.75;
    }
    
    return 1;
}

const getCompatibility = (userType: string, monsterType: string) => {
    if(userType === "Uk") {
        if(monsterType === "Uk") return 1.25;
        return 1.125;
    }
    if(userType === "Fr") {
        if(monsterType === "Uk") return 0.875;
        return 1;
    }
    if(userType === "Va") {
        if(monsterType === "Vi") return 1.25;
        if(monsterType === "Da") return 0.75;
        if(monsterType === "Uk") return 0.875;
        return 1;
    }
    if(userType === "Vi") {
        if(monsterType === "Da") return 1.25;
        if(monsterType === "Va") return 0.75;
        if(monsterType === "Uk") return 0.875;
        return 1;
    }
    if(userType === "Da") {
        if(monsterType === "Va") return 1.25;
        if(monsterType === "Vi") return 0.75;
        if(monsterType === "Uk") return 0.875;
        return 1;
    }

    return 0;
}

const getReqStr = (userDigimon: Digimon | undefined, monster: Monster | undefined, skillInfo: SkillInfo, useCount: number): number => {
    if(!userDigimon) return 0;
    if(!monster) return 0;

    const goalHp = getGoalHp(monster, useCount);
    const skill = userDigimon.skills[skillInfo.skillIndex];
    const levelConstant = getLevelConstant(100);
    const advantage = getAdvantage(skill, monster);
    const compatibility = getCompatibility(userDigimon.digimonType, monster.digimonType);

    // console.log(skill.attackCount, "타수")
    // console.log(skill.coefficients[skillInfo.skillLevel], "계수")
    // console.log(compatibility, "상성")
    // console.log(advantage, "강약점")
    // console.log(levelConstant, "레벨 계수")
    // console.log(LOWEST_DAMAGE_RATE, "데미지 범위 최소값")
    // console.log(monster.def, "적 수비")
    
    return Math.ceil(goalHp / ( // 목표 체력
                                    skill.coefficients[skillInfo.skillLevel] * // 계수
                                    compatibility * // 상성
                                    advantage * // 강약점
                                    levelConstant * // 레벨 계수
                                    LOWEST_DAMAGE_RATE / // 데미지 범위 최소값
                                    monster.def // 적 수비
                              ) / skill.attackCount // 타수
                    )
}

const getAdditionalStr = (userDigimon: Digimon | undefined, optionalStats: DigimonOptionalStats) => {
    if(!userDigimon) return 0;

    const str = userDigimon.str;
    const potential = Math.ceil(str * (optionalStats.potential / 100));
    const adjustment = Math.ceil(str * (optionalStats.adjustment / 100));
    const synergy = Math.ceil(str * (optionalStats.synergy / 100));
    
    return potential + adjustment + synergy + 
           optionalStats.buff + optionalStats.specialize + 
           optionalStats.equipment;
}

const getDamage = (str: number, userDigimon: Digimon | undefined, monster: Monster | undefined, skillInfo: SkillInfo) => {
    if(!userDigimon) return 0;
    if(!monster) return 0;

    const skill = userDigimon.skills[skillInfo.skillIndex];
    const levelConstant = getLevelConstant(100);
    const advantage = getAdvantage(skill, monster);
    const compatibility = getCompatibility(userDigimon.digimonType, monster.digimonType);

    // let acc = str;
    // console.log(acc, `힘`);
    // acc *= skill.coefficients[skillInfo.skillLevel];
    // console.log(acc, `힘 * 계수(${skill.coefficients[skillInfo.skillLevel]})`);
    // acc *= compatibility;
    // console.log(acc, `힘 * 계수 * 상성(${compatibility})`);
    // acc *= advantage;
    // console.log(acc, `힘 * 계수 * 상성 * 강약점(${advantage})`);
    // acc *= levelConstant;
    // console.log(acc, `힘 * 계수 * 상성 * 강약점 * 레벨계수(${levelConstant})`);
    // acc *= LOWEST_DAMAGE_RATE;
    // console.log(acc, `힘 * 계수 * 상성 * 강약점 * 레벨계수 * 범위최소값(${LOWEST_DAMAGE_RATE})`);
    // acc /= monster.def;
    // console.log(acc, `힘 * 계수 * 상성 * 강약점 * 레벨계수 * 범위최소값 / 몬스터 수비(${monster.def})`);
    // console.log((str * skill.coefficients[skillInfo.skillLevel] * compatibility *
    //             advantage * levelConstant * LOWEST_DAMAGE_RATE / monster.def), "1타 데미지")
                
    return Math.round(str * // 힘
                      skill.coefficients[skillInfo.skillLevel] * // 계수
                      compatibility * // 상성
                      advantage * // 강약점
                      levelConstant * // 레벨 계수
                      LOWEST_DAMAGE_RATE / // 데미지 범위 최소값
                      monster.def) * // 적 수비
                      skill.attackCount // 타수
}

export {
    SkillInfo,
    DigimonOptionalStats,

    getAdditionalStr,
    getReqStr,
    getDamage
}