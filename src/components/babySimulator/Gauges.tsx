import React, { useState } from "react";
import { Gauge } from "../../functions/adjustmentFunctions";
import { toInteger } from "lodash";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";

type GaugesType = { 
    gauges: Array<Gauge>
}

export default function Gauges({ gauges }: GaugesType): React.ReactElement {
    return (
        <div className="gauges-container">
            <div className="gauges">
                { gauges.map((gauge, index) => {
                    if(gauge.type === "NONE") 
                        return <div className="gauge" key={getUUID()}>
                                    <img src={`${IMG_URL_BASE}/교정_빈칸.png`} />
                                </div>;
                    if(gauge.type === "FAIL") 
                        return <div className={`gauge`} key={getUUID()}>
                                    <img src={`${IMG_URL_BASE}/교정_실패.png`} />
                                </div>;

                    return <div className={`gauge`} key={getUUID()}>
                                <span>{gauge.type} {toInteger(gauge.value)}%</span>
                                <img src={`${IMG_URL_BASE}/교정_성공.png`} />
                            </div>
                })}
            </div>
        </div>
        
    );
}