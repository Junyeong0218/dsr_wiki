import React, { useState } from "react";

export default function Footer() {
    const [complete, setComplete] = useState("");
    const [copyText, setCopyText] = useState("복사하기");
    const coupon = "DSR1THX";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(coupon).then(() => {
            setComplete("complete");
            setCopyText("복사완료!");

            setTimeout(() => {
                setComplete("");
                setCopyText("복사하기");
            }, 2500);
        }).catch(error => {
            alert("복사에 실패했습니다.\n관리자에게 문의해주세요.");
        });
    }

    return (
        <div className="footer">
            <div className="descriptions">
                <span className="description">개인이 만든 홈페이지로 게임사와 무관합니다.</span>
                <span className="description">오류, 개선 등 문의는 카페 댓글 혹은 <img src="/images/discord.png"/> 디스코드 hippo2003으로 연락바랍니다.</span>
            </div>
            <div className="event">
                <span className="title">1주년 쿠폰</span>
                <span className="description accent">쿠폰번호 : {coupon}</span>
                <button type="button" className={`copy-button ${complete}`} onClick={copyToClipboard}>{copyText}</button>
            </div>
        </div>
    );
}