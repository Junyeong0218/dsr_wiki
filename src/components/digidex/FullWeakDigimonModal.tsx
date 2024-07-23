import React, { useMemo, useState } from "react";
import { getAllDigimons, getAllOverflows, getMaps } from "../../functions";
import { Digimon, Monster, Skill } from "../../classes";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";
import { getDigimonFileName } from "../../functions/getDigimonFileName";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    digimonName: string;
    skill: Skill;
}

export default function FullWeakDigimonModal({ isOpen, setIsOpen, digimonName, skill }: Props): React.ReactElement {
    // const all = useMemo(() => getAllDigimons(false, true), []);
    const maps = useMemo(() => getMaps(), []);
    // const overflows = useMemo(() => getAllOverflows(), []);
    console.log(skill);
    return (
        <div id={`weak-digimon-modal`} className={`full-modal ${isOpen ? "active": ""}`}>
            <div className="window">
                <div className="title" style={{ position: "relative" }}>
                    <div style={{ width: "50px", display: "flex", position: "relative" }}>
                        <img src={`${IMG_URL_BASE}/${getDigimonFileName(digimonName)}.png`} title={`${digimonName}`} style={{ width: "100%", borderRadius: "4px" }} />
                        <img src={`${IMG_URL_BASE}/${Digimon.getByName(digimonName)?.digimonType}.png`} className="weak-digimon-type"/>
                    </div>
                    {digimonName}
                    <button type="button" className="remove-button" onClick={() => setIsOpen(false)}>
                        <img src={`${IMG_URL_BASE}/remove_button.png`} />
                    </button>
                </div>
                <div className="title" style={{ position: "relative", marginTop: "10px" }}>
                    <img src={`${IMG_URL_BASE}/${getDigimonFileName(digimonName)}_${skill.name}.png`} title={`${skill.name}`} style={{ width: "30px" }}/>
                    {skill.name}
                    <img src={`${IMG_URL_BASE}/스킬_${skill.element}.png`} title={`${skill.element} 속성`} />
                    약점 디지몬
                    {/* <button type="button" className="remove-button" onClick={() => setIsOpen(false)}>
                        <img src={`${IMG_URL_BASE}/remove_button.png`} />
                    </button> */}
                </div>
                <div className="contents-spicies">
                    <div className="field">
                        <div className="title">필드 {skill.element} 약점 디지몬</div>
                        <div className="weak-digimons">
                            { maps.map(map => {
                                if(!map.monsters) return "";

                                const weakDigimons = map.monsters.filter(e => {
                                    const digimon = Digimon.getByName(e.name);

                                    return digimon?.weakness === skill.element && digimon?.weaknessEffect === "약점"
                                });

                                if(weakDigimons.length === 0) return "";

                                const exceptDup: Array<Monster> = [];
                                weakDigimons.forEach(monster => {
                                    const found = exceptDup.find(d => d.name === monster.name && d.level === monster.level);

                                    if(!found)
                                        exceptDup.push(monster);
                                })

                                const mapTag = exceptDup.map(monster => {
                                    const digimon = Digimon.getByName(monster.name);

                                    return <div className="weak-digimon" key={getUUID()}>
                                        <img src={`${IMG_URL_BASE}/${digimon?.name}.png`} />
                                        <span>{digimon?.name} Lv.{monster.level}</span>
                                        <img src={`${IMG_URL_BASE}/${digimon?.digimonType}.png`} className="weak-digimon-type"/>
                                    </div>
                                });

                                return <div className="map-wrapper" key={getUUID()}>
                                    <div className="title">
                                        {map.name}
                                    </div>
                                    { mapTag }
                                </div>
                            }) }
                        </div>
                    </div>
                    <div className="field">
                        <div className="title">필드 {skill.element} 회피불가 디지몬</div>
                        <div className="weak-digimons">
                            { maps.map(map => {
                                if(!map.monsters) return "";

                                const weakDigimons = map.monsters.filter(e => {
                                    const digimon = Digimon.getByName(e.name);

                                    return digimon?.weakness === skill.element && digimon?.weaknessEffect === "회피불가"
                                });

                                if(weakDigimons.length === 0) return "";

                                const exceptDup: Array<Monster> = [];
                                weakDigimons.forEach(monster => {
                                    const found = exceptDup.find(d => d.name === monster.name && d.level === monster.level);

                                    if(!found)
                                        exceptDup.push(monster);
                                })

                                const mapTag = exceptDup.map(monster => {
                                    const digimon = Digimon.getByName(monster.name);

                                    return <div className="weak-digimon" key={getUUID()}>
                                        <img src={`${IMG_URL_BASE}/${digimon?.name}.png`} />
                                        <span>{digimon?.name} Lv.{monster.level}</span>
                                        <img src={`${IMG_URL_BASE}/${digimon?.digimonType}.png`} className="weak-digimon-type"/>
                                    </div>
                                });

                                return <div className="map-wrapper" key={getUUID()}>
                                    <div className="title">
                                        {map.name}
                                    </div>
                                    { mapTag }
                                </div>
                            }) }
                        </div>
                    </div>
                    { skill.effect && 
                        <div className="field">
                            <div className="title">필드 {skill.element} 효과확률 디지몬</div>
                            <div className="weak-digimons">
                                { maps.map(map => {
                                    if(!map.monsters) return "";

                                    const weakDigimons = map.monsters.filter(e => {
                                        const digimon = Digimon.getByName(e.name);

                                        return digimon?.weakness === skill.element && digimon?.weaknessEffect === "효과확률"
                                    });

                                    if(weakDigimons.length === 0) return "";

                                    const exceptDup: Array<Monster> = [];
                                    weakDigimons.forEach(monster => {
                                        const found = exceptDup.find(d => d.name === monster.name && d.level === monster.level);

                                        if(!found)
                                            exceptDup.push(monster);
                                    })

                                    const mapTag = exceptDup.map(monster => {
                                        const digimon = Digimon.getByName(monster.name);

                                        return <div className="weak-digimon" key={getUUID()}>
                                            <img src={`${IMG_URL_BASE}/${digimon?.name}.png`} />
                                            <span>{digimon?.name} Lv.{monster.level}</span>
                                            <img src={`${IMG_URL_BASE}/${digimon?.digimonType}.png`} className="weak-digimon-type"/>
                                        </div>
                                    });

                                    return <div className="map-wrapper" key={getUUID()}>
                                        <div className="title">
                                            {map.name}
                                        </div>
                                        { mapTag }
                                    </div>
                                }) }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}