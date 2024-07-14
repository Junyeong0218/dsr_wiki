import React from "react";
import { Digimon } from "../../classes";
import { IStageMontser } from "../../classes/Overflow";

type DropsModalProps = { 
    isOpen: boolean, 
    monster: IStageMontser|null, 
    position: { top: number, left: number }
}

export default function MonsterDescriptionModal({ isOpen, monster, position }: DropsModalProps): React.ReactElement {
    if(!monster) return <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}></div>

    const digimon = Digimon.getByName(monster.name)!
    
    return (
        <div id="overflow-monster-description-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="digimon-info">
                    <img src={`/images/${monster.name}.png`} />
                    <div className="digimon-description">
                        <span className="digimon-name">{monster?.name}</span>
                        <span className="description-row">Level : {monster.level}</span>
                        <span className="description-row">속성 :&nbsp;<img src={`/images/${monster.digimonType}.png`} /></span>
                        <span className="description-row">강점 :&nbsp;<img src={`/images/${digimon.strength} 강점.png`} />&nbsp;{digimon.strengthEffect}</span>
                        <span className="description-row">약점 :&nbsp;<img src={`/images/${digimon.weakness} 약점.png`} />&nbsp;{digimon.weaknessEffect}</span>
                        <div className="hp-bar">HP {monster?.hp}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}