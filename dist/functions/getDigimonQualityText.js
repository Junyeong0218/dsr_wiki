"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDigimonQualityText = (quality) => {
    switch (quality) {
        case "반사":
            return "해당 속성의 공격을 받으면 <mark>피해량의 25%</mark>를 되돌려 줍니다.";
        case "내성":
            return "해당 속성의 공격으로 <mark>받는 데미지는 25% 감소</mark>합니다.";
        case "회피":
            return "해당 속성 공격에 대해 <mark>회피율이 2배</mark>로 적용됩니다.";
        case "약점":
            return "해당 속성의 공격으로 <mark>25% 증가된 데미지</mark>를 입습니다.";
        case "회피불가":
            return "해당 속성의 공격은 <mark>회피가 불가</mark>합니다.";
        case "효과확률":
            return "해당 속성의 공격에 효과가 있을 경우, <mark>효과에 걸릴 확룰이 증가</mark>합니다.";
        default:
            return "";
    }
};
exports.default = getDigimonQualityText;
