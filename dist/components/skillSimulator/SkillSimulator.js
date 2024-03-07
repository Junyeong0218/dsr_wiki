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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const functions_1 = require("../../functions");
const searchFunctions_1 = require("../../functions/searchFunctions");
const enums_1 = require("../../enums");
const commons_1 = require("../../functions/commons");
const digimonStatus_1 = __importDefault(require("../digidex/digimonStatus"));
const getItemsFunctions_1 = require("../../functions/getItemsFunctions");
const skillSimulatorFunctions_1 = require("../../functions/skillSimulatorFunctions");
const getDefaultSpent = (grade) => {
    if (grade === undefined || grade > 6 || grade < 3)
        return {
            spentItems: [],
            bits: 0
        };
    const gradeKor = enums_1.Grades[grade];
    const defaultCube = (0, getItemsFunctions_1.getItemByName)(`${gradeKor} 스킬 강화석`);
    const upItem1 = (0, getItemsFunctions_1.getItemByName)("고급 강화 재료");
    const upItem2 = (0, getItemsFunctions_1.getItemByName)("최고급 강화 재료", false);
    const downItem1 = (0, getItemsFunctions_1.getItemByName)("최하급 스킬 보호석");
    return {
        spentItems: [
            { item: defaultCube, count: 0 },
            { item: upItem1, count: 0 },
            { item: upItem2, count: 0 },
            { item: downItem1, count: 0 }
        ],
        bits: 0
    };
};
function SkillSimulator() {
    const all = (0, react_1.useRef)((0, functions_1.getAllDigimons)(false));
    const [text, setText] = (0, react_1.useState)("");
    const [filtered, setFiltered] = (0, react_1.useState)(all.current);
    const [selectedDigimon, setSelectedDigimon] = (0, react_1.useState)();
    const [skillLevels, setSkillLevels] = (0, react_1.useState)({ 1: 1, 2: 1, 3: 1 });
    const [skillIndex, setSkillIndex] = (0, react_1.useState)();
    const [openFlag, setOpenFlag] = (0, react_1.useState)("");
    const [enhanceHelper, setEnhanceHelper] = (0, react_1.useState)({ upId: 0, downId: 0 });
    const [spent, setSpent] = (0, react_1.useState)(getDefaultSpent(selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade));
    const enhanceRate = (0, react_1.useMemo)(() => {
        return (0, skillSimulatorFunctions_1.getEnhanceRate)(selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade, skillIndex === undefined ? 1 : skillLevels[skillIndex + 1]);
    }, [selectedDigimon, skillLevels, skillIndex]);
    (0, react_1.useEffect)(() => {
        const d = getDefaultSpent(selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade);
        // setSpent(getDefaultSpent(selectedDigimon?.grade));
        setSpent(d);
    }, [selectedDigimon]);
    const getSuccessRate = () => {
        if (skillIndex === undefined)
            return 0;
        if (skillLevels[skillIndex + 1] === 10)
            return 0;
        let rate = enhanceRate.successRate * 100;
        const upItem = (0, getItemsFunctions_1.getItemById)(enhanceHelper.upId);
        if ((upItem === null || upItem === void 0 ? void 0 : upItem.name) === "고급 강화 재료")
            rate += 10;
        if ((upItem === null || upItem === void 0 ? void 0 : upItem.name) === "최고급 강화 재료")
            rate += 15;
        if (rate > 100)
            rate = 100;
        return rate;
    };
    const getFailRate = () => {
        const successRate = getSuccessRate();
        return 100 - successRate;
    };
    const getDownRate = () => {
        if (skillIndex === undefined)
            return 0;
        if (skillLevels[skillIndex + 1] === 10)
            return 0;
        let rate = enhanceRate.downRate * 100;
        const downItem = (0, getItemsFunctions_1.getItemById)(enhanceHelper.downId);
        if (downItem)
            rate -= 5;
        if (rate < 0)
            rate = 0;
        return rate;
    };
    const getSuccessRateText = () => {
        const upItem = (0, getItemsFunctions_1.getItemById)(enhanceHelper.upId);
        if (!upItem)
            return "";
        return ` (${upItem.name} 적용)`;
    };
    const getDownRateText = () => {
        const downItem = (0, getItemsFunctions_1.getItemById)(enhanceHelper.downId);
        if (!downItem)
            return "";
        return ` (${downItem.name} 적용)`;
    };
    const updateText = (event) => {
        const target = event.target;
        if (target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = target.value.trim();
            if (typed === "") {
                setText(typed);
                setFiltered([...all.current]);
            }
            else if (!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = (0, searchFunctions_1.getSearchedDigimons)(target.value.trim());
                setFiltered(searched);
            }
        }
    };
    const getDefaultBit = (grade) => {
        if (grade === undefined)
            return 0;
        if (grade === 3)
            return 1000;
        if (grade === 4)
            return 2000;
        if (grade === 5)
            return 5000;
        return 10000;
    };
    const enhance = (event) => {
        const target = event.target;
        if (target.classList.contains("disabled"))
            return;
        if (!selectedDigimon)
            return;
        if (skillIndex === undefined)
            return;
        if (skillLevels[skillIndex + 1] > 9) {
            alert("이미 최고레벨입니다.");
            return;
        }
        target.classList.add("disabled");
        const upItem = (0, getItemsFunctions_1.getItemById)(enhanceHelper.upId);
        const downItem = (0, getItemsFunctions_1.getItemById)(enhanceHelper.downId);
        const result = (0, skillSimulatorFunctions_1.enhanceSkill)(selectedDigimon.grade, skillLevels[skillIndex + 1], enhanceHelper);
        const enhanceInfo = {
            grade: selectedDigimon.grade,
            from: skillLevels[skillIndex + 1],
            to: skillLevels[skillIndex + 1] + 1,
            upItem: upItem !== null && upItem !== void 0 ? upItem : null,
            downItem: downItem !== null && downItem !== void 0 ? downItem : null,
            result: result !== null && result !== void 0 ? result : null
        };
        fetch('/.netlify/functions/insertEnhanceLog', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enhanceInfo)
        }).then((response) => __awaiter(this, void 0, void 0, function* () {
            const dbInsertResult = yield response.json();
            if (dbInsertResult.result === true) {
                if (result === "success") {
                    skillLevels[skillIndex + 1]++;
                }
                else if (result === "down") {
                    skillLevels[skillIndex + 1]--;
                }
                spent.bits += getDefaultBit(selectedDigimon.grade);
                spent.spentItems[0].count++;
                if (upItem) {
                    if (upItem.name === "고급 강화 재료")
                        spent.spentItems[1].count++;
                    else if (upItem.name === "최고급 강화 재료")
                        spent.spentItems[2].count++;
                }
                if (downItem) {
                    if (downItem.name === "최하급 스킬 보호석")
                        spent.spentItems[3].count++;
                }
                setSkillLevels(Object.assign({}, skillLevels));
                setSpent(Object.assign({}, spent));
            }
        })).catch(error => {
            alert("데이터베이스 오류");
        }).finally(() => {
            target.classList.remove("disabled");
        });
    };
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "skill-simulator-container" },
            react_1.default.createElement("div", { className: "digimon-selector" },
                react_1.default.createElement("div", { className: "search-bar" },
                    react_1.default.createElement("input", { type: "text", value: text, onChange: updateText, placeholder: "\uB514\uC9C0\uBAAC \uCD08\uC131 \uD639\uC740 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694." })),
                text === "" && !selectedDigimon && react_1.default.createElement("div", { className: "digimons" }, "\u2191 \uB514\uC9C0\uBAAC \uAC80\uC0C9 \u2191"),
                text === "" && selectedDigimon &&
                    react_1.default.createElement("div", { className: "selected-digimon-info" },
                        react_1.default.createElement("img", { src: `/images/${selectedDigimon.name}.png` }),
                        react_1.default.createElement("div", { className: "digimon-info-shortcut" },
                            react_1.default.createElement("span", { className: "name" }, selectedDigimon.name),
                            react_1.default.createElement("span", { className: "grade" }, enums_1.Grades[selectedDigimon.grade]),
                            react_1.default.createElement("span", { className: "element" },
                                "\uC18D\uC131 :\u00A0",
                                react_1.default.createElement("img", { src: `/images/${selectedDigimon.digimonType}.png` })))),
                text === "" && selectedDigimon && react_1.default.createElement(digimonStatus_1.default, { digimon: selectedDigimon }),
                text !== "" &&
                    react_1.default.createElement("div", { className: "digimons" }, filtered.map(digimon => (react_1.default.createElement("div", { className: "digimon", key: (0, commons_1.getUUID)(), onClick: () => {
                            setText("");
                            setSelectedDigimon(digimon);
                        } },
                        react_1.default.createElement("img", { src: `/images/${digimon.name}.png` }),
                        react_1.default.createElement("div", { className: "simulator-digimon-info" },
                            digimon.tag && react_1.default.createElement("span", { className: "name", dangerouslySetInnerHTML: { __html: digimon.tag } }),
                            !digimon.tag && react_1.default.createElement("span", { className: "name" }, digimon.name),
                            react_1.default.createElement("span", { className: "grade" }, enums_1.Grades[digimon.grade]))))))),
            react_1.default.createElement("div", { className: "skill-simulator" },
                react_1.default.createElement("div", { className: "skill-list" },
                    react_1.default.createElement("div", { className: "title" }, "\uC2A4\uD0AC \uC815\uBCF4"),
                    selectedDigimon && selectedDigimon.skills.map((skill, index) => (react_1.default.createElement("div", { className: `skill ${skillIndex === index ? "selected" : ""}`, key: (0, commons_1.getUUID)(), onClick: () => setSkillIndex(index) },
                        react_1.default.createElement("img", { src: `/images/${selectedDigimon.name}_${(0, commons_1.getNameExceptColon)(skill.name)}.png`, key: (0, commons_1.getUUID)() }),
                        react_1.default.createElement("span", null, skill.name),
                        react_1.default.createElement("span", null,
                            "Lv.",
                            skillLevels[index + 1])))),
                    selectedDigimon === undefined && new Array(3).fill("", 0, 3).map(() => (react_1.default.createElement("div", { className: "skill", key: (0, commons_1.getUUID)() })))),
                selectedDigimon && skillIndex !== undefined &&
                    react_1.default.createElement("div", { className: "skill-descriptions" },
                        react_1.default.createElement("div", { className: "skill-description" },
                            react_1.default.createElement("div", { className: "title" },
                                "Lv.",
                                skillLevels[skillIndex + 1]),
                            react_1.default.createElement("span", null,
                                "\uACF5\uACA9 \uD69F\uC218 : ",
                                selectedDigimon.skills[skillIndex].attackCount,
                                "\uD0C0"),
                            react_1.default.createElement("span", null,
                                "\uC2A4\uD0AC \uACC4\uC218 :\u00A0",
                                react_1.default.createElement("mark", null,
                                    selectedDigimon.skills[skillIndex].getPercentByIndex(skillLevels[skillIndex + 1] - 1),
                                    "%")),
                            react_1.default.createElement("span", null,
                                "\uC801\uC6A9 \uB300\uC0C1 : ",
                                selectedDigimon.skills[skillIndex].range,
                                " ",
                                selectedDigimon.skills[skillIndex].target,
                                " ",
                                selectedDigimon.skills[skillIndex].targetCount),
                            react_1.default.createElement("span", null,
                                "\uC18D\uC131 :\u00A0",
                                react_1.default.createElement("img", { src: `/images/스킬_${selectedDigimon.skills[skillIndex].element}.png` }),
                                "\u00A0",
                                selectedDigimon.skills[skillIndex].element),
                            selectedDigimon.skills[skillIndex].additionalTurn &&
                                react_1.default.createElement("span", null,
                                    "\uCD94\uAC00 \uC2DC\uC804 \uD134 : ",
                                    selectedDigimon.skills[skillIndex].additionalTurn,
                                    "\uD134"),
                            selectedDigimon.skills[skillIndex].effect &&
                                react_1.default.createElement("span", null,
                                    "\uCD94\uAC00 \uD6A8\uACFC :\u00A0",
                                    react_1.default.createElement("img", { src: `/images/스킬_${selectedDigimon.skills[skillIndex].effect}.png` }),
                                    "\u00A0",
                                    selectedDigimon.skills[skillIndex].effect)),
                        react_1.default.createElement("div", { className: "arrow" }, "\u2192"),
                        selectedDigimon.skills[skillIndex].coefficients.length <= skillLevels[skillIndex + 1] &&
                            react_1.default.createElement("div", { className: "skill-description" }),
                        selectedDigimon.skills[skillIndex].coefficients.length > skillLevels[skillIndex + 1] &&
                            react_1.default.createElement("div", { className: "skill-description" },
                                react_1.default.createElement("div", { className: "title" },
                                    "Lv.",
                                    skillLevels[skillIndex + 1] + 1),
                                react_1.default.createElement("span", null,
                                    "\uACF5\uACA9 \uD69F\uC218 : ",
                                    selectedDigimon.skills[skillIndex].attackCount,
                                    "\uD0C0"),
                                react_1.default.createElement("span", null,
                                    "\uC2A4\uD0AC \uACC4\uC218 :\u00A0",
                                    react_1.default.createElement("mark", null,
                                        selectedDigimon.skills[skillIndex].getPercentByIndex(skillLevels[skillIndex + 1]),
                                        "%")),
                                react_1.default.createElement("span", null,
                                    "\uC801\uC6A9 \uB300\uC0C1 : ",
                                    selectedDigimon.skills[skillIndex].range,
                                    " ",
                                    selectedDigimon.skills[skillIndex].target,
                                    " ",
                                    selectedDigimon.skills[skillIndex].targetCount),
                                react_1.default.createElement("span", null,
                                    "\uC18D\uC131 :\u00A0",
                                    react_1.default.createElement("img", { src: `/images/스킬_${selectedDigimon.skills[skillIndex].element}.png` }),
                                    "\u00A0",
                                    selectedDigimon.skills[skillIndex].element),
                                selectedDigimon.skills[skillIndex].additionalTurn &&
                                    react_1.default.createElement("span", null,
                                        "\uCD94\uAC00 \uC2DC\uC804 \uD134 : ",
                                        selectedDigimon.skills[skillIndex].additionalTurn,
                                        "\uD134"),
                                selectedDigimon.skills[skillIndex].effect &&
                                    react_1.default.createElement("span", null,
                                        "\uCD94\uAC00 \uD6A8\uACFC :\u00A0",
                                        react_1.default.createElement("img", { src: `/images/스킬_${selectedDigimon.skills[skillIndex].effect}.png` }),
                                        "\u00A0",
                                        selectedDigimon.skills[skillIndex].effect))),
                (!selectedDigimon || skillIndex === undefined) &&
                    react_1.default.createElement("div", { className: "skill-descriptions" },
                        react_1.default.createElement("div", { className: "skill-description" },
                            react_1.default.createElement("div", { className: "title" }, "Lv.0")),
                        react_1.default.createElement("div", { className: "arrow" }, "\u2192"),
                        react_1.default.createElement("div", { className: "skill-description" },
                            react_1.default.createElement("div", { className: "title" }, "Lv.0"))),
                react_1.default.createElement("div", { className: "usable-item-container" },
                    react_1.default.createElement("div", { className: "title" }, "\uAC15\uD654 \uC7AC\uB8CC"),
                    react_1.default.createElement("div", { className: "usable-items" },
                        react_1.default.createElement("div", { className: "usable-item" },
                            react_1.default.createElement("div", { className: "cell disabled" },
                                (selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade) === 3 && react_1.default.createElement("img", { src: `/images/성장기 스킬 강화석.png` }),
                                (selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade) === 4 && react_1.default.createElement("img", { src: `/images/성숙기 스킬 강화석.png` }),
                                (selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade) === 5 && react_1.default.createElement("img", { src: `/images/완전체 스킬 강화석.png` }),
                                (selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade) === 6 && react_1.default.createElement("img", { src: `/images/궁극체 스킬 강화석.png` })),
                            react_1.default.createElement("div", { className: "title" }, "\uAE30\uBCF8 \uC7AC\uB8CC")),
                        react_1.default.createElement("div", { className: "usable-item" },
                            react_1.default.createElement("div", { className: "cell clickable", onClick: () => {
                                    if (openFlag !== "up")
                                        setOpenFlag("up");
                                    else
                                        setOpenFlag("");
                                } },
                                enhanceHelper.upId !== 0 && react_1.default.createElement("img", { src: `/images/${(0, getItemsFunctions_1.getItemById)(enhanceHelper.upId).name}.png` }),
                                enhanceHelper.upId !== 0 &&
                                    react_1.default.createElement("button", { type: "button", className: "remove-button", onClick: (event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            enhanceHelper.upId = 0;
                                            setEnhanceHelper(Object.assign({}, enhanceHelper));
                                        } },
                                        react_1.default.createElement("img", { src: "/images/remove_button.png" }))),
                            react_1.default.createElement("div", { className: "title" }, "\uC131\uACF5\uD655\uB960 UP"),
                            react_1.default.createElement("div", { className: `modal ${openFlag === "up" ? "active" : ""}` },
                                react_1.default.createElement("div", { className: "window" },
                                    react_1.default.createElement("div", { className: "items" },
                                        react_1.default.createElement("button", { type: "button", className: "item", onClick: () => {
                                                enhanceHelper.upId = (0, getItemsFunctions_1.getItemByName)("고급 강화 재료").id;
                                                setEnhanceHelper(Object.assign({}, enhanceHelper));
                                                setOpenFlag("");
                                            } },
                                            react_1.default.createElement("img", { src: "/images/\uACE0\uAE09 \uAC15\uD654 \uC7AC\uB8CC.png" }),
                                            react_1.default.createElement("div", { className: "item-info" },
                                                react_1.default.createElement("span", { className: "name" }, "\uACE0\uAE09 \uAC15\uD654 \uC7AC\uB8CC"),
                                                react_1.default.createElement("span", { className: "effect" }, "\uC131\uACF5\uD655\uB960 10% \uC99D\uAC00"))),
                                        react_1.default.createElement("button", { type: "button", className: "item", onClick: () => {
                                                enhanceHelper.upId = (0, getItemsFunctions_1.getItemByName)("최고급 강화 재료", false).id;
                                                setEnhanceHelper(Object.assign({}, enhanceHelper));
                                                setOpenFlag("");
                                            } },
                                            react_1.default.createElement("img", { src: "/images/\uCD5C\uACE0\uAE09 \uAC15\uD654 \uC7AC\uB8CC.png" }),
                                            react_1.default.createElement("div", { className: "item-info" },
                                                react_1.default.createElement("span", { className: "name" }, "\uCD5C\uACE0\uAE09 \uAC15\uD654 \uC7AC\uB8CC"),
                                                react_1.default.createElement("span", { className: "effect" }, "\uC131\uACF5\uD655\uB960 15% \uC99D\uAC00"))))))),
                        react_1.default.createElement("div", { className: "usable-item" },
                            react_1.default.createElement("div", { className: `cell ${selectedDigimon && skillIndex && (skillLevels[skillIndex + 1] > 5 && skillLevels[skillIndex + 1] < 10) ? "clickable" : "disabled"}`, onClick: (event) => {
                                    if (!event.target.classList.contains("clickable"))
                                        return;
                                    if (openFlag !== "down")
                                        setOpenFlag("down");
                                    else
                                        setOpenFlag("");
                                } },
                                enhanceHelper.downId !== 0 && react_1.default.createElement("img", { src: `/images/${(0, getItemsFunctions_1.getItemById)(enhanceHelper.downId).name}.png` }),
                                enhanceHelper.downId !== 0 &&
                                    react_1.default.createElement("button", { type: "button", className: "remove-button", onClick: (event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            enhanceHelper.downId = 0;
                                            setEnhanceHelper(Object.assign({}, enhanceHelper));
                                        } },
                                        react_1.default.createElement("img", { src: "/images/remove_button.png" }))),
                            react_1.default.createElement("div", { className: "title" }, "\uB2E8\uACC4 \uD558\uB77D\uD655\uB960 DOWN"),
                            react_1.default.createElement("div", { className: `modal ${openFlag === "down" ? "active" : ""}` },
                                react_1.default.createElement("div", { className: "window" },
                                    react_1.default.createElement("div", { className: "items" },
                                        react_1.default.createElement("button", { type: "button", className: "item", onClick: () => {
                                                enhanceHelper.downId = (0, getItemsFunctions_1.getItemByName)("최하급 스킬 보호석").id;
                                                setEnhanceHelper(Object.assign({}, enhanceHelper));
                                                setOpenFlag("");
                                            } },
                                            react_1.default.createElement("img", { src: "/images/\uCD5C\uD558\uAE09 \uC2A4\uD0AC \uBCF4\uD638\uC11D.png" }),
                                            react_1.default.createElement("div", { className: "item-info" },
                                                react_1.default.createElement("span", { className: "name" }, "\uCD5C\uD558\uAE09 \uC2A4\uD0AC \uBCF4\uD638\uC11D"),
                                                react_1.default.createElement("span", { className: "effect" }, "\uB2E8\uACC4 \uD558\uB77D \uD655\uB960 5% \uAC10\uC18C"))))))))),
                react_1.default.createElement("div", { className: "rate-container" },
                    react_1.default.createElement("div", { className: "title" }, "\uD655\uB960"),
                    react_1.default.createElement("div", { className: "rates" },
                        react_1.default.createElement("span", { className: "success" },
                            "\uC131\uACF5 \uD655\uB960 :\u00A0",
                            react_1.default.createElement("mark", null,
                                getSuccessRate(),
                                "%",
                                getSuccessRateText())),
                        react_1.default.createElement("span", { className: "fail" },
                            "\uC2E4\uD328 \uD655\uB960 :\u00A0",
                            react_1.default.createElement("mark", null,
                                getFailRate(),
                                "%")),
                        react_1.default.createElement("span", { className: "down" },
                            "\uC2E4\uD328\uC2DC \uB2E8\uACC4 \uD558\uB77D \uD655\uB960 :\u00A0",
                            react_1.default.createElement("mark", null,
                                getDownRate(),
                                "%",
                                getDownRateText())))),
                react_1.default.createElement("div", { className: "bit-container" },
                    react_1.default.createElement("div", { className: "title" }, "\uC18C\uBAA8 \uBE44\uC6A9"),
                    react_1.default.createElement("div", { className: "bits" },
                        react_1.default.createElement("span", null, getDefaultBit(selectedDigimon === null || selectedDigimon === void 0 ? void 0 : selectedDigimon.grade).toLocaleString("ko-KR")),
                        react_1.default.createElement("img", { src: "/images/\uC870\uD569 \uBE44\uD2B8 \uC544\uC774\uCF58.png" }))),
                react_1.default.createElement("div", { className: "enhance-button-container" },
                    react_1.default.createElement("button", { type: "button", className: "enhance-button", onClick: enhance }, "\uAC15\uD654"))),
            react_1.default.createElement("div", { className: "result-container" },
                react_1.default.createElement("div", { className: "spent-container" },
                    react_1.default.createElement("div", { className: "title" }, "\uC18C\uBAA8\uB41C \uC7AC\uD654"),
                    react_1.default.createElement("div", { className: "spents" }, spent.spentItems.map(spentItem => (react_1.default.createElement("div", { className: "spent", key: (0, commons_1.getUUID)() },
                        react_1.default.createElement("img", { src: `/images/${spentItem.item.name}.png` }),
                        react_1.default.createElement("div", { className: "spent-info" },
                            react_1.default.createElement("span", null, spentItem.item.name),
                            react_1.default.createElement("span", null,
                                "\uC0AC\uC6A9 \uC218\uB7C9 : ",
                                spentItem.count.toLocaleString("ko-KR"),
                                " \uAC1C"))))))),
                react_1.default.createElement("div", { className: "bit-container" },
                    react_1.default.createElement("div", { className: "title" }, "\uC18C\uBAA8\uB41C \uBE44\uC6A9"),
                    react_1.default.createElement("div", { className: "bits" },
                        react_1.default.createElement("span", null, spent.bits.toLocaleString("ko-KR")),
                        react_1.default.createElement("img", { src: "/images/\uC870\uD569 \uBE44\uD2B8 \uC544\uC774\uCF58.png" })))))));
}
exports.default = SkillSimulator;
