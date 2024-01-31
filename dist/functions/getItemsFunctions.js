"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemByName = exports.getItemById = exports.getItems = void 0;
const classes_1 = require("../classes");
const items_json_1 = __importDefault(require("../json/items.json"));
const origin = new Array();
const loadItems = () => {
    if (origin.length === 0) {
        items_json_1.default.forEach((each) => {
            origin.push(new classes_1.Item(each));
        });
    }
};
const getItems = () => {
    loadItems();
    return origin;
};
exports.getItems = getItems;
const getItemById = (id) => {
    var _a;
    loadItems();
    return (_a = origin.find(item => item.id === id)) !== null && _a !== void 0 ? _a : null;
};
exports.getItemById = getItemById;
const getItemByName = (name, tradable = true) => {
    loadItems();
    return origin.find(item => item.name === name && item.canTrade === tradable);
};
exports.getItemByName = getItemByName;
