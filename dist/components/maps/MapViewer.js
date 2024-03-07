"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const MonsterShortcut_1 = __importDefault(require("./MonsterShortcut"));
const commons_1 = require("../../functions/commons");
const ObjectFilter_1 = __importDefault(require("./ObjectFilter"));
const ShopModal_1 = __importDefault(require("./ShopModal"));
const DropsModal_1 = __importDefault(require("./DropsModal"));
const getItemsFunctions_1 = require("../../functions/getItemsFunctions");
const enums_1 = require("../../enums");
const getDropItemFilteringFlags_1 = require("../../functions/getDropItemFilteringFlags");
function MapViewer({ map }) {
    const [showPortal, setShowPortal] = (0, react_1.useState)(true);
    const [showWarp, setShowWarp] = (0, react_1.useState)(true);
    const [showShop, setShowShop] = (0, react_1.useState)(true);
    const [showCube, setShowCube] = (0, react_1.useState)(false);
    const [itemCheckFlags, setItemCheckFlags] = (0, react_1.useState)((0, getDropItemFilteringFlags_1.getBlankFlags)());
    const [isOpenShop, setIsOpenShop] = (0, react_1.useState)(false);
    const [shopModalPosition, setShopModalPosition] = (0, react_1.useState)({ top: 0, left: 0 });
    const selectedShop = (0, react_1.useRef)(null);
    const [isOpenDrops, setIsOpenDrops] = (0, react_1.useState)(false);
    const [dropsModalPosition, setDropsModalPosition] = (0, react_1.useState)({ top: 0, left: 0 });
    const selectedDigimon = (0, react_1.useRef)(null);
    const captureMouse = (event) => {
        var _a;
        const target = event.target;
        if ((target === null || target === void 0 ? void 0 : target.tagName) === "IMG") {
            const classList = target.classList;
            if (classList.contains("shop") && map.shops) {
                if (target.id === "common")
                    selectedShop.current = map.shops[0];
                else
                    selectedShop.current = map.shops[1];
                const mapRect = target.parentElement.getBoundingClientRect();
                if (event.pageY + 450 > window.innerHeight) {
                    setShopModalPosition({ top: 450 - mapRect.top + 10, left: event.pageX - mapRect.left + 2 });
                }
                else {
                    setShopModalPosition({ top: event.pageY - mapRect.top, left: event.pageX - mapRect.left + 2 });
                }
                setIsOpenShop(true);
                setIsOpenDrops(false);
            }
            else if (classList.contains("monster-image") && map.monsters) {
                const id = Number(target.dataset.id);
                const digimon = map.monsters.find(monster => monster.id === id);
                selectedDigimon.current = digimon;
                const mapRect = target.parentElement.parentElement.getBoundingClientRect();
                const modalHeight = 211 + (((_a = digimon.dropItems) === null || _a === void 0 ? void 0 : _a.length) || 0) * 28;
                // console.log(event.pageY, modalHeight, "  ", window.innerHeight)
                // console.log(event.pageY + modalHeight, "  ", window.innerHeight - 20)
                if (event.pageY + modalHeight >= window.innerHeight - 10) {
                    setDropsModalPosition({ top: window.innerHeight - modalHeight - mapRect.top - 10, left: event.pageX - mapRect.left + 2 });
                }
                else {
                    setDropsModalPosition({ top: event.pageY - mapRect.top - 10, left: event.pageX - mapRect.left + 2 });
                }
                setIsOpenDrops(true);
                setIsOpenShop(false);
            }
            else {
                setIsOpenDrops(false);
                setIsOpenShop(false);
            }
        }
    };
    const mouseLeaveHandler = (event) => {
        const relatedTarget = event.relatedTarget;
        if (relatedTarget.classList.contains("modal") || relatedTarget.classList.contains("map-container"))
            return;
        setIsOpenDrops(false);
        setIsOpenShop(false);
    };
    const getItems = () => {
        var _a;
        const temp = new Set();
        if (!map.monsters)
            return [];
        for (const monster of map.monsters) {
            (_a = monster.dropItems) === null || _a === void 0 ? void 0 : _a.forEach(itemId => {
                const item = (0, getItemsFunctions_1.getItemById)(itemId);
                // if(item.type === 3 || item.type === 4 || item.type === 5) {
                temp.add(item);
                // }
            });
        }
        const items = [...temp.values()];
        if (items.length === 0)
            return [];
        items.sort((a, b) => {
            const typeSub = a.type - b.type;
            if (typeSub !== 0)
                return typeSub;
            return a.id - b.id;
        });
        const flags = (0, getDropItemFilteringFlags_1.makeAllInFlags)(items);
        // const flags = new Array();
        // items.forEach(item => flags.push(item.id));
        setItemCheckFlags(flags);
        return items;
    };
    const items = (0, react_1.useMemo)(() => getItems(), [map]);
    const hasCheckedItem = (monster) => {
        var _a;
        if (!monster.dropItems && enums_1.NoDropMonsters.includes(monster.name))
            return true;
        for (let i = 0; i < ((_a = monster.dropItems) === null || _a === void 0 ? void 0 : _a.length); i++) {
            const keys = Object.keys(itemCheckFlags);
            for (let j = 0; j < keys.length; j++) {
                if (itemCheckFlags[`${keys[j]}`].includes(monster.dropItems[i]))
                    return true;
            }
            // if(itemCheckFlags.includes(monster.dropItems[i]))
            //     return true;
        }
        return false;
    };
    if (!map)
        return (react_1.default.createElement("div", { className: "map-viewer" }));
    const portals = (0, react_1.useMemo)(() => {
        return map.portals && map.portals.map(portal => (react_1.default.createElement("img", { src: "/images/\uD3EC\uD0C8.png", className: `object portal ${showPortal ? "" : "hide"}`, style: { top: `${portal.point.y}px`, left: `${portal.point.x}px` }, title: portal.description, key: (0, commons_1.getUUID)() })));
    }, [showPortal, map]);
    const warps = (0, react_1.useMemo)(() => {
        return map.warps && map.warps.map(warp => (react_1.default.createElement("img", { src: "/images/\uC6CC\uD504 \uD3EC\uC778\uD2B8.png", className: `object warp ${showWarp ? "" : "hide"}`, style: { top: `${warp.point.y}px`, left: `${warp.point.x}px` }, title: `${warp.description}\n워프 포인트`, key: (0, commons_1.getUUID)() })));
    }, [showWarp, map]);
    const shops = (0, react_1.useMemo)(() => {
        return map.shops && map.shops.map(shop => (react_1.default.createElement("img", { src: "/images/\uC0C1\uC810.png", className: `object shop ${showShop ? "" : "hide"}`, style: { top: `${shop.point.y}px`, left: `${shop.point.x}px` }, title: shop.type === "common" ? "소모품 상인" : "배틀아이템 상인", id: shop.type, key: (0, commons_1.getUUID)() })));
    }, [showShop, map]);
    const monsters = (0, react_1.useMemo)(() => {
        return map.monsters && map.monsters.map(monster => (react_1.default.createElement(MonsterShortcut_1.default, { monster: monster, hasDropItem: hasCheckedItem, key: (0, commons_1.getUUID)() })));
    }, [itemCheckFlags, map]);
    const cubes = (0, react_1.useMemo)(() => {
        return map.cubes && map.cubes.map(cube => (react_1.default.createElement("img", { src: "/images/\uB370\uB028.png", className: `object cube ${showCube ? "" : "hide"}`, style: { top: `${cube.point.y}px`, left: `${cube.point.x}px` }, title: `데뀨 #${cube.id}`, key: (0, commons_1.getUUID)() })));
    }, [showCube, map]);
    const shopModal = (0, react_1.useMemo)(() => { var _a, _b; return react_1.default.createElement(ShopModal_1.default, { isOpen: isOpenShop, items: (_b = (_a = selectedShop.current) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [], position: shopModalPosition }); }, [isOpenShop, shopModalPosition]);
    const monsterModal = (0, react_1.useMemo)(() => react_1.default.createElement(DropsModal_1.default, { isOpen: isOpenDrops, monster: selectedDigimon.current, position: dropsModalPosition }), [isOpenDrops, dropsModalPosition]);
    return (react_1.default.createElement("div", { className: "map-viewer" },
        react_1.default.createElement("div", { className: "map-container", onMouseMove: captureMouse, onMouseLeave: mouseLeaveHandler },
            react_1.default.createElement("img", { className: "map", src: `/images/${map.name}.png` }),
            monsters,
            portals,
            warps,
            shops,
            cubes),
        react_1.default.createElement(ObjectFilter_1.default, { portal: showPortal, setPortal: setShowPortal, warp: showWarp, setWarp: setShowWarp, shop: showShop, setShop: setShowShop, itemCheckFlags: itemCheckFlags, setItemCheckFlags: setItemCheckFlags, items: items, cube: showCube, setCube: setShowCube }),
        shopModal,
        monsterModal));
}
exports.default = MapViewer;
