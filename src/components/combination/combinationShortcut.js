import React, { useMemo } from "react";
import { getNameExcepColon } from "../../functions/commons";

export default function CombinationShortcut({ combination, selectedId, selectCombination }) {
    const shortcut = useMemo(() => {
        const imageName = getNameExcepColon(combination.resultItem.name);
        const tradableTag = combination.resultItem.canTrade ? <span className="green">거래가능</span> :
                                                              <span className="red">거래불가</span>;

        const itemNameTag = combination["tag"] ? <span className="shortcut-item-name" dangerouslySetInnerHTML={{__html: combination.tag}}></span> : 
                                                 <span className="shortcut-item-name">{combination.resultItem.name}</span>;

        return <button type="button" className={`combination-shortcut ${combination.id === selectedId ? "selected" : ""}`} onClick={() => selectCombination(combination)}>
                    <img src={`/images/${encodeURIComponent(imageName)}.png`} />
                    <div className="shortcut-texts">
                        { itemNameTag }
                        { tradableTag }
                    </div>
                </button>;
    }, [combination.id, selectedId]);

    return shortcut;
}