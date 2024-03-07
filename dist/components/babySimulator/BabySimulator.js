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
const babySimulatorFunctions_1 = require("../../functions/babySimulatorFunctions");
const functions_1 = require("../../functions");
const getItemsFunctions_1 = require("../../functions/getItemsFunctions");
const enums_1 = require("../../enums");
const toRightProfileGroup_1 = __importDefault(require("../evolution/toRightProfileGroup"));
const commons_1 = require("../../functions/commons");
const profile_1 = __importDefault(require("../evolution/profile"));
const toRightProfileLine_1 = __importDefault(require("../evolution/toRightProfileLine"));
const RadarChart_1 = __importDefault(require("./RadarChart"));
const Gauges_1 = __importDefault(require("./Gauges"));
const eggs = [
    (0, getItemsFunctions_1.getItemByName)("유년기1 디지타마(6시간)"),
    (0, getItemsFunctions_1.getItemByName)("유년기2 디지타마(6시간)"),
    (0, getItemsFunctions_1.getItemByName)("도도몬 디지타마"),
    (0, getItemsFunctions_1.getItemByName)("쟈리몬 디지타마"),
    (0, getItemsFunctions_1.getItemByName)("제리몬 디지타마"),
    (0, getItemsFunctions_1.getItemByName)("치코몬 디지타마"),
    (0, getItemsFunctions_1.getItemByName)("키몬 디지타마")
];
function BabySimulator() {
    const [babies, setBabies] = (0, react_1.useState)((0, functions_1.getAllEvolutions)(false).filter(each => each.grade <= 2));
    const [babyItems, setBabyItems] = (0, react_1.useState)((0, babySimulatorFunctions_1.getBabyItems)());
    const [selectedEgg, setSelectedEgg] = (0, react_1.useState)();
    const [babyStatus, setBabyStatus] = (0, react_1.useState)();
    const [dateObj, setDateObj] = (0, react_1.useState)({ start: null, nowText: null });
    const [interact, setInteract] = (0, react_1.useState)({ play: 3, feed: 5 });
    const [openModalName, setOpenModalName] = (0, react_1.useState)("");
    const [logs, setLogs] = (0, react_1.useState)([]);
    const [childResult, setChildResult] = (0, react_1.useState)();
    const hatchEgg = () => {
        if (!selectedEgg)
            return;
        const baby = (0, babySimulatorFunctions_1.hatch)(selectedEgg);
        (0, functions_1.getJustAfterEvolution)(baby.digimon);
        setBabyStatus(baby);
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        dateObj.start = new Date(`${year}-${month}-${day} 22:30`);
        dateObj.nowText = `${year}-${month}-${day} 22:30`;
        setDateObj(Object.assign({}, dateObj));
    };
    const canPlay = () => interact.play > 0;
    const canFeed = () => interact.feed > 0;
    const feedTheFood = (food) => {
        if (!canFeed()) {
            alert("오늘의 먹이주기가 끝났습니다.\n시간을 경과시켜주세요.");
            return;
        }
        const ate = (0, babySimulatorFunctions_1.feed)(babyStatus, food);
        if (!ate) {
            alert("배가 불러 음식을 먹을 수 없습니다.\n시간을 경과시키거나,\n놀아주기를 통해 포만 지수를 감소시키세요.");
            return;
        }
        interact.feed--;
        logs.splice(0, 0, {
            type: "feed",
            item: food,
            text: food.effects.map(effect => `${effect.name} + ${effect.value}`).join(", "),
            dateText: dateObj.nowText
        });
        setLogs([...logs]);
        setInteract(Object.assign({}, interact));
        setBabyStatus(Object.assign({}, babyStatus));
    };
    const playWith = (toy) => {
        if (!canPlay()) {
            alert("오늘의 놀아주기가 끝났습니다.\n시간을 경과시켜주세요.");
            return;
        }
        const sameDayUseLogs = logs.filter(log => {
            const logDate = new Date(log.dateText);
            const now = new Date(dateObj.nowText);
            return log.type === "play" &&
                logDate.getDate() === now.getDate() &&
                log.item &&
                log.item.name === toy.name;
        });
        if (sameDayUseLogs.length > 0) {
            alert("오늘 이미 사용한 장난감입니다.\n같은 이름의 장난감은 하루에 하나만 사용할 수 있습니다.");
            return;
        }
        const played = (0, babySimulatorFunctions_1.play)(babyStatus, toy);
        if (!played) {
            alert("배가 고파 놀아줄 수 없습니다.\n먹이주기를 통해 포만 지수를 증가시키세요.");
            return;
        }
        interact.play--;
        logs.splice(0, 0, {
            type: "play",
            item: toy,
            text: `성장 지수 + ${toy.stature}, 만족도 + ${toy.satisfaction}, 포만 지수 - ${toy.fullness}`,
            dateText: dateObj.nowText
        });
        setLogs([...logs]);
        setInteract(Object.assign({}, interact));
        setBabyStatus(Object.assign({}, babyStatus));
    };
    const pass90Mins = () => {
        const log = (0, babySimulatorFunctions_1.pass90Min)(babyStatus, dateObj.nowText);
        const newLogs = [log, ...logs];
        const before = new Date(dateObj.nowText);
        const beforeDay = before.getDate();
        const now = new Date(before.getTime() + 90 * 60 * 1000);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");
        dateObj.nowText = `${year}-${month}-${day} ${hour}:${minute}`;
        setDateObj(Object.assign({}, dateObj));
        setLogs(newLogs);
        setBabyStatus(Object.assign({}, babyStatus));
        if (now.getDate() - beforeDay > 0) {
            setInteract({ play: 3, feed: 5 });
        }
    };
    const passADay = () => {
        const dayLogs = (0, babySimulatorFunctions_1.passOneDay)(babyStatus, dateObj.nowText);
        const newLogs = [...dayLogs, ...logs];
        const before = new Date(dateObj.nowText);
        const now = new Date(before.getTime() + 24 * 60 * 60 * 1000);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");
        dateObj.nowText = `${year}-${month}-${day} ${hour}:${minute}`;
        setLogs(newLogs);
        setBabyStatus(Object.assign({}, babyStatus));
        setInteract({ play: 3, feed: 5 });
    };
    const fireEvolve = () => {
        if (!babyStatus)
            return;
        if (babyStatus.stature !== 100) {
            alert("성장 지수가 100 일때만 진화할 수 있습니다.\n놀아주기를 통해 성장지수를 올려보세요.");
            return;
        }
        const result = (0, babySimulatorFunctions_1.evolve)(babyStatus);
        (0, functions_1.getJustAfterEvolution)(result.digimon);
        if (result.digimon.grade === 2) {
            setBabyStatus(Object.assign({}, result));
            return;
        }
        // 최종 결산
        console.log(result);
        setChildResult(Object.assign({}, result));
    };
    const getPassedTimeString = () => {
        if (!dateObj.start || !dateObj.nowText)
            return;
        let dateString = `${dateObj.start.getFullYear()}-${String(dateObj.start.getMonth() + 1).padStart(2, "0")}-${String(dateObj.start.getDate()).padStart(2, "0")} ${String(dateObj.start.getHours()).padStart(2, "0")}:${String(dateObj.start.getMinutes()).padStart(2, "0")} ~ `;
        const start = dateObj.start.getTime();
        const passed = logs.filter(log => log.type === "90time").length * 90;
        const end = new Date(start + passed * 60 * 1000);
        dateString += `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")} ${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
        const date = Math.floor(passed / (24 * 60));
        const hours = Math.floor((passed - (date * 24 * 60)) / 60);
        const minutes = passed - date * 24 * 60 - hours * 60;
        dateString += ` (${date}일 ${hours}시간 ${minutes}분)`;
        return dateString;
    };
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "baby-simulator-container" },
            react_1.default.createElement("div", { className: "baby-simulator" },
                react_1.default.createElement("div", { className: "hatch-container" },
                    react_1.default.createElement("img", { src: "/images/hatch.png", style: { width: "400px" } }),
                    babyStatus && react_1.default.createElement("img", { src: `/images/${babyStatus.digimon.name}.png`, className: "selected", style: { top: "170px", left: "405px" } }),
                    babyStatus &&
                        react_1.default.createElement("div", { className: "interact-buttons" },
                            react_1.default.createElement("button", { type: "button", onClick: () => {
                                    if (openModalName !== "toy")
                                        setOpenModalName("toy");
                                    else
                                        setOpenModalName("");
                                } },
                                react_1.default.createElement("img", { src: "/images/\uC12C_\uB180\uC544\uC8FC\uAE30.png" }),
                                react_1.default.createElement("span", null,
                                    "\uB180\uC544\uC8FC\uAE30(",
                                    interact.play,
                                    "/3)")),
                            react_1.default.createElement("div", { className: `modal ${openModalName === "toy" ? "active" : ""}`, style: { transform: "translate(40%, 40%)" } },
                                react_1.default.createElement("div", { className: "window" },
                                    react_1.default.createElement("div", { className: "toys" }, babyItems.toys.map(toy => (react_1.default.createElement("button", { type: "button", onClick: () => playWith(toy), key: (0, commons_1.getUUID)() },
                                        react_1.default.createElement("img", { src: `/images/${toy.name}.png` }),
                                        react_1.default.createElement("div", { className: "description" },
                                            react_1.default.createElement("span", { className: "title" }, toy.name),
                                            react_1.default.createElement("span", null,
                                                "\uC131\uC7A5 \uC9C0\uC218 + ",
                                                toy.stature),
                                            react_1.default.createElement("span", null,
                                                "\uB9CC\uC871\uB3C4 + ",
                                                toy.satisfaction),
                                            react_1.default.createElement("span", null,
                                                "\uD3EC\uB9CC \uC9C0\uC218 - ",
                                                toy.fullness)))))))),
                            react_1.default.createElement("button", { type: "button", onClick: () => {
                                    if (openModalName !== "feed")
                                        setOpenModalName("feed");
                                    else
                                        setOpenModalName("");
                                } },
                                react_1.default.createElement("img", { src: "/images/\uC12C_\uBA39\uC774\uC8FC\uAE30.png" }),
                                react_1.default.createElement("span", null,
                                    "\uBA39\uC774\uC8FC\uAE30(",
                                    interact.feed,
                                    "/5)")),
                            react_1.default.createElement("div", { className: `modal ${openModalName === "feed" ? "active" : ""}`, style: { transform: "translate(100%, 40%)" } },
                                react_1.default.createElement("div", { className: "window" },
                                    react_1.default.createElement("div", { className: "toys" }, babyItems.feeds.map(food => (react_1.default.createElement("button", { type: "button", onClick: () => feedTheFood(food), key: (0, commons_1.getUUID)() },
                                        react_1.default.createElement("img", { src: `/images/${food.name}.png` }),
                                        react_1.default.createElement("div", { className: "description" },
                                            react_1.default.createElement("span", { className: "title" }, food.name),
                                            react_1.default.createElement("span", null,
                                                "\uD3EC\uB9CC \uC9C0\uC218 + ",
                                                food.fullness),
                                            food.effects.map(effect => react_1.default.createElement("span", { key: (0, commons_1.getUUID)() },
                                                effect.name,
                                                " + ",
                                                effect.value))))))))),
                            react_1.default.createElement("button", { type: "button", onClick: pass90Mins },
                                react_1.default.createElement("img", { src: "/images/\uD0C0\uC784\uBAAC\uC758 \uC2DC\uACC4\uBC14\uB298(1\uC2DC\uAC04).png" }),
                                react_1.default.createElement("span", null, "90\uBD84 \uACBD\uACFC")),
                            react_1.default.createElement("button", { type: "button", onClick: passADay },
                                react_1.default.createElement("img", { src: "/images/\uD0C0\uC784\uBAAC\uC758 \uC2DC\uACC4\uBC14\uB298(1\uC2DC\uAC04).png" }),
                                react_1.default.createElement("span", null, "1\uC77C \uACBD\uACFC")))),
                react_1.default.createElement("div", { className: "simulator-logs-container" },
                    react_1.default.createElement("div", { className: "title" }, "\uB85C\uADF8"),
                    react_1.default.createElement("div", { className: "simulator-logs" }, logs.map(log => {
                        if (log.type === "feed")
                            return react_1.default.createElement("div", { className: "log", key: (0, commons_1.getUUID)() },
                                react_1.default.createElement("div", { className: "title" },
                                    "\uBA39\uC774\uC8FC\uAE30",
                                    react_1.default.createElement("img", { src: `/images/${log.item.name}.png` })),
                                react_1.default.createElement("div", { className: "description" }, log.text));
                        if (log.type === "play")
                            return react_1.default.createElement("div", { className: "log", key: (0, commons_1.getUUID)() },
                                react_1.default.createElement("div", { className: "title" },
                                    "\uB180\uC544\uC8FC\uAE30",
                                    react_1.default.createElement("img", { src: `/images/${log.item.name}.png` })),
                                react_1.default.createElement("div", { className: "description" }, log.text));
                        return react_1.default.createElement("div", { className: "log", key: (0, commons_1.getUUID)() },
                            react_1.default.createElement("div", { className: "title" },
                                "90\uBD84 \uACBD\uACFC",
                                react_1.default.createElement("img", { src: `/images/타임몬의 시계바늘(1시간).png` })),
                            react_1.default.createElement("div", { className: "description" }, log.text));
                    })))),
            !babyStatus &&
                react_1.default.createElement("div", { className: "egg-selector" },
                    react_1.default.createElement("div", { className: "eggs" }, eggs.map(egg => (react_1.default.createElement("button", { className: `egg ${(selectedEgg === null || selectedEgg === void 0 ? void 0 : selectedEgg.id) === egg.id ? "selected" : ""}`, key: (0, commons_1.getUUID)(), onClick: () => setSelectedEgg(egg) },
                        react_1.default.createElement("img", { src: `/images/${egg.name}.png` }),
                        react_1.default.createElement("span", null, egg.name.replace("(6시간)", "")))))),
                    react_1.default.createElement("button", { className: "submit", onClick: hatchEgg }, "\uBD80\uD654")),
            babyStatus &&
                react_1.default.createElement("div", { className: "baby-informations" },
                    react_1.default.createElement("div", { className: "baby-status-container" },
                        react_1.default.createElement("div", { className: "baby-status" },
                            react_1.default.createElement("div", { className: "baby-shorcut" },
                                react_1.default.createElement("div", { className: "title" }, babyStatus.digimon.name),
                                react_1.default.createElement("img", { src: `/images/${babyStatus.digimon.name}.png` }),
                                react_1.default.createElement("div", { className: "grade" }, enums_1.Grades[babyStatus.digimon.grade])),
                            react_1.default.createElement("div", { className: "baby-status-description" },
                                react_1.default.createElement("div", { className: "time-container" },
                                    "\uD604\uC7AC \uC2DC\uAC01 : ",
                                    dateObj.nowText),
                                react_1.default.createElement("div", { className: "gauge-container" },
                                    react_1.default.createElement("div", { className: "gauge-title-container" },
                                        react_1.default.createElement("div", { className: "title" }, "\uC131\uC7A5 \uC9C0\uC218"),
                                        react_1.default.createElement("div", { className: "value" },
                                            "(",
                                            babyStatus.stature,
                                            "/100)")),
                                    react_1.default.createElement("div", { className: "gauge-track" },
                                        react_1.default.createElement("span", { className: "gauge cyan", style: { width: `${(babyStatus.stature / 100 * 100)}%` } }))),
                                react_1.default.createElement("div", { className: "gauge-container" },
                                    react_1.default.createElement("div", { className: "gauge-title-container" },
                                        react_1.default.createElement("div", { className: "title" },
                                            "\uD3EC\uB9CC \uC9C0\uC218(",
                                            (0, babySimulatorFunctions_1.getFullnessState)(babyStatus),
                                            ")"),
                                        react_1.default.createElement("div", { className: "value" },
                                            "(",
                                            babyStatus.fullness,
                                            "/300)")),
                                    react_1.default.createElement("div", { className: "gauge-track" },
                                        react_1.default.createElement("span", { className: "gauge orange", style: { width: `${Math.round((babyStatus.fullness / 300) * 100)}%` } }))),
                                react_1.default.createElement("div", { className: "gauge-container" },
                                    react_1.default.createElement("div", { className: "gauge-title-container" },
                                        react_1.default.createElement("div", { className: "title" }, "\uB9CC\uC871\uB3C4"),
                                        react_1.default.createElement("div", { className: "value" },
                                            babyStatus.satisfaction,
                                            "%")),
                                    react_1.default.createElement("div", { className: "gauge-track-dot" }, babySimulatorFunctions_1.successCellRange.map((v, index) => {
                                        const standard = Math.floor((index + 1) * 12.5);
                                        const sub = babyStatus.satisfaction - standard;
                                        if (sub >= 0)
                                            return react_1.default.createElement("span", { className: `gauge-dot ${index === 0 ? "red" : "blue"}`, key: (0, commons_1.getUUID)(), style: { width: `calc(12.5% - 5px)` } });
                                        if (sub > -12.5)
                                            return react_1.default.createElement("span", { className: `gauge-dot ${index === 0 ? "red" : "blue"}`, key: (0, commons_1.getUUID)(), style: { width: `calc(${(sub + 12.5)}%)` } });
                                        return react_1.default.createElement("span", { className: "gauge-dot blank", key: (0, commons_1.getUUID)() });
                                    })))),
                            react_1.default.createElement(RadarChart_1.default, { weighted: babyStatus.weighted })),
                        react_1.default.createElement("button", { type: "button", className: "evolve", onClick: fireEvolve }, "\uC9C4\uD654")),
                    react_1.default.createElement("div", { className: "baby-evolution-container" },
                        react_1.default.createElement("div", { className: "title" }, "\uC9C4\uD654\uD2B8\uB9AC"),
                        babyStatus && babyStatus.digimon.afters &&
                            react_1.default.createElement("div", { className: "baby-evolutions" },
                                react_1.default.createElement(profile_1.default, { digimon: babyStatus.digimon }),
                                react_1.default.createElement(toRightProfileLine_1.default, { digimon: babyStatus.digimon }),
                                react_1.default.createElement(toRightProfileGroup_1.default, { digimon: babyStatus.digimon, key: (0, commons_1.getUUID)() }))))),
        childResult &&
            react_1.default.createElement("div", { className: "modal active", id: "baby-simulator-result-modal" },
                react_1.default.createElement("div", { className: "window" },
                    react_1.default.createElement("div", { className: "baby-simulator-result" },
                        react_1.default.createElement("div", { className: "title big" }, "\uC720\uB144\uAE30 \uC9C4\uD654 \uACB0\uACFC"),
                        react_1.default.createElement("div", { className: "child-evolution-info" },
                            react_1.default.createElement("div", { className: "child-digimon" },
                                react_1.default.createElement("img", { src: `/images/${childResult.digimon.name}.png` }),
                                react_1.default.createElement("div", { className: "child-digimon-shortcut" },
                                    react_1.default.createElement("div", { className: "digimon-name" }, childResult.digimon.name),
                                    react_1.default.createElement("img", { src: `/images/${childResult.digimon.digimonType}.png` }))),
                            react_1.default.createElement(Gauges_1.default, { gauges: childResult.adjustments })),
                        react_1.default.createElement("div", { className: "title" }, "\uC0AC\uC6A9 \uC544\uC774\uD15C \uC218\uB7C9"),
                        react_1.default.createElement("div", { className: "spent-currencies" },
                            react_1.default.createElement("div", { className: "foods" }, logs.filter(log => log.type === "feed").map((food, index, array) => {
                                if (index !== 0) {
                                    const hasBefore = array.slice(0, index).find(each => each.item.name === food.item.name);
                                    if (hasBefore)
                                        return "";
                                }
                                return react_1.default.createElement("div", { className: "spent-item" },
                                    react_1.default.createElement("img", { src: `/images/${food.item.name}.png` }),
                                    react_1.default.createElement("div", { className: "spent-item-info" },
                                        react_1.default.createElement("div", { className: "title" }, food.item.name),
                                        react_1.default.createElement("span", null,
                                            array.filter(each => each.item.name === food.item.name).length,
                                            "\uAC1C")));
                            })),
                            react_1.default.createElement("div", { className: "toys" }, logs.filter(log => log.type === "play").map((toy, index, array) => {
                                if (index !== 0) {
                                    const hasBefore = array.slice(0, index).find(each => each.item.name === toy.item.name);
                                    if (hasBefore)
                                        return null;
                                }
                                return react_1.default.createElement("div", { className: "spent-item" },
                                    react_1.default.createElement("img", { src: `/images/${toy.item.name}.png` }),
                                    react_1.default.createElement("div", { className: "spent-item-info" },
                                        react_1.default.createElement("div", { className: "title" }, toy.item.name),
                                        react_1.default.createElement("span", null,
                                            array.filter(each => each.item.name === toy.item.name).length,
                                            "\uAC1C")));
                            }))),
                        react_1.default.createElement("div", { className: "title" }, "\uCD1D \uC18C\uC694\uC2DC\uAC04"),
                        react_1.default.createElement("div", { className: "title" },
                            getPassedTimeString(),
                            " "),
                        react_1.default.createElement("button", { type: "button", className: "refresh", onClick: () => window.location.reload() }, "\uB2E4\uC2DC\uD558\uAE30"))))));
}
exports.default = BabySimulator;
