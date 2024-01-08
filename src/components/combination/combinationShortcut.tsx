import React, { useMemo } from "react";
import { getNameExceptColon } from "../../functions/commons";
import { Combination } from "../../classes";

type ShortcutProps = {
    combination: Combination, 
    selectedId: number, 
    selectCombination: (combination: Combination) => void
}

export default function CombinationShortcut({ combination, selectedId, selectCombination }: ShortcutProps): React.ReactElement {
    const shortcut = useMemo(() => {
        const imageName = getNameExceptColon(combination.resultItem.name);
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