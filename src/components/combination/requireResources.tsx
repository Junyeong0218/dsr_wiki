import React from "react";
import { getCommaString } from "../../functions/commons";
import { Combination } from "../../classes";

type CombinationProps = { selected: Combination }

export default function RequireResources({ selected }: CombinationProps): React.ReactElement {
    return (
        <div className="resources">
            <span>필요 숙련도 : {selected.reqPro}</span>
            <span>비용 : {getCommaString(selected.reqBit)}<img src="/images/조합 비트 아이콘.png" /></span>
            <span>확률 : {selected.rate * 100}%</span>
            <span>대성공 확률 : {selected.bigRate * 100}%</span>
        </div>
    );
}