import React from "react";
import { Monster } from "../../classes";
import { getDigimonFileName } from "../../functions/getDigimonFileName";
import { getDigimonByName } from "../../functions/getDigimons";

type props = {
    monster: Monster | undefined
}

export default function MonsterInfo({ monster }: props): React.ReactElement {
    const fileName = monster ? getDigimonFileName(monster.name) : "blank";
    const digimon = getDigimonByName(monster?.name ?? "");

    return (
        <div className="user-digimon-info">
            <div className="user-digimon-image">
                { monster ? <img src={`/images/${fileName}.png`} /> : "" }
            </div>
            <div className="status">
                <div className="row">
                    <span className="title">속성</span>
                    <span>{ monster && <img src={`/images/${monster?.digimonType}.png`} /> }</span>
                </div>
                <div className="row">
                    <span className="title">레벨</span>
                    <span>{ monster?.level ?? 0 }</span>
                </div>
                <div className="row">
                    <span className="title">체력</span>
                    <span>{ monster?.hp.toLocaleString("ko-KR") ?? 0 }</span>
                </div>
                <div className="row">
                    <span className="title">수비</span>
                    <span>{ monster?.def.toLocaleString("ko-KR") ?? 0 }</span>
                </div>
                <div className="row">
                    <span className="title">강점</span>
                    <div>
                        { digimon && <img src={`/images/${digimon.strength} 강점.png`} /> }
                        { digimon && `${digimon.strength} - ${digimon.strengthEffect}` }
                    </div>
                </div>
                <div className="row">
                    <span className="title">약점</span>
                    <div>
                        { digimon && <img src={`/images/${digimon.weakness} 약점.png`} /> }
                        { digimon && `${digimon.weakness} - ${digimon.weaknessEffect}` }
                    </div>
                </div>
            </div>
        </div>
    );
}