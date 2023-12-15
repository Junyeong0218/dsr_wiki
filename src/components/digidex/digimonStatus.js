import React from "react";
import DigimonStatusTable from "./digimonStatusTable";
import { getUUID } from "../../functions/commons";
import { getDigimonQualityText } from "../../functions";

export default function DigimonStatus({ digimon }) {
    return (
        <div className="digimon-stats">
            <div className="digimon-stat">
                <span className="title">* 스테이터스</span>
                <DigimonStatusTable digimon={digimon} /> 
                <div className="digimon-quality">
                    <img src={`/images/${digimon.strength} 강점.png`} />
                    <span>{digimon.strength} - {digimon.strengthEffect}</span>
                    <span className="description" dangerouslySetInnerHTML={{__html: getDigimonQualityText(digimon.strengthEffect)}}></span>
                </div>
                <div className="digimon-quality">
                    <img src={`/images/${digimon.weakness} 약점.png`} />
                    <span>{digimon.weakness} - {digimon.weaknessEffect}</span>
                    <span className="description" dangerouslySetInnerHTML={{__html: getDigimonQualityText(digimon.weaknessEffect)}}></span>
                </div>
            </div>
            <div className="digimon-stat">
                <span className="title">* 필드 타입</span>
                <div className="field-types">
                    { digimon.fieldTypes.map(fieldType => <img src={`/images/field_${fieldType}.png`} title={fieldType} key={getUUID()}/>)}
                </div>
            </div>
        </div>
    );
}