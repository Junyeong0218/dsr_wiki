import React, { useEffect, useRef } from "react";
import { createAdScript, createAdTag } from "../../functions";

export default function RightFitAd() {
    const ad = useRef();
    
    useEffect(() => {
        const scr = createAdScript();

        ad.current?.appendChild(scr);

        return () => {
            const globalAdfit = window.adfit;
            if (globalAdfit) globalAdfit.destroy("DAN-EfclxRdL7MlO66g3");
        }
    }, []);

    return (
        <div className="ad-container" ref={ad}>
            <ins className="kakao_ad_area" style={{ display: "none" }}
                 data-ad-unit="DAN-EfclxRdL7MlO66g3"
                 data-ad-width="320"
                 data-ad-height="100" />
        </div>
    );
}