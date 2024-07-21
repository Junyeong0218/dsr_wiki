import React from "react";
import { Digimon } from "../../classes";
import { IStageMontser } from "../../classes/Overflow";
import { IMG_URL_BASE } from "../../enums";

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
                    <img src={`${IMG_URL_BASE}/${monster.name}.png`} />
                    <div className="digimon-description">
                        <span className="digimon-name">{monster?.name}</span>
                        <span className="description-row">Level : {monster.level}</span>
                        <span className="description-row">속성 :&nbsp;<img src={`${IMG_URL_BASE}/${monster.digimonType}.png`} /></span>
                        <span className="description-row">강점 :&nbsp;<img src={`${IMG_URL_BASE}/${digimon.strength} 강점.png`} />&nbsp;{digimon.strengthEffect}</span>
                        <span className="description-row">약점 :&nbsp;<img src={`${IMG_URL_BASE}/${digimon.weakness} 약점.png`} />&nbsp;{digimon.weaknessEffect}</span>
                        <div className="hp-bar">HP {monster?.hp}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}