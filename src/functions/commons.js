const clearArray = (array) => {
    while(array.length > 0) array.pop();
};

const getRandomInt = () => Math.floor(Math.random() * 100000);

export {
    clearArray,
    getRandomInt
}