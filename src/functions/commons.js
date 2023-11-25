const clearArray = (array) => {
    while(array.length > 0) array.pop();
};

const getUUID = () => crypto.randomUUID();

export {
    clearArray,
    getUUID
}