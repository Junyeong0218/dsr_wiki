import React, { useEffect, useMemo, useState } from "react";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import { getItemById } from "../../functions/getItemsFunctions";
import { Digimon } from "../../classes";
import { getAllDetectors } from "../../functions/getDetectors";
import { Detector, DetectorMonster } from "../../classes/Detector";
import { IMG_URL_BASE } from "../../enums";
import DigimonSkills from "../digidex/digimonSkills";
import MonsterShortcut from "./MonsterShortcut";

export default function Detectors(): React.ReactElement {
    const detectors = useMemo(() => getAllDetectors(), []);
    const [selectedDetector, setSelectedDetector] = useState<Detector>(detectors[0]);
    const [selectedMonster, setSelectedMonster] = useState<DetectorMonster>(detectors[0].monsters[0]);

    useEffect(() => {
        setSelectedMonster(selectedDetector.monsters[0]);
    }, [selectedDetector]);

    const digimon = Digimon.getByName(selectedMonster.name)!;
    const relatedMonster = selectedDetector.monsters.find(m => m.relatedId === selectedMonster.id)!;
    const relatedDigimon = Digimon.getByName(relatedMonster?.name)!;

    return (
        <div className="main">
            <div className="detectors-contaier">
                {/* detectors list - row buttons */}
                <div className="digidex-filter2" key={getUUID()}>
                    <div className="title">탐지기</div>
                    <div className="checkboxes map-names">
                    { detectors.map(detector => (
                        <label htmlFor={detector.name} key={getUUID()} className={selectedDetector.name === detector.name ? "checked" : ""}>
                            <img src={`/images/무배경_${detector.name}.png`} />
                            <input type="radio" id={detector.name} checked={selectedDetector.name === detector.name}
                                                                onChange={() => setSelectedDetector(detector)}/>
                            <span>{detector.name}</span>
                        </label>
                    ))}
                    </div>
                </div>

                {/* monster list - row buttons */}
                <div className="digidex-filter2" key={getUUID()}>
                    <div className="title">등장 디지몬</div>
                    <div className="checkboxes map-names">
                    { selectedDetector.monsters.filter(m => m.relatedId === null).map(monster => (
                        <label htmlFor={monster.name} key={getUUID()} className={selectedMonster.name === monster.name ? "checked" : ""}>
                            <input type="radio" id={monster.name} checked={selectedDetector.name === monster.name}
                                                                onChange={() => setSelectedMonster(monster)}/>
                            <span>{monster.name}</span>
                        </label>
                    ))}
                    </div>
                </div>

                {/* map image shortcut and monster point */}
                <div className="detector-shortcut">
                    <div className="map-viewer-medium">
                        <img src={`${IMG_URL_BASE}/${selectedMonster.mapName === "???" ? "아포카리몬 맵" : selectedMonster.mapName}.png`} />
                        <MonsterShortcut monster={selectedMonster} digimon={digimon} key={getUUID()} />
                    </div>
                    {/* monster - image shortcut + name + type + hp + str&week */}
                    <div className="detector-shortcut-infos">
                        <div className="detector-monster">
                            <div className="monster-image">
                                <img src={`${IMG_URL_BASE}/${selectedMonster.name}.png`} />
                            </div>
                            <div className="detector-monster-info">
                                <div className="title">
                                    {selectedMonster.name}
                                    <img src={`${IMG_URL_BASE}/${digimon.digimonType}.png`} />
                                </div>
                                <div className="detector-monster-description">레벨 : {selectedMonster.level}</div>
                                <div className="detector-monster-description">HP : {selectedMonster.hp.toLocaleString("ko-KR")}</div>
                                <div className="detector-monster-description">등장 수 : {selectedMonster.count}마리</div>
                                <div className="detector-monster-description">강점 : <img src={`${IMG_URL_BASE}/스킬_${digimon.strength}.png`} />{digimon.strength} - {digimon.strengthEffect}</div>
                                <div className="detector-monster-description">약점 : <img src={`${IMG_URL_BASE}/스킬_${digimon.weakness}.png`} />{digimon.weakness} - {digimon.weaknessEffect}</div>
                            </div>
                            <DigimonSkills digimon={digimon} containModal={false} key={getUUID()} />
                        </div>
                        { selectedMonster && relatedDigimon && 
                            <div className="detector-monster">
                                <div className="monster-image">
                                    <img src={`${IMG_URL_BASE}/${relatedDigimon.name}.png`} />
                                </div>
                                <div className="detector-monster-info">
                                    <div className="title">
                                        {relatedDigimon.name}
                                        <img src={`${IMG_URL_BASE}/${relatedDigimon.digimonType}.png`} />
                                    </div>
                                    <div className="detector-monster-description">레벨 : {relatedMonster.level}</div>
                                    <div className="detector-monster-description">HP : {relatedMonster.hp.toLocaleString("ko-KR")}</div>
                                    <div className="detector-monster-description">등장 수 : {relatedMonster.count}마리</div>
                                    <div className="detector-monster-description">강점 : <img src={`${IMG_URL_BASE}/스킬_${relatedDigimon.strength}.png`} />{relatedDigimon.strength} - {relatedDigimon.strengthEffect}</div>
                                    <div className="detector-monster-description">약점 : <img src={`${IMG_URL_BASE}/스킬_${relatedDigimon.weakness}.png`} />{relatedDigimon.weakness} - {relatedDigimon.weaknessEffect}</div>
                                </div>
                                <DigimonSkills digimon={relatedDigimon} containModal={false} key={getUUID()} />
                            </div>
                        }
                        <div className="semi-title">
                            <img src={`${IMG_URL_BASE}/overflow semi title icon.png`} />
                            기믹{selectedMonster.strategies.length === 0 ? " - 없음" : ""}
                        </div>
                        { selectedMonster.strategies.length > 0 && 
                            <div className="strategies">
                                { selectedMonster.strategies.map(strategy => (
                                    <div className="strategy">
                                        { strategy.skillName === null ? "" : strategy.skillName }
                                        <div className={`badge enemy`}>{strategy.type}</div>
                                        <div className={`badge team`}>{strategy.turn === 0 ? "즉발" : `${strategy.turn}턴`}</div>
                                        -
                                        <div className="strategy-description" dangerouslySetInnerHTML={{ __html: strategy.description }}></div>
                                    </div>
                                ))}
                            </div>
                        }
                        <div className="semi-title">
                            <img src={`${IMG_URL_BASE}/overflow semi title icon.png`} />
                            보상
                        </div>
                        <div className="detector-rewards">
                            { selectedMonster.dropItems.map(dropItem => {
                                const item = getItemById(dropItem.itemId)!;
                                
                                return <div className="detector-reward">
                                    <img src={`${IMG_URL_BASE}/${getNameExceptColon(item.name)}.png`} />
                                    <div className="detector-reward-info">
                                        <span title={item.name}>{item.name}</span>
                                        <div className="detector-reward-property">
                                            <span className={dropItem.canTrade ? "green" : "red"}>{dropItem.canTrade ? "거래가능" : "거래불가"}</span>
                                            &nbsp;/&nbsp;
                                            <span className={dropItem.isAlways ? "green" : "red"}>{dropItem.isAlways ? "확정" : "확률"}</span>
                                        </div>
                                        <span>{dropItem.count}ea</span>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>


                {/* rewords */}
            </div>
        </div>
    );
}