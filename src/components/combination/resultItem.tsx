import React from "react";
import { Combination } from "../../classes";
import { getNameExceptColon } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";

type CombinationProps = { selected: Combination }

export default function ResultItem({ selected }: CombinationProps): React.ReactElement {
    const tradableTag = selected.resultItem.canTrade ? <span className="green">거래가능</span> :
                                                       <span className="red">거래불가</span>;

    const imageName = encodeURIComponent(getNameExceptColon(selected.resultItem.name));

    return (
        <div className="result-item-info">
            <img src={`${IMG_URL_BASE}/${imageName}.png`} 
                 title={selected.resultItem.name}/>
            <span className="result-item-title">{selected.resultItem.name}</span>
            { tradableTag }
        </div>
    );
}