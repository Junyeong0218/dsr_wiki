import React, { useMemo } from "react";
import { getNameExcepColon } from "../../functions/commons";
import { getItemById } from "../../functions/getItemsFunctions";

export default function Ingredient({ ingredient }) {
    const item = useMemo(() => getItemById(ingredient.itemId), [ingredient.itemId]);
    const itemImageName = useMemo(() => getNameExcepColon(item.name), [ingredient.itemId]);

    const tradableTag = item.canTrade ? <span className="green">거래가능</span> :
                                        <span className="red">거래불가</span>;
    
    return (
        <div className="ingredient">
            <img src={`/images/${encodeURIComponent(itemImageName)}.png`} />
            <span>{item.name} * {ingredient.count}</span>
            { tradableTag }
        </div>
    );
}