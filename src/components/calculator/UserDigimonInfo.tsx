import React from "react";
import { Digimon } from "../../classes";
import { getDigimonFileName } from "../../functions/getDigimonFileName";
import { IMG_URL_BASE } from "../../enums";

type props = {
    userDigimon: Digimon | undefined
}

export default function UserDigimonInfo({ userDigimon }: props): React.ReactElement {
    const fileName = userDigimon ? getDigimonFileName(userDigimon.name) : "blank";

    return (
        <div className="user-digimon-info">
            <div className="user-digimon-image">
                { userDigimon ? <img src={`${IMG_URL_BASE}/${fileName}.png`} /> : "" }
            </div>
            <div className="status">
                <div className="row">
                    <span className="title">속성</span>
                    <span>{ userDigimon && <img src={`${IMG_URL_BASE}/${userDigimon?.digimonType}.png`} /> }</span>
                </div>
                <div className="row">
                    <span className="title">레벨</span>
                    <span>100</span>
                </div>
                <div className="row">
                    <span className="title">힘</span>
                    <span>{userDigimon?.str.toLocaleString("ko-KR")}</span>
                </div>
            </div>
        </div>
    );
}