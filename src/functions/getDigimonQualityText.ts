const getDigimonQualityText = (quality: string | null, isTag: boolean = true): string => {
    switch(quality) {
        case "반사":
            if(isTag) return "해당 속성의 공격을 받으면 <mark>피해량의 25%</mark>를 되돌려 줍니다.";
            else      return "해당 속성의 공격을 받으면 피해량의 25%를 되돌려 줍니다.";
        case "내성":
            if(isTag) return "해당 속성의 공격으로 <mark>받는 데미지는 25% 감소</mark>합니다.";
            else      return "해당 속성의 공격으로 받는 데미지는 25% 감소합니다.";
        case "회피":
            if(isTag) return "해당 속성 공격에 대해 <mark>회피율이 2배</mark>로 적용됩니다.";
            else      return "해당 속성 공격에 대해 회피율이 2배로 적용됩니다.";
        case "약점":
            if(isTag) return "해당 속성의 공격으로 <mark>25% 증가된 데미지</mark>를 입습니다.";
            else      return "해당 속성의 공격으로 25% 증가된 데미지를 입습니다.";
        case "회피불가":
            if(isTag) return "해당 속성의 공격은 <mark>회피가 불가</mark>합니다.";
            else      return "해당 속성의 공격은 회피가 불가합니다.";
        case "효과확률":
            if(isTag) return "해당 속성의 공격에 효과가 있을 경우, <mark>효과에 걸릴 확룰이 증가</mark>합니다.";
            else      return "해당 속성의 공격에 효과가 있을 경우, 효과에 걸릴 확룰이 증가합니다.";
        default:
            return "";
    }
}

export default getDigimonQualityText;