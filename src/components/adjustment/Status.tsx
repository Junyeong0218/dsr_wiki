import React from "react";
import { Gauge } from "../../functions/adjustmentFunctions";

type StatusType = { gauges: Array<Gauge> }

export default function Status({ gauges }: StatusType): React.ReactElement {
    let hp = 0;
    let sp = 0;
    let str = 0;
    let int = 0;
    let def = 0;
    let res = 0;
    let spd = 0;

    gauges.forEach(gauge => {
        switch(gauge.type) {
            case "최대 HP": {
                hp += gauge.value * 100;
                return;
            }
            case "최대 SP": {
                sp += gauge.value * 100;
                return;
            }
            case "힘": {
                str += gauge.value * 100;
                return;
            }
            case "지능": {
                int += gauge.value * 100;
                return;
            }
            case "수비": {
                def += gauge.value * 100;
                return;
            }
            case "저항": {
                res += gauge.value * 100;
                return;
            }
            case "속도": {
                spd += gauge.value * 100;
                return;
            }
        }
    });

    return (
        <div className="stat-container">
            <div className="stat">
                <span className="title">최대 HP :</span>
                <span className={`value ${hp > 0 ? "active" : ""}`}>+ {hp}%</span>
            </div>
            <div className="stat">
                <span className="title">최대 SP :</span>
                <span className={`value ${sp > 0 ? "active" : ""}`}>+ {sp}%</span>
            </div>
            <div className="stat">
                <span className="title">힘 :</span>
                <span className={`value ${str > 0 ? "active" : ""}`}>+ {str}%</span>
            </div>
            <div className="stat">
                <span className="title">지능 :</span>
                <span className={`value ${int > 0 ? "active" : ""}`}>+ {int}%</span>
            </div>
            <div className="stat">
                <span className="title">수비 :</span>
                <span className={`value ${def > 0 ? "active" : ""}`}>+ {def}%</span>
            </div>
            <div className="stat">
                <span className="title">저항 :</span>
                <span className={`value ${res > 0 ? "active" : ""}`}>+ {res}%</span>
            </div>
            <div className="stat">
                <span className="title">속도 :</span>
                <span className={`value ${spd > 0 ? "active" : ""}`}>+ {spd}%</span>
            </div>
        </div>
    );
}