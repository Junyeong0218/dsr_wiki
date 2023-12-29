"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommaString = exports.getNameExcepColon = exports.getUUID = exports.clearArray = void 0;
const clearArray = (array) => {
    while (array.length > 0)
        array.pop();
};
exports.clearArray = clearArray;
const getUUID = () => crypto.randomUUID();
exports.getUUID = getUUID;
const getNameExcepColon = (name) => name.includes(":") ? name.replace(":", "") : name;
exports.getNameExcepColon = getNameExcepColon;
const getCommaString = (number) => number.toLocaleString("ko-KR");
exports.getCommaString = getCommaString;
