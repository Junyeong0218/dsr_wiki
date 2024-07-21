import React from "react";
import { Monster } from "../../classes";
import { IMG_URL_BASE } from "../../enums";

type MonsterShortcutProps = { 
    monster: Monster, 
    hasDropItem: (monster: Monster) => boolean 
}

export default function MonsterShortcut({ monster, hasDropItem }: MonsterShortcutProps): React.ReactElement {
    const style = { top: monster.point.y, left: monster.point.x };

    return (
        <div className={`monster-shortcut ${hasDropItem(monster) ? "" : "hide"}`} style={style} >
            <img data-id={monster.id} src={`${IMG_URL_BASE}/${monster.name}.png`} className="monster-image" />
            <span>{monster.name}</span>
            <img src={`${IMG_URL_BASE}/${monster.digimonType}.png`} className="monster-type-shortcut" />
        </div>
    );
}