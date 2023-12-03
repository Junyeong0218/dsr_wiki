import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getUUID } from "../../functions/commons";

export default function DropsModal({ isOpen, digimon, position }) {
    return (
        <div id="drops-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="digimon-info">
                    <img src={`/images/${digimon?.name}.png`} />
                    <div className="digimon-description">
                        <span className="digimon-name">{digimon?.name}</span>
                        <span className="description-row">Level : {digimon?.level}</span>
                        <span className="description-row">속성 :&nbsp;<img src={`/images/${digimon?.digimonType}.png`} /></span>
                        <div className="hp-bar">HP {digimon?.hp}</div>
                    </div>
                </div>
                <span className="title">드랍 아이템</span>
                <div className="drop-items">
                    { digimon && digimon.dropItems && digimon.dropItems.map(itemId => {
                        const item = getItemById(itemId);

                        return (
                            <div className="drop-item" key={getUUID()}>
                                <img src={`/images/${item.name}.png`} />
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}