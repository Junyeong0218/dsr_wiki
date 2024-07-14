import React from "react";
import { getCommaString } from "../../functions/commons";
import { Combination } from "../../classes";

type CombinationProps = { selected: Combination }

export default function RequireResources({ selected }: CombinationProps): React.ReactElement {
    const rate = Math.round(selected.rate * 1_000_000) / 10_000;

    return (
        <div className="resources">
            <span>필요 숙련도 : {selected.reqPro}</span>
            <span>비용 : {getCommaString(selected.reqBit)}<img style={{ width: "22px", height: "22px" }} src="/images/무배경_비트.png" /></span>
            <span>확률 : {rate}%</span>
            <span>대성공 확률 : {selected.bigRate * 100}%</span>
        </div>
    );
}