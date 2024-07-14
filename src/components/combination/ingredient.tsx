import React, { useMemo } from "react";
import { getNameExceptColon } from "../../functions/commons";
import { getItemById } from "../../functions/getItemsFunctions";
import { CombinationIngredient } from "../../classes/Combination";

type IngredientProps = { ingredient: CombinationIngredient }

export default function Ingredient({ ingredient }: IngredientProps): React.ReactElement {
    const item = useMemo(() => getItemById(ingredient.itemId)!, [ingredient.itemId]);
    const itemImageName = useMemo(() => getNameExceptColon(item.name), [ingredient.itemId]);

    const tradableTag = ingredient.canTrade === "TRUE" ? <span className="tradable green">거래가능</span> :
                        ingredient.canTrade === "FALSE" ? <span className="tradable red">거래불가</span> :
                                                          <span className="tradable">거래여부 무관</span>;
    
    return (
        <div className="ingredient">
            <img src={`/images/${encodeURIComponent(itemImageName)}.png`} />
            <span>{item.name} * {ingredient.count}</span>
            { tradableTag }
        </div>
    );
}