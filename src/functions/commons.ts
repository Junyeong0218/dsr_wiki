const clearArray = (array: Array<any>): void => {
    while(array.length > 0) array.pop();
};

// const getUUID = (): string => crypto.randomUUID();
const getUUID = (): string => {
    let str = "";
    for(let i = 1; i < 17; i++) {
        const number = Math.floor(Math.random() * 21) + 97;
        str += String.fromCharCode(number);
        if(i % 4 === 0)
            str += "-";
    }

    return str;
}

const getNameExceptColon = (name: string): string => name.includes(":") ? name.replace(":", "") : name;

const getCommaString = (number: number): string => number.toLocaleString("ko-KR");

export {
    clearArray,
    getUUID,
    getNameExceptColon,
    getCommaString
}