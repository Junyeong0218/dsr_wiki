"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToRightTextStyle = exports.getToLeftTextStyle = exports.flexColumn = exports.flexRowAndAlignStart = exports.flexRowAndAlignEnd = exports.flexRow = exports.jogressLineStyle = exports.revolutionLineStyle = void 0;
const revolutionLineStyle = { stroke: "#e6e6e6", strokeWidth: 5 + "px", strokeLinecap: "round" };
exports.revolutionLineStyle = revolutionLineStyle;
const jogressLineStyle = { stroke: "#ed1c24", strokeWidth: 5 + "px", strokeLinecap: "round" };
exports.jogressLineStyle = jogressLineStyle;
const flexRowAndAlignEnd = { flexDirection: "row", alignSelf: "flex-end" };
exports.flexRowAndAlignEnd = flexRowAndAlignEnd;
const flexRowAndAlignStart = { flexDirection: "row", alignSelf: "flex-start" };
exports.flexRowAndAlignStart = flexRowAndAlignStart;
const flexRow = { flexDirection: "row" };
exports.flexRow = flexRow;
const flexColumn = { flexDirection: "column" };
exports.flexColumn = flexColumn;
const getToLeftTextStyle = (top) => { return { position: "absolute", top: `${top}px`, "left": "0px" }; };
exports.getToLeftTextStyle = getToLeftTextStyle;
const getToRightTextStyle = (top) => { return { position: "absolute", top: `${top}px`, "right": "0px" }; };
exports.getToRightTextStyle = getToRightTextStyle;
