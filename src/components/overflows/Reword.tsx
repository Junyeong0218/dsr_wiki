import React from "react";
import { RewordItem } from "../../classes/Overflow";
import { getNameExceptColon } from "../../functions/commons";

type RewordProps = { reword: RewordItem }

export default function Reword({ reword }: RewordProps): React.ReactElement {
    return (
        <div className="reword">
            <img src={`/images/${encodeURIComponent(getNameExceptColon(reword.item.name))}.png`} />
            <div className="reword-info">
                <span>{reword.item.name}</span>
                <span className={reword.item.canTrade ? "green" : "red"}>{reword.item.canTrade ? "거래가능" : "거래불가"}</span>
                <span>{reword.count}ea</span>
            </div>
            
        </div>
    );
}