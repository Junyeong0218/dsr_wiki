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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const potentialFunctions_1 = require("../../functions/potentialFunctions");
const commons_1 = require("../../functions/commons");
function Potentials() {
    const defaultPotentials = (0, potentialFunctions_1.getDefaultPotentials)();
    const [potentials, setPotentials] = (0, react_1.useState)(defaultPotentials);
    const [list, setList] = (0, react_1.useState)([]);
    const [bit, setBit] = (0, react_1.useState)(0);
    const selected = (0, react_1.useRef)();
    const stats = (0, potentialFunctions_1.getTotalStats)(potentials);
    const loadList = () => {
        const list = (0, potentialFunctions_1.generateTenPotentials)();
        setBit(bit + 50000);
        setList(list);
    };
    const grabCube = (event) => {
        const targetElement = event.target;
        const potentialContainer = document.querySelector(".potentials");
        const index = [...potentialContainer.children].findIndex(e => e === targetElement);
        selected.current = list[index];
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        event.dataTransfer.setDragImage(img, 0, 0);
    };
    const getNextCell = (datasetId) => {
        var _a, _b, _c;
        if (!selected.current)
            return {
                tag: undefined, coord: { row: -1, column: -1 }
            };
        const [rowIndex, columnIndex] = datasetId.split("-").map(e => Number(e));
        const rows = document.querySelectorAll("table > tbody > tr");
        let cell;
        if (selected.current.type === "ROW") {
            cell = {
                tag: rows[rowIndex].children[columnIndex + 1],
                coord: { row: rowIndex, column: columnIndex + 1 }
            };
        }
        else if (selected.current.type === "COLUMN") {
            cell = {
                tag: (_a = rows[rowIndex + 1]) === null || _a === void 0 ? void 0 : _a.children[columnIndex],
                coord: { row: rowIndex + 1, column: columnIndex }
            };
        }
        else if (selected.current.type === "RIGHT_DOWN") {
            cell = {
                tag: (_b = rows[rowIndex + 1]) === null || _b === void 0 ? void 0 : _b.children[columnIndex + 1],
                coord: { row: rowIndex + 1, column: columnIndex + 1 }
            };
        }
        else {
            cell = {
                tag: (_c = rows[rowIndex + 1]) === null || _c === void 0 ? void 0 : _c.children[columnIndex - 1],
                coord: { row: rowIndex + 1, column: columnIndex - 1 }
            };
        }
        return cell;
    };
    const changeToPreview = (cell, potential) => {
        const children = [...cell.children];
        children[0].src = `/images/포텐셜_${potential.statType}.png`;
        children[1].innerText = `${potential.statType} ${potential.value}%`;
        cell.classList.remove("blank");
        cell.classList.add("preview");
    };
    const changeToOrigin = (cell, potential) => {
        const children = [...cell.children];
        children[0].src = `/images/포텐셜_${potential.statType}.png`;
        children[1].innerText = `${potential.statType} ${potential.value}%`;
        if (potential.statType === "BLANK")
            cell.classList.add("blank");
        cell.classList.remove("preview");
    };
    const previewCube = (event) => {
        event.preventDefault();
        if (!selected.current)
            return;
        const td = event.target;
        changeToPreview(td, selected.current.potentials[0]);
        if (selected.current.type === "ONE")
            return;
        const nextCell = getNextCell(td.dataset.id);
        if (!nextCell.tag)
            return;
        changeToPreview(nextCell.tag, selected.current.potentials[1]);
    };
    const undo = (event) => {
        event.preventDefault();
        setPotentials([...potentials]);
        // const td = event.target as HTMLTableCellElement;
        // const [row, column] = td.dataset.id!.split("-").map(e => Number(e));
        // const potential = potentials[row][column];
        // changeToOrigin(td, potential);
        // if(selected.current!.type === "ONE") return;
        // const nextCell = getNextCell(td.dataset.id!);
        // if(!nextCell.tag) return;
        // const origin = potentials[nextCell.coord.row][nextCell.coord.column];
        // changeToOrigin(nextCell.tag, origin);
    };
    const apply = (event) => {
        event.preventDefault();
        if (!selected.current)
            return;
        const target = event.target;
        const [row, column] = target.dataset.id.split("-").map(e => Number(e));
        if (selected.current.type == "ONE") {
            potentials[row][column] = selected.current.potentials[0];
            setPotentials([...potentials]);
            setList(list.filter(e => e !== selected.current));
            selected.current = undefined;
            return;
        }
        const nextCell = getNextCell(target.dataset.id);
        if (!nextCell.tag) {
            changeToOrigin(target, potentials[row][column]);
            return;
        }
        potentials[row][column] = selected.current.potentials[0];
        potentials[nextCell.coord.row][nextCell.coord.column] = selected.current.potentials[1];
        setPotentials([...potentials]);
        setList(list.filter(e => e !== selected.current));
        selected.current = undefined;
    };
    const getSpanClassName = (statType) => {
        if (statType === "저항" || statType === "힘" || statType === "지능" || statType === "크리율")
            return "white";
        return "";
    };
    return (react_1.default.createElement("div", { className: "main" },
        react_1.default.createElement("div", { className: "potential-board-container" },
            react_1.default.createElement("div", { className: "potential-board" },
                react_1.default.createElement("table", null,
                    react_1.default.createElement("tbody", { key: (0, commons_1.getUUID)() }, potentials.map((row, rowIndex) => (react_1.default.createElement("tr", { key: (0, commons_1.getUUID)() }, row.map((cell, columnIndex) => (react_1.default.createElement("td", { key: (0, commons_1.getUUID)(), className: `${cell.statType === "BLANK" ? "blank" : ""}`, onDragEnter: previewCube, onDragOver: (e) => e.preventDefault(), onDragLeave: undo, onDrop: apply, onDragEnd: (e) => e.preventDefault(), "data-id": `${rowIndex}-${columnIndex}` },
                        react_1.default.createElement("img", { src: `/images/포텐셜_${cell.statType}.png` }),
                        react_1.default.createElement("span", { className: getSpanClassName(cell.statType) },
                            cell.statType,
                            " ",
                            cell.value,
                            "%"))))))))),
                react_1.default.createElement("div", { className: "stats" }, stats.map(stat => (react_1.default.createElement("div", { className: "stat", key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("span", { className: "title" }, stat.statType),
                    react_1.default.createElement("span", { className: stat.value !== 0 ? "value" : "" },
                        "+",
                        stat.value,
                        "%")))))),
            react_1.default.createElement("div", { className: "spent-bits" },
                "\uC18C\uBAA8 \uBE44\uD2B8 : ",
                bit.toLocaleString("ko-KR"),
                " ",
                react_1.default.createElement("img", { src: "/images/\uC870\uD569 \uBE44\uD2B8 \uC544\uC774\uCF58.png", alt: "" }))),
        react_1.default.createElement("div", { className: "potentials" }, list.map(element => {
            if (element.type === "ONE")
                return react_1.default.createElement("div", { className: "potential-group one", draggable: "true", key: (0, commons_1.getUUID)(), onDragStart: grabCube, onDragEnd: (e) => e.preventDefault() },
                    react_1.default.createElement("img", { src: `/images/포텐셜_${element.potentials[0].statType}.png` }),
                    react_1.default.createElement("span", { className: getSpanClassName(element.potentials[0].statType) },
                        element.potentials[0].statType,
                        " ",
                        element.potentials[0].value,
                        "%"));
            else if (element.type === "ROW" || element.type === "COLUMN")
                return react_1.default.createElement("div", { className: `potential-group ${element.type.toLowerCase()}`, draggable: "true", onDragStart: grabCube, key: (0, commons_1.getUUID)(), onDragEnd: (e) => e.preventDefault() }, element.potentials.map(p => (react_1.default.createElement("div", { className: "potential", key: (0, commons_1.getUUID)() },
                    react_1.default.createElement("img", { src: `/images/포텐셜_${p.statType}.png` }),
                    react_1.default.createElement("span", { className: getSpanClassName(p.statType) },
                        p.statType,
                        " ",
                        p.value,
                        "%")))));
            else if (element.type === "RIGHT_UP")
                return react_1.default.createElement("div", { className: `potential-group ${element.type.toLowerCase()}`, draggable: "true", key: (0, commons_1.getUUID)(), onDragStart: grabCube, onDragEnd: (e) => e.preventDefault() },
                    react_1.default.createElement("div", { className: "potential blank" }),
                    react_1.default.createElement("div", { className: "potential" },
                        react_1.default.createElement("img", { src: `/images/포텐셜_${element.potentials[0].statType}.png` }),
                        react_1.default.createElement("span", { className: getSpanClassName(element.potentials[0].statType) },
                            element.potentials[0].statType,
                            " ",
                            element.potentials[0].value,
                            "%")),
                    react_1.default.createElement("div", { className: "potential" },
                        react_1.default.createElement("img", { src: `/images/포텐셜_${element.potentials[1].statType}.png` }),
                        react_1.default.createElement("span", { className: getSpanClassName(element.potentials[1].statType) },
                            element.potentials[1].statType,
                            " ",
                            element.potentials[1].value,
                            "%")),
                    react_1.default.createElement("div", { className: "potential blank" }));
            else
                return react_1.default.createElement("div", { className: `potential-group ${element.type.toLowerCase()}`, draggable: "true", key: (0, commons_1.getUUID)(), onDragStart: grabCube, onDragEnd: (e) => e.preventDefault() },
                    react_1.default.createElement("div", { className: "potential" },
                        react_1.default.createElement("img", { src: `/images/포텐셜_${element.potentials[0].statType}.png` }),
                        react_1.default.createElement("span", { className: getSpanClassName(element.potentials[0].statType) },
                            element.potentials[0].statType,
                            " ",
                            element.potentials[0].value,
                            "%")),
                    react_1.default.createElement("div", { className: "potential blank" }),
                    react_1.default.createElement("div", { className: "potential blank" }),
                    react_1.default.createElement("div", { className: "potential" },
                        react_1.default.createElement("img", { src: `/images/포텐셜_${element.potentials[1].statType}.png` }),
                        react_1.default.createElement("span", { className: getSpanClassName(element.potentials[1].statType) },
                            element.potentials[1].statType,
                            " ",
                            element.potentials[1].value,
                            "%")));
        })),
        react_1.default.createElement("div", { className: "create-potential-buttons" },
            react_1.default.createElement("button", { type: "button", onClick: loadList }, "10\uAC1C \uC0DD\uC131"))));
}
exports.default = Potentials;
