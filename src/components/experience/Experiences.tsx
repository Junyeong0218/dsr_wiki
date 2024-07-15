import React, { useMemo } from "react";
import { getExperiences } from "../../functions/getExperiences";

export default function Experiences(): React.ReactElement {
    const experiences = useMemo(() => getExperiences(), []);

    return (
        <div className="main">
            <div className="experiences">
                <div className="digimon-experience">
                    <div className="title">디지몬 경험치 표</div>
                    <table>
                        <thead>
                            <tr>
                                <td>레벨</td>
                                <td>필요 경험치</td>
                                <td>누적 경험치</td>
                            </tr>
                        </thead>
                        <tbody>
                            { experiences.digimon.map(each => {
                                return <tr>
                                    <td>{each.level}</td>
                                    <td>{each.exp.toLocaleString("ko-KR")}</td>
                                    <td>{each.acc.toLocaleString("ko-KR")}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="digimon-experience">
                    <div className="title">테이머 경험치 표</div>
                    <table>
                        <thead>
                            <tr>
                                <td>레벨</td>
                                <td>필요 경험치</td>
                                <td>누적 경험치</td>
                            </tr>
                        </thead>
                        <tbody>
                            { experiences.tamer.map(each => {
                                return <tr>
                                    <td>{each.level}</td>
                                    <td>{each.exp.toLocaleString("ko-KR")}</td>
                                    <td>{each.acc.toLocaleString("ko-KR")}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}