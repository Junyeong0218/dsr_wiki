"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTRItemByName = exports.getTRItemById = exports.getAllDigimons = void 0;
const TRItem_1 = require("../../classes/tr/TRItem");
const tr_ItemParam2_json_1 = __importDefault(require("../../json/tr_ItemParam2.json"));
const tr_ItemParamEx_json_1 = __importDefault(require("../../json/tr_ItemParamEx.json"));
const tr_ItemParamEx2_json_1 = __importDefault(require("../../json/tr_ItemParamEx2.json"));
const origin = new Array();
const loadTRItems = () => {
    if (origin.length === 0) {
        tr_ItemParam2_json_1.default.forEach((value) => {
            origin.push(new TRItem_1.TRItem(value));
        });
        tr_ItemParamEx_json_1.default.forEach((value) => {
            origin.push(new TRItem_1.TRItem(value));
        });
        tr_ItemParamEx2_json_1.default.forEach((value) => {
            origin.push(new TRItem_1.TRItem(value));
        });
    }
};
const getTRItemById = (id) => {
    var _a;
    loadTRItems();
    const trItem = (_a = origin.find(each => each.id === id)) !== null && _a !== void 0 ? _a : null;
    return trItem;
};
exports.getTRItemById = getTRItemById;
const getTRItemByName = (name) => {
    var _a;
    loadTRItems();
    const trItem = (_a = origin.find(each => each.name === name)) !== null && _a !== void 0 ? _a : null;
    return trItem;
};
exports.getTRItemByName = getTRItemByName;
const getAllDigimons = (includeMutation) => {
    loadTRItems();
    return origin;
};
exports.getAllDigimons = getAllDigimons;
