import React from "react";

export default function MonsterShortcut({ monster, hasDropItem }) {
    const style = { top: monster.point.y, left: monster.point.x };

    return (
        <div className={`monster-shortcut ${hasDropItem(monster) ? "" : "hide"}`} style={style} >
            <img data-id={monster.id} src={`/images/${monster.name}.png`} className="monster-image" />
            <span>{monster.name}</span>
            <img src={`/images/${monster.digimonType}.png`} className="monster-type-shortcut" />
        </div>
    );
}