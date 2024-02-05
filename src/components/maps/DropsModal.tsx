import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getUUID } from "../../functions/commons";
import { Digimon, Monster } from "../../classes";
import { getDigimonQualityText } from "../../functions";

type DropsModalProps = { 
    isOpen: boolean, 
    monster: Monster|null, 
    position: { top: number, left: number }
}

export default function DropsModal({ isOpen, monster, position }: DropsModalProps): React.ReactElement {
    if(!monster) return <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}></div>

    const digimon = Digimon.getByName(monster.name);
    if(!digimon) return <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}></div>
    
    return (
        <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="digimon-info">
                    <img src={`/images/${monster?.name}.png`} />
                    <div className="digimon-description">
                        <span className="digimon-name">{monster?.name}</span>
                        <span className="description-row">Level : {monster?.level}</span>
                        <span className="description-row">속성 :&nbsp;<img src={`/images/${monster?.digimonType}.png`} /></span>
                        <span className="description-row" title={getDigimonQualityText(digimon.strengthEffect, false)}>강점 :&nbsp;
                            <img src={`/images/${digimon.strength} 강점.png`} />&nbsp;
                            { digimon.strength } - { digimon.strengthEffect }
                        </span>
                        <span className="description-row" title={getDigimonQualityText(digimon.weaknessEffect, false)}>약점 :&nbsp;
                            <img src={`/images/${digimon.weakness} 약점.png`} />&nbsp;
                            { digimon.weakness } - { digimon.weaknessEffect }
                        </span>
                        <div className="hp-bar">HP {monster?.hp}</div>
                    </div>
                </div>
                <span className="title">드랍 아이템</span>
                <div className="drop-items">
                    { monster && monster.dropItems && monster.dropItems.map(itemId => {
                        const item = getItemById(itemId)!;

                        return (
                            <div className="drop-item" key={getUUID()}>
                                <img src={`/images/${item.name.includes("조합법") ? "조합법" : item.name}.png`} />
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}