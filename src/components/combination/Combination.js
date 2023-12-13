import React, { useMemo, useState } from "react";
import { getCombinations } from "../../functions/getCombinationsFunctions";
import { getItemById } from "../../functions/getItemsFunctions";
import ResultItem from "./resultItem";
import RequireResources from "./requireResources";
import { getNameExcepColon, getUUID } from "../../functions/commons";
import Ingredient from "./ingredient";
import CombinationShortcut from "./combinationShortcut";

export default function Combination() {
    const all = useMemo(() => getCombinations(), []);

    const [selected, setSelected] = useState(null);

    const selectCombination = (combination) => {
        combination.resultItem['imageName'] = getNameExcepColon(combination.resultItem.name);
        setSelected(combination);
    }

    return (
        <div className="main">
            <div className="combination-container">
                <div className="combination-list">
                    { all.map(combination => (
                        <CombinationShortcut combination={combination} selectCombination={selectCombination} key={getUUID()} />
                    )) }
                </div>
                { selected && 
                    <div className="selected-combination">
                        <ResultItem selected={selected} />
                        <RequireResources selected={selected} />
                        <div className="ingredient-list">
                            { selected.ingredients.map(ingredient => (
                                <Ingredient ingredient={ingredient} key={getUUID()}/>
                            )) }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}