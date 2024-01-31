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
const adjustmentFunctions_1 = require("../../functions/adjustmentFunctions");
const Gauges_1 = __importDefault(require("./Gauges"));
const Status_1 = __importDefault(require("./Status"));
const SpentItems_1 = __importDefault(require("./SpentItems"));
function Adjustments() {
    const defaultGauges = (0, adjustmentFunctions_1.getDefaultGauges)();
    const defaultSpentItems = (0, adjustmentFunctions_1.getDefaultSpentItems)();
    const [position, setPosition] = (0, react_1.useState)(0);
    const [gauges, setGauges] = (0, react_1.useState)(defaultGauges);
    const [mode, setMode] = (0, react_1.useState)(null);
    const [spentItems, setSpentItems] = (0, react_1.useState)(defaultSpentItems);
    const movePosition = (event) => {
        const button = event.target;
        let newPosition = position;
        if (button.id === "digivice_up") {
            newPosition--;
        }
        else if (button.id === "digivice_down") {
            newPosition++;
        }
        const list = document.querySelector(".screen-mover");
        if (newPosition > 3) {
            const firstChild = [...list.children].at(0);
            list.append(firstChild.cloneNode(true));
            list.style.transition = "none";
            list.style.transform = "translateY(-180px)";
            firstChild.remove();
            setTimeout(() => {
                list.style.transition = "";
                list.style.transform = "translateY(-270px)";
                setPosition(3);
            }, 0);
            return;
        }
        else if (newPosition < 0) {
            const lastChild = [...list.children].at(-1);
            list.prepend(lastChild.cloneNode(true));
            list.style.transition = "none";
            list.style.transform = "translateY(-90px)";
            lastChild.remove();
            setTimeout(() => {
                list.style.transition = "";
                list.style.transform = "translateY(0px)";
                setPosition(0);
            }, 0);
            return;
        }
        list.style.transform = `translateY(-${newPosition * 90}px)`;
        setPosition(newPosition);
    };
    const selectPosition = () => {
        const list = document.querySelector(".screen-mover");
        const selected = [...list.children].at(position).children[0].dataset.id;
        switch (selected) {
            case "first": {
                if (!(0, adjustmentFunctions_1.isFirstAdjust)(gauges)) {
                    alert("교정이 되지 않은 상태에서만 가능합니다.\n모두 재교정으로 다시 시도하세요.");
                    return;
                }
                firstAdjust();
                return;
            }
            case "failed": {
                if ((0, adjustmentFunctions_1.isFirstAdjust)(gauges)) {
                    alert("최초 교정 이후 가능합니다.\n최초 교정으로 다시 시도하세요.");
                    return;
                }
                if (!(0, adjustmentFunctions_1.hasFailAdjust)(gauges)) {
                    alert("더이상 실패한 교정이 없습니다.\n부분 재교정으로 더 높은 스텟을 뽑아보세요.");
                    return;
                }
                setMode("failed");
                return;
            }
            case "reroll-part": {
                if ((0, adjustmentFunctions_1.isFirstAdjust)(gauges)) {
                    alert("최초 교정 이후 가능합니다.\n최초 교정으로 다시 시도하세요.");
                    return;
                }
                if (!(0, adjustmentFunctions_1.hasSuccessedAdjustsOverTwo)(gauges)) {
                    alert("최소 2개의 성공한 교정이 필요합니다.\n실패 재교정이나 모두 재교정을 통해\n2개 이상의 성공한 교정을 확보하세요.");
                    return;
                }
                setMode("part");
                return;
            }
            case "reroll": {
                if ((0, adjustmentFunctions_1.isFirstAdjust)(gauges)) {
                    alert("최초 교정 이후 가능합니다.\n최초 교정으로 다시 시도하세요.");
                    return;
                }
                rerollAll();
                return;
            }
            default: return;
        }
    };
    const firstAdjust = () => {
        const newGauges = (0, adjustmentFunctions_1.adjustAll)();
        spentItems[0].count++;
        setSpentItems([...spentItems]);
        setGauges(newGauges);
    };
    const rerollEach = (index) => {
        const newGauges = (0, adjustmentFunctions_1.adjustFailToSuccess)(gauges, index);
        spentItems[1].count += newGauges.count;
        setSpentItems([...spentItems]);
        setGauges(newGauges.guages);
        setMode(null);
    };
    const rerollPart = (indexes) => {
        const newGauges = (0, adjustmentFunctions_1.adjustTwo)(gauges, indexes);
        spentItems[2].count += newGauges.count;
        setSpentItems([...spentItems]);
        setGauges(newGauges.guages);
        setMode(null);
    };
    const rerollAll = () => {
        const newGauges = (0, adjustmentFunctions_1.adjustAll)();
        spentItems[0].count++;
        setSpentItems([...spentItems]);
        setGauges(newGauges);
    };
    const digiviceSimulator = (0, react_1.useMemo)(() => {
        return react_1.default.createElement("div", { className: "digivice-simulator" },
            react_1.default.createElement("div", { className: "digivice-container" },
                react_1.default.createElement("img", { src: "/images/\uB514\uC9C0\uBC14\uC774\uC2A4.png", className: "digivice " }),
                react_1.default.createElement("div", { className: "digivice-screens" },
                    react_1.default.createElement("ul", { className: "screen-mover" },
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("span", { "data-id": "first" }, "\uCD5C\uCD08 \uAD50\uC815")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("span", { "data-id": "failed" }, "\uC2E4\uD328 \uC7AC\uAD50\uC815")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("span", { "data-id": "reroll-part" }, "\uBD80\uBD84 \uC7AC\uAD50\uC815")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("span", { "data-id": "reroll" }, "\uBAA8\uB450 \uC7AC\uAD50\uC815")))),
                react_1.default.createElement("button", { type: "button", className: "select-button", id: "digivice_up", style: { top: "56px", left: "214px" }, onClick: movePosition },
                    react_1.default.createElement("img", { src: "/images/\uB514\uC9C0\uBC14\uC774\uC2A4_\uC717_\uBC84\uD2BC.png" })),
                react_1.default.createElement("button", { type: "button", className: "select-button", id: "digivice_down", style: { top: "113px", left: "204px" }, onClick: movePosition },
                    react_1.default.createElement("img", { src: "/images/\uB514\uC9C0\uBC14\uC774\uC2A4_\uC544\uB7AB_\uBC84\uD2BC.png" })),
                react_1.default.createElement("button", { type: "button", className: "select-button", id: "digivice_select", style: { top: "93px", left: "20px" }, onClick: selectPosition },
                    react_1.default.createElement("img", { src: "/images/\uB514\uC9C0\uBC14\uC774\uC2A4_\uC120\uD0DD_\uBC84\uD2BC.png" }))));
    }, [position, gauges]);
    return (react_1.default.createElement("div", { className: "main" },
        digiviceSimulator,
        react_1.default.createElement(Gauges_1.default, { gauges: gauges, mode: mode, setMode: setMode, rerollEach: rerollEach, rerollPart: rerollPart }),
        react_1.default.createElement("div", { className: "adjust-dashboard" },
            react_1.default.createElement(Status_1.default, { gauges: gauges }),
            react_1.default.createElement(SpentItems_1.default, { spentItems: spentItems }))));
}
exports.default = Adjustments;
