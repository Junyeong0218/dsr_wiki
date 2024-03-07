"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchedCombinations = exports.getSearchedEvolutions = exports.getSearchedDigimons = void 0;
const lodash_1 = require("lodash");
const _1 = require(".");
const getCombinationsFunctions_1 = require("./getCombinationsFunctions");
const classes_1 = require("../classes");
function ch2pattern(ch) {
    const offset = 44032; /* '가'의 코드 */
    // 한국어 음절
    if (/[가-힣]/.test(ch)) {
        const chCode = ch.charCodeAt(0) - offset;
        // 종성이 있으면 문자 그대로를 찾는다.
        if (chCode % 28 > 0) {
            return ch;
        }
        const begin = Math.floor(chCode / 28) * 28 + offset;
        const end = begin + 27;
        return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }
    // 한글 자음
    if (/[ㄱ-ㅎ]/.test(ch)) {
        const con2syl = {
            'ㄱ': '가'.charCodeAt(0),
            'ㄲ': '까'.charCodeAt(0),
            'ㄴ': '나'.charCodeAt(0),
            'ㄷ': '다'.charCodeAt(0),
            'ㄸ': '따'.charCodeAt(0),
            'ㄹ': '라'.charCodeAt(0),
            'ㅁ': '마'.charCodeAt(0),
            'ㅂ': '바'.charCodeAt(0),
            'ㅃ': '빠'.charCodeAt(0),
            'ㅅ': '사'.charCodeAt(0),
        };
        const begin = con2syl[ch] || ((ch.charCodeAt(0) - 12613 /* 'ㅅ'의 코드 */) * 588 + con2syl['ㅅ']);
        const end = begin + 587;
        return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }
    // 소문자에 대문자도 함께 검색하도록 추가
    if (/[a-z]/.test(ch)) {
        const upper = ch.toUpperCase();
        return `[${ch}|${upper}]`;
    }
    // 대문자에 소문자도 함께 검색하도록 추가
    if (/[A-Z]/.test(ch)) {
        const lower = ch.toLowerCase();
        return `[${lower}|${ch}]`;
    }
    // 그 외엔 그대로 내보냄
    // escapeRegExp는 lodash에서 가져옴
    return (0, lodash_1.escapeRegExp)(ch);
}
function createFuzzyMatcher(input) {
    const pattern = input
        .split('')
        .map(ch2pattern)
        .map(pattern => '(' + pattern + ')')
        .join('.*?');
    return new RegExp(pattern);
}
// -------------------------------------
const getSearchedDigimons = (search) => {
    const digimons = (0, _1.getAllDigimons)(false);
    const regex = createFuzzyMatcher(search);
    const searched = digimons.filter((digimon) => {
        return regex.test(digimon.name);
    })
        .map(digimon => {
        let totalDistance = 0;
        const tag = digimon.name.replace(regex, (match, ...groups) => {
            const letters = groups.slice(0, search.length);
            let lastIndex = 0;
            let highlighted = [];
            for (let i = 0, l = letters.length; i < l; i++) {
                const idx = match.indexOf(letters[i], lastIndex);
                highlighted.push(match.substring(lastIndex, idx));
                highlighted.push(`<mark>${letters[i]}</mark>`);
                if (lastIndex > 0) {
                    totalDistance += idx - lastIndex;
                }
                lastIndex = idx + 1;
            }
            return highlighted.join("");
        });
        digimon.totalDistance = totalDistance;
        digimon.tag = tag;
        return digimon;
    });
    searched.sort((a, b) => {
        return a.totalDistance - b.totalDistance;
    });
    return searched;
};
exports.getSearchedDigimons = getSearchedDigimons;
const getSearchedEvolutions = (search) => {
    const digimons = (0, _1.getAllEvolutions)(false);
    const regex = createFuzzyMatcher(search);
    const searched = digimons.filter((digimon) => {
        return regex.test(digimon.name);
    })
        .map(digimon => {
        let totalDistance = 0;
        const tag = digimon.name.replace(regex, (match, ...groups) => {
            const letters = groups.slice(0, search.length);
            let lastIndex = 0;
            let highlighted = [];
            for (let i = 0, l = letters.length; i < l; i++) {
                const idx = match.indexOf(letters[i], lastIndex);
                highlighted.push(match.substring(lastIndex, idx));
                highlighted.push(`<mark>${letters[i]}</mark>`);
                if (lastIndex > 0) {
                    totalDistance += idx - lastIndex;
                }
                lastIndex = idx + 1;
            }
            return highlighted.join("");
        });
        digimon.tag = tag;
        digimon.totalDistance = totalDistance;
        return digimon;
    });
    searched.sort((a, b) => {
        if (!a.totalDistance || !b.totalDistance)
            return 0;
        return a.totalDistance - b.totalDistance;
    });
    return searched;
};
exports.getSearchedEvolutions = getSearchedEvolutions;
const getSearchedCombinations = (search) => {
    const combinations = (0, getCombinationsFunctions_1.getCombinations)();
    const regex = createFuzzyMatcher(search);
    const searched = combinations.filter((combination) => {
        return regex.test(combination.resultItem.name);
    })
        .map(combination => {
        let totalDistance = 0;
        let temp = combination.resultItem.name;
        const tag = temp.replace(regex, (match, ...groups) => {
            const letters = groups.slice(0, search.length);
            let lastIndex = 0;
            let highlighted = [];
            for (let i = 0, l = letters.length; i < l; i++) {
                const idx = match.indexOf(letters[i], lastIndex);
                highlighted.push(match.substring(lastIndex, idx));
                highlighted.push(`<mark>${letters[i]}</mark>`);
                if (lastIndex > 0) {
                    totalDistance += idx - lastIndex;
                }
                lastIndex = idx + 1;
            }
            return highlighted.join("");
        });
        const newObj = new classes_1.Combination(combination);
        newObj.totalDistance = totalDistance;
        newObj.tag = tag;
        return newObj;
    });
    searched.sort((a, b) => {
        if (!a.totalDistance || !b.totalDistance)
            return 0;
        return a.totalDistance - b.totalDistance;
    });
    return searched;
};
exports.getSearchedCombinations = getSearchedCombinations;
