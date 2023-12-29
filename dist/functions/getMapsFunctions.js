"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaps = void 0;
const classes_1 = require("../classes");
const maps_json_1 = __importDefault(require("../json/maps.json"));
const origin = new Array();
const loadMaps = () => {
    if (origin.length === 0) {
        maps_json_1.default.forEach((each) => {
            const map = new classes_1.Map(each);
            if (each.portals) {
                map.portals = new Array();
                each.portals.forEach((p) => {
                    map.portals.push(new classes_1.Portal(p));
                });
            }
            if (each.warps) {
                map.warps = new Array();
                each.warps.forEach((w) => {
                    map.warps.push(new classes_1.Warp(w));
                });
            }
            if (each.shops) {
                map.shops = new Array();
                each.shops.forEach((s) => {
                    map.shops.push(new classes_1.Shop(s));
                });
            }
            if (each.monsters) {
                map.monsters = new Array();
                each.monsters.forEach((m) => {
                    map.monsters.push(new classes_1.Monster(m));
                });
            }
            if (each.cubes) {
                map.cubes = new Array();
                each.cubes.forEach((c) => {
                    map.cubes.push(new classes_1.Cube(c));
                });
            }
            origin.push(map);
        });
    }
};
const getMaps = () => {
    loadMaps();
    return origin;
};
exports.getMaps = getMaps;
