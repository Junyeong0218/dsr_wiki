import React, { useMemo } from "react";
import { getNameExcepColon } from "../../functions/commons";

export default function CombinationShortcut({ combination, selectCombination }) {
    const shortcut = useMemo(() => {
        const imageName = getNameExcepColon(combination.resultItem.name);
        const tradableTag = combination.resultItem.canTrade ? <span className="green">거래가능</span> :
                                                              <span className="red">거래불가</span>;

        return <button type="button" className="combination-shortcut" onClick={() => selectCombination(combination)}>
                    <img src={`/images/${encodeURIComponent(imageName)}.png`} />
                    <div className="shortcut-texts">
                        <span className="shortcut-item-name">{combination.resultItem.name}</span>
                        { tradableTag }
                    </div>
                </button>;
    }, [combination.id]);

    return shortcut;
}