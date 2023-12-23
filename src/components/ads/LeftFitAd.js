import React, { useEffect, useRef } from "react";
import { createAdScript, createAdTag } from "../../functions";

export default function LeftFitAd() {
    const ad = useRef();
    
    useEffect(() => {
        const scr = createAdScript();

        ad.current?.appendChild(scr);

        return () => {
            const globalAdfit = window.adfit;
            if (globalAdfit) globalAdfit.destroy("DAN-K6fFoDz07jKGdUEj");
        }
    }, []);

    // const ins = createAdTag("DAN-K6fFoDz07jKGdUEj");
    return (
        <div className="ad-container" ref={ad}>
            <ins className="kakao_ad_area" style={{ display: "none" }}
                 data-ad-unit="DAN-K6fFoDz07jKGdUEj"
                 data-ad-width="320"
                 data-ad-height="100" />
        </div>
    )
}