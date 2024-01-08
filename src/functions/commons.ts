const clearArray = (array: Array<any>): void => {
    while(array.length > 0) array.pop();
};

const getUUID = (): string => crypto.randomUUID();

const getNameExceptColon = (name: string): string => name.includes(":") ? name.replace(":", "") : name;

const getCommaString = (number: number): string => number.toLocaleString("ko-KR");

export {
    clearArray,
    getUUID,
    getNameExceptColon,
    getCommaString
}