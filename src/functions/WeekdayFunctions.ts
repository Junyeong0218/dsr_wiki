const getWeekdayText = (weekday: number): string => {
    let text = "";
    switch(weekday) {
        case 0: {
            text = "일요일";
            break;
        }
        case 1: {
            text = "월요일";
            break;
        }
        case 2: {
            text = "화요일";
            break;
        }
        case 3: {
            text = "수요일";
            break;
        }
        case 4: {
            text = "목요일";
            break;
        }
        case 5: {
            text = "금요일";
            break;
        }
        case 6: {
            text = "토요일";
            break;
        }
    }
    return text;
}

const isToday = (weekday: number): boolean => {
    let date = new Date();
    const offset = date.getTimezoneOffset();
    
    if(offset !== -540)
        date = new Date(date.getTime() + offset * 24 * 1000);

    if(date.getDay() === weekday) return true;

    return false;
}

export {
    getWeekdayText,
    isToday
}