import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getUUID } from "../../functions/commons";
import { Digimon, Item, Monster } from "../../classes";
import { getDigimonQualityText } from "../../functions";
import { IMG_URL_BASE } from "../../enums";

type DropsModalProps = { 
    isOpen: boolean, 
    monster: Monster|null, 
    position: { top: number, left: number }
}

export default function DropsModal({ isOpen, monster, position }: DropsModalProps): React.ReactElement {
    if(!monster) return <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}></div>

    const digimon = Digimon.getByName(monster.name);
    if(!digimon) return <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}></div>
    
    const getItemImageName = (item: Item): string => {
        if(item.type === 11) {
            const typeName = item.name.split(" ")[1];

            return `드랍_${typeName}`;
        }

        if(item.name.includes("조합법"))
            return "조합법";

        return item.name;
    }

    const getForceEvolutionTarget = (forceEvolution: string): string => {
        switch(forceEvolution) {
            case "아구몬": return "그레이몬";
            case "파피몬": return "가루몬";
            case "텐타몬": return "캅테리몬";
            case "쉬라몬": return "원뿔몬";
            case "팔몬": return "니드몬";
            case "피요몬": return "버드라몬";
            default: return "";
        }
    }
    
    return (
        <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="digimon-info">
                    <div><img src={`${IMG_URL_BASE}/${monster?.name}.png`} /></div>
                    <div className="digimon-description">
                        <span className={`digimon-name ${monster?.isForceEncounter ? "force" : ""}`}>{monster?.anotherName ?? monster?.name}</span>
                        <span className="description-row">Level : {monster?.level}</span>
                        <span className="description-row">속성 :&nbsp;<img src={`${IMG_URL_BASE}/${monster?.digimonType}.png`} /></span>
                        { digimon.strengthEffect && <span className="description-row" title={getDigimonQualityText(digimon.strengthEffect, false)}>강점 :&nbsp;
                            <img src={`${IMG_URL_BASE}/${digimon.strength} 강점.png`} />&nbsp;
                            { digimon.strength } - { digimon.strengthEffect }
                        </span> }
                        { digimon.weaknessEffect && <span className="description-row" title={getDigimonQualityText(digimon.weaknessEffect, false)}>약점 :&nbsp;
                            <img src={`${IMG_URL_BASE}/${digimon.weakness} 약점.png`} />&nbsp;
                            { digimon.weakness } - { digimon.weaknessEffect }
                        </span> }
                        <div className="hp-bar">HP {monster?.hp}</div>
                    </div>
                </div>
                { monster && monster.forceEvolution && <div className="force-evolution-text">{monster.forceEvolution} 전투 시 {getForceEvolutionTarget(monster.forceEvolution)}으로 확정 진화(10%)</div>}
                { monster && monster.dropItems.length > 0 && <span className="title">드랍 아이템</span> }
                { monster && monster.dropItems.length > 0 && 
                    <div className="drop-items">
                        {  monster.dropItems.map(itemId => {
                            const item = getItemById(itemId)!;
                            
                            return (
                                <div className="drop-item" key={getUUID()}>
                                    <img src={`${IMG_URL_BASE}/${getItemImageName(item)}.png`} />
                                    <span>{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
}