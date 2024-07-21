import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import { IShopItem } from "../../classes/Shop";
import { FieldType } from "../../classes/FieldType";
import { IMG_URL_BASE } from "../../enums";

type CouponModalProps = { 
    isOpen: boolean,
    position: { left: number, top: number },
    field: FieldType | undefined
}

export default function FieldTypeModal({ isOpen, position, field }: CouponModalProps): React.ReactElement {
    return (
        <div id="field-type-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                { field && field.increments.map((increment, index) => {
                    const percent = `${Math.floor(increment * 10_000) * 100 / 10_000}%`;

                    return (
                        <div className="field-type" key={getUUID()}>
                            <div className="images">
                                <img src={`${IMG_URL_BASE}/field_${field.type}.png`}/>
                                <img src={`${IMG_URL_BASE}/field_${field.type}.png`}/>
                                { index === 1 && <img src={`${IMG_URL_BASE}/field_${field.type}.png`}/> }
                            </div>
                            <span className="">{field.type} 필드 시너지 {field.stat} 증가 {percent}</span>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}