const revolutionLineStyle = {stroke:"#000000", strokeWidth: 5 + "px", strokeLinecap: "round"};
const jogressLineStyle = {stroke:"#ed1c24", strokeWidth: 5 + "px", strokeLinecap: "round"};
const flexRowAndAlignEnd = {flexDirection: "row", alignSelf: "flex-end"};
const flexRowAndAlignStart = {flexDirection: "row", alignSelf: "flex-start"};
const flexRow = {flexDirection: "row"};
const flexColumn = {flexDirection: "column", gap: "5px"};

const getToLeftTextStyle = (top: number) => { return {position: "absolute", top: `${top}px`, "left": "0px"}; }
const getToRightTextStyle = (top: number) => { return {position: "absolute", top: `${top}px`, "right": "0px"}; }

export {
    revolutionLineStyle,
    jogressLineStyle,
    flexRow,
    flexRowAndAlignEnd,
    flexRowAndAlignStart,
    flexColumn,

    getToLeftTextStyle,
    getToRightTextStyle
}