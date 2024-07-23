import React from "react";
import { IMG_URL_BASE } from "../../enums";
import { DetectorMonster } from "../../classes/Detector";
import { Digimon } from "../../classes";

type MonsterShortcutProps = { 
    monster: DetectorMonster,
    digimon: Digimon
}

export default function MonsterShortcut({ monster, digimon }: MonsterShortcutProps): React.ReactElement {
    const style = { top: monster.point.y, left: monster.point.x };

    return (
        <div className={`monster-shortcut`} style={style} >
            <img data-id={monster.id} src={`${IMG_URL_BASE}/${monster.name}.png`} className="monster-image" />
            <span>{monster.name}</span>
            <img src={`${IMG_URL_BASE}/${digimon.digimonType}.png`} className="monster-type-shortcut" />
        </div>
    );
}