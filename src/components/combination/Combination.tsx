import React, { useMemo, useState } from "react";
import { getCombinations } from "../../functions/getCombinationsFunctions";
import ResultItem from "./resultItem";
import RequireResources from "./requireResources";
import { getUUID } from "../../functions/commons";
import Ingredient from "./ingredient";
import CombinationShortcut from "./combinationShortcut";
import CombinationFilters from "./combinationFilters";
import { Combination } from "../../classes";

export default function CombinationSearcher(): React.ReactElement {
    const all = useMemo(() => getCombinations(), []);
    const [filtered, setFiltered] = useState<Array<Combination>|null>(null);

    const [selected, setSelected] = useState<Combination|null>(null);

    const selectCombination = (combination: Combination): void => {
        setSelected(combination);
    }

    const shortcuts = useMemo(() => {
        return filtered ? 
            <div className="combination-list">
                { filtered.map(combination => (
                    <CombinationShortcut combination={combination} selectedId={selected?.id ?? 0} selectCombination={selectCombination} key={getUUID()} />
                )) }
            </div> :
            <div className="combination-list">
                { all.map(combination => (
                    <CombinationShortcut combination={combination} selectedId={selected?.id ?? 0} selectCombination={selectCombination} key={getUUID()} />
                )) }
            </div>
    }, [filtered, selected]);

    return (
        <div className="main">
            <CombinationFilters all={all} setFiltered={setFiltered} />
            <div className="combination-container">
                { shortcuts }
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