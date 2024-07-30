import React, { useState } from "react";
import FooterCoupon from "./footerCoupon";
import { IMG_URL_BASE } from "../enums";

export default function Footer(): React.ReactElement {
    return (
        <div className="footer">
            <div className="descriptions">
                <span className="description">개인이 만든 홈페이지로 게임사와 무관합니다.</span>
            </div>
        </div>
    );
}