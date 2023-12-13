import React from "react";

export default function ResultItem({ selected }) {
    const tradableTag = selected.resultItem.canTrade ? <span className="green">거래가능</span> :
                                                       <span className="red">거래불가</span>;

    return (
        <div className="result-item-info">
            <img src={`/images/${encodeURIComponent(selected.resultItem.imageName)}.png`} 
                 title={selected.resultItem.name}/>
            <span className="result-item-title">{selected.resultItem.name}</span>
            { tradableTag }
        </div>
    );
}