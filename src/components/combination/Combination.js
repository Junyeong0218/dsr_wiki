import React, { useMemo, useState } from "react";
import { getCombinations } from "../../functions/getCombinationsFunctions";
import { getItemById } from "../../functions/getItemsFunctions";

export default function Combination() {
    const all = useMemo(() => getCombinations(), []);

    const [selected, setSelected] = useState(null);

    const getNameExcepColon = (name) => name.includes(":") ? name.replace(":", "") : name;

    const selectCombination = (combination) => {
        combination.resultItem['imageName'] = getNameExcepColon(combination.resultItem.name);
        setSelected(combination);
    }

    return (
        <div className="main">
            <div className="combination-container">
                <div className="combination-list">
                    { all.map(combination => {
                        const imageName = getNameExcepColon(combination.resultItem.name);

                        return <button type="button" className="combination-shortcut" onClick={() => selectCombination(combination)}>
                                    <img src={`/images/${encodeURIComponent(imageName)}.png`} />
                                    <div className="shortcut-texts">
                                        <span className="shortcut-item-name">{combination.resultItem.name}</span>
                                        { combination.resultItem.canTrade && <span className="green">거래가능</span>}
                                        { !combination.resultItem.canTrade && <span className="red">거래불가</span>}
                                    </div>

                                </button>
                    }) }
                </div>
                { selected && 
                    <div className="selected-combination">
                        <div className="result-item-info">
                            <img src={`/images/${encodeURIComponent(selected.resultItem.imageName)}.png`} title={selected.resultItem.name}/>
                            <span className="result-item-title">{selected.resultItem.name}</span>
                            { selected.resultItem.canTrade && <span className="green">거래가능</span>}
                            { !selected.resultItem.canTrade && <span className="red">거래불가</span>}
                        </div>
                        <div className="resources">
                            <span>필요 숙련도 : {selected.reqPro}</span>
                            <span>비용 : {selected.reqBit}<img src="/images/조합 비트 아이콘.png" /></span>
                            <span>확률 : {selected.rate * 100}%</span>
                            <span>대성공 확률 : {selected.bigRate * 100}%</span>
                        </div>
                        <div className="ingredient-list">
                            { selected.ingredients.map(ingredient => {
                                const item = getItemById(ingredient.itemId);
                                const itemImageName = getNameExcepColon(item.name);
                                
                                return (
                                    <div className="ingredient">
                                        <img src={`/images/${encodeURIComponent(itemImageName)}.png`} />
                                        <span>{item.name} * {ingredient.count}</span>
                                        { item.canTrade && <span className="green">거래가능</span> }
                                        { !item.canTrade && <span className="red">거래불가</span> }
                                    </div>
                                );
                            }) }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}