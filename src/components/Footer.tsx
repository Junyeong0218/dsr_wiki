import React, { useState } from "react";
import FooterCoupon from "./footerCoupon";

export default function Footer(): React.ReactElement {
    return (
        <div className="footer">
            <div className="descriptions">
                <span className="description">개인이 만든 홈페이지로 게임사와 무관합니다.</span>
                <span className="description">오류, 개선 등 문의는 카페 댓글 혹은 <img src="/images/discord.png"/> 디스코드 hippo2003으로 연락바랍니다.</span>
            </div>
        </div>
    );
}