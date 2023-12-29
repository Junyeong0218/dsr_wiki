import React, { useState } from "react";

type couponProp = { title: string, coupon: string }

export default function FooterCoupon({ title, coupon }: couponProp): React.ReactElement {
    const [complete, setComplete] = useState("");
    const [copyText, setCopyText] = useState("복사하기");
    
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
        <div className="event">
            <span className="title">{title}</span>
            <span className="description accent">쿠폰번호 : {coupon}</span>
            <button type="button" className={`copy-button ${complete}`} onClick={copyToClipboard}>{copyText}</button>
        </div>
    );
}