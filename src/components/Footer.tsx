import React, { useState } from "react";
import FooterCoupon from "./footerCoupon";
import { IMG_URL_BASE } from "../enums";

export default function Footer(): React.ReactElement {
    return (
        <div className="footer">
            <div className="descriptions">
                <span className="description">개인이 만든 홈페이지로 게임사와 무관합니다.</span>
                <span className="description">오류, 개선 등 문의는 <a href="https://discord.gg/SmfhwyqMYZ" target="_blank"><img src={`${IMG_URL_BASE}/discord.png`}/>위키 피드백 디스코드 서버 <i className="fa-solid fa-arrow-up-right-from-square"></i></a> 로 연락바랍니다.</span>
            </div>
        </div>
    );
}