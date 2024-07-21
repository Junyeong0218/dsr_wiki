import React, { useMemo, useRef, useState } from "react";
import DigimonStatusTable from "./digimonStatusTable";
import { getUUID } from "../../functions/commons";
import { getDigimonQualityText } from "../../functions";
import { Digimon } from "../../classes";
import { FieldType } from "../../classes/FieldType";
import { getAllFieldTypes } from "../../functions/getFieldTypes";
import FieldTypeModal from "./FieldTypeModal";
import { IMG_URL_BASE } from "../../enums";

type DigimonStatusProps = { digimon: Digimon }

export default function DigimonStatus({ digimon }: DigimonStatusProps): React.ReactElement {
    const fieldTypes = useMemo(() => getAllFieldTypes(), []);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const selectedField = useRef<FieldType>();

    const captureMouse = (event: React.MouseEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLImageElement;
        if(target?.tagName === "IMG") {
            const id = target.id;
            
            const fieldType = fieldTypes.find(c => c.type === id);
            if(fieldType) {
                if(selectedField.current?.type === fieldType.type) {
                    return;
                }
                console.log(Number(target.style.left.replace("px", "")));
                console.log(Number(target.style.top.replace("px", "")));
                selectedField.current = fieldType;
                
                const couponRect = target.parentElement!.getBoundingClientRect();
                console.log(target.parentElement)
                console.log(event.pageX, event.pageY);
                if(couponRect.top + 450 > window.innerHeight) {
                    setPosition({ top: 450 - couponRect.top + 10, left: event.pageX - couponRect.left + 2 });
                } else {
                    setPosition({ top: event.pageY, left: event.pageX });
                }
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }
    }

    const mouseLeaveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const relatedTarget = event.relatedTarget as HTMLDivElement;
        console.log(relatedTarget);
        try {
            if(relatedTarget.classList.contains("modal") || relatedTarget.classList.contains("field")) return;

            setIsOpen(false);
            selectedField.current = undefined;
        } catch (e) {
            setIsOpen(false);
            selectedField.current = undefined;
        }
    }

    const fieldTypeModal = useMemo(() => <FieldTypeModal isOpen={isOpen} field={selectedField.current} position={position} />, [isOpen, position]);

    return (
        <div className="digimon-stats">
            <div className="digimon-stat">
                <span className="title">* 스테이터스</span>
                <DigimonStatusTable digimon={digimon} /> 
                <div className="digimon-quality">
                    <img src={`${IMG_URL_BASE}/${digimon.strength} 강점.png`} />
                    <span>{digimon.strength} - {digimon.strengthEffect}</span>
                    <span className="description" dangerouslySetInnerHTML={{__html: getDigimonQualityText(digimon.strengthEffect)}}></span>
                </div>
                <div className="digimon-quality">
                    <img src={`${IMG_URL_BASE}/${digimon.weakness} 약점.png`} />
                    <span>{digimon.weakness} - {digimon.weaknessEffect}</span>
                    <span className="description" dangerouslySetInnerHTML={{__html: getDigimonQualityText(digimon.weaknessEffect)}}></span>
                </div>
            </div>
            <div className="digimon-stat">
                <span className="title">* 필드 타입</span>
                <div className="field-types" onMouseMove={captureMouse} onMouseLeave={mouseLeaveHandler}>
                    { digimon.fieldTypes.map(fieldType => <img id={fieldType} className="field" src={`${IMG_URL_BASE}/field_${fieldType}.png`} title={fieldType} key={getUUID()}/>)}
                </div>
            </div>
            { fieldTypeModal }
        </div>
    );
}