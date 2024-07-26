import React, { useRef } from "react";
import { IMG_URL_BASE } from "../../enums";

export default function RTDefense(): React.ReactElement {
    const defenseMap = useRef<HTMLDivElement>(null);

    const spawn = () => {
        const mob = <div className="monster"><img src={`${IMG_URL_BASE}/피요몬`} /></div>
    }

    return (
        <div className="main">
            <div className="random-tower-defense">
                <div className="defense">
                    <div className="status-bar">
                        <div>1 라운드</div>
                        <div>500 <img src={`${IMG_URL_BASE}/무배경_bit.png`} /></div>
                        <div>남은 적 : 0 마리</div>
                    </div>
                    <div className="defence-map" ref={defenseMap} >
                        <table className="digimon-arrangement">
                            <tbody>
                                <tr>
                                    <td className="placed"><img src={`${IMG_URL_BASE}/아구몬.png`} /></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="monster" style={{ position: "absolute", top: "30px", left: "30px", width: "30px", height: "30px" }}>
                            <div className="hp-bar"></div>
                            <img src={`${IMG_URL_BASE}/피요몬.png`} style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
                <div className="menu-bar">
                    <div className="title">배치 가능 디지몬</div>
                    <div className="usable-digimons">

                    </div>
                    <button type="button" className="random-gacha active">디지몬 뽑기 - 200 <img src={`${IMG_URL_BASE}/무배경_bit.png`} /></button>
                </div>
            </div>
        </div>
    );
}