import React from "react";

export default function MonsterShortcut({ monster, showMonster }) {
    const style = { top: monster.point.y, left: monster.point.x };

    return (
        <div className={`monster-shortcut ${showMonster ? "" : "hide"}`} style={style} >
            <img src={`/images/${monster.name}.png`} />
            <span>{monster.name}</span>
        </div>
    );
}