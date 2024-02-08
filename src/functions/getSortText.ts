const getSortText = (text: string): string => {
    switch(text) {
        case "nmae":
            return "이름";
        case "hp":
            return "HP";
        case "sp":
            return "SP";
        case "str":
            return "힘";
        case "int":
            return "지능";
        case "spd":
            return "속도";
        case "def":
            return "수비";
        case "res":
            return "수비";
        case "1skill":
            return "1스킬";
        case "2skill":
            return "2스킬";
        case "3skill":
            return "3스킬";
        default:
            return "";
    }
}

export default getSortText;