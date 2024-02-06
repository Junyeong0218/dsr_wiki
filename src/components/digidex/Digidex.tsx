import React, { useState } from "react";
import { getAllDigimons, getDigimonQualityText } from "../../functions";
import { Link, useLocation } from "react-router-dom";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import DigimonInfo from "./digimonInfo";
import DigidexFilter from "./digidexFilter";
import { Grades } from "../../enums";

export default function Digidex(): React.ReactElement {
    const location = useLocation();
    const query = location.search;
    const selected = query.trim() === "" ? null : decodeURIComponent(query.replace("?digimon=", ""));

    // 지난 잔재 제거
    localStorage.removeItem("grade");
    localStorage.removeItem("type");
    localStorage.removeItem("element");
    
    if(selected) {
        return (
            <div className="main">
                <div className="digidex" style={{ flexWrap: "nowrap" }}>
                    <DigimonInfo selected={selected} />
                </div>
            </div>
        );
    }
    
    const all = getAllDigimons(false);
    const [filtered, setFiltered] = useState(all);
    const [isTable, setIsTable] = useState(false);
    
    return (
        <div className="main">
            <div className="digidex">
                <DigidexFilter all={all} setFiltered={setFiltered} />

                <div className="toggle-table-container">
                    <div className="toggle-container" onClick={() => setIsTable(!isTable)}>
                        <span className={`${isTable ? "" : "selected"}`}>초상화</span>
                        <div className={`circle-container ${isTable ? "right" : ""}`}>
                            <span className="circle"></span>
                        </div>
                        <span className={`${isTable ? "selected" : ""}`}>표</span>
                    </div>
                </div>

                { isTable && <div className="table-legend-container">
                    <div className="table-legend">
                        <span className="box casting"></span>
                        <span className="text">캐스팅</span>
                    </div>
                    <div className="table-legend">
                        <span className="box"></span>
                        <span className="text">단일 공격기</span>
                    </div>
                    <div className="table-legend">
                        <span className="box global"></span>
                        <span className="text">전체 공격기</span>
                    </div>
                    <div className="table-legend">
                        <span className="box melee"></span>
                        <span className="text">근거리 공격</span>
                    </div>
                    <div className="table-legend">
                        <span className="box ranged"></span>
                        <span className="text">원거리 공격</span>
                    </div>
                </div>}
                
                { isTable && 
                    <table className="digidex-table">
                        <thead>
                            <tr>
                                <td>이름</td>
                                <td>진화단계</td>
                                <td>HP</td>
                                <td>SP</td>
                                <td>힘</td>
                                <td>지능</td>
                                <td>속도</td>
                                <td>수비</td>
                                <td>저항</td>
                                <td>강점</td>
                                <td>약점</td>
                                <td>1스킬</td>
                                <td>2스킬</td>
                                <td>3스킬</td>
                                {/* <td>필드타입</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            { filtered.map(each => (
                                <tr key={getUUID()}>
                                    <td><img src={`/images/${each.name}.png`} />&nbsp;{each.name}</td>
                                    <td>{Grades[each.grade]}</td>
                                    <td>{each.hp.toLocaleString("ko-KR")}</td>
                                    <td>{each.sp.toLocaleString("ko-KR")}</td>
                                    <td>{each.str.toLocaleString("ko-KR")}</td>
                                    <td>{each.int.toLocaleString("ko-KR")}</td>
                                    <td>{each.spd.toLocaleString("ko-KR")}</td>
                                    <td>{each.def.toLocaleString("ko-KR")}</td>
                                    <td>{each.res.toLocaleString("ko-KR")}</td>
                                    <td title={getDigimonQualityText(each.strengthEffect, false)}>
                                        <img src={`/images/${each.strength} 강점.png`} />
                                        &nbsp;
                                        {each.strengthEffect}
                                    </td>
                                    <td title={getDigimonQualityText(each.weaknessEffect, false)}>
                                        <img src={`/images/${each.weakness} 약점.png`} />
                                        &nbsp;
                                        {each.weaknessEffect}
                                    </td>
                                    {/* 1안 - 내가한거 */}
                                    {/* { each.skills.map(skill => (
                                        <td className={`${skill.additionalTurn ? "casting" : ""}`}>
                                            <img src={`/images/스킬_${skill.element}.png`} />
                                            <img src={`/images/스킬_${skill.targetCount}.png`} title={skill.targetCount} />
                                            <img src={`/images/스킬_${skill.range}.png`} title={skill.range} />
                                            { skill.effect && skill.effect !== "회복" && <img src={`/images/스킬_${skill.effect}.png`} title={skill.effect} /> }
                                            { skill.effect && skill.effect === "회복" && ` ${skill.effect}` }
                                            {skill.attackCount > 0 && ` ${skill.attackCount}타`}
                                            {skill.attackCount > 0 && ` ${skill.getPercentByIndex(9)}%`}
                                        </td>
                                    ))} */}
                                    { each.skills.map(skill => {
                                        let className = "";
                                        if(skill.targetCount === "전체") className += "global ";
                                        if(skill.additionalTurn) className += "casting ";
                                        if(skill.range === "근거리") className += "melee";
                                        if(skill.range === "원거리") className += "ranged";

                                        return <td className={className} key={getUUID()}>
                                            <img src={`/images/스킬_${skill.element}.png`} />
                                            {/* <img src={`/images/스킬_${skill.targetCount}.png`} title={skill.targetCount} />
                                            <img src={`/images/스킬_${skill.range}.png`} title={skill.range} /> */}
                                            { skill.effect ? " ": ""}
                                            { skill.effect && skill.effect !== "회복" && <img src={`/images/스킬_${skill.effect}.png`} title={skill.effect} /> }
                                            { skill.effect && skill.effect === "회복" && ` ${skill.effect}` }
                                            { skill.attackCount > 0 && ` ${skill.attackCount}타` }
                                            { skill.attackCount > 0 && ` ${skill.getPercentByIndex(9)}%` }
                                            {/* { skill.additionalTurn ? " ": "" }
                                            { skill.additionalTurn && <span className="bold">캐스팅</span> } */}
                                        </td>
                                    })}
                                    { each.skills.length < 3 && <td></td> }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                { !isTable && filtered.map(each => {
                    const style = each.name.length > 8 ? {fontSize: "12px"} : {};

                    return <Link to={`/digimons/digidex?digimon=${each.name}`} key={getUUID()}>
                                <button type="button" className="digimon-button">
                                    <img src={`/images/${each.name}.png`} loading="lazy" />
                                    { each.tag ? <span style={style} dangerouslySetInnerHTML={{__html: each.tag}}></span> : <span style={style}>{each.name}</span>}
                                </button>
                            </Link>
                }) }
            </div>
        </div>
    );
}