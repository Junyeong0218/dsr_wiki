const clearArray = (array) => {
    while(array.length > 0) array.pop();
};

const getUUID = () => crypto.randomUUID();

const getNameExcepColon = (name) => name.includes(":") ? name.replace(":", "") : name;

const getCommaString = (number) => number.toLocaleString("ko-KR");

export {
    clearArray,
    getUUID,
    getNameExcepColon,
    getCommaString
}