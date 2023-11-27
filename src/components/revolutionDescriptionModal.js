import React from "react";
import { getUUID } from "../functions/commons";
import { requireStatName } from "../enums";

export default function RevolutionDescriptionModal({ isActive, position, digimon }) {
// export default function RevolutionDescriptionModal({ isActive, top, left, digimon }) {
    if(digimon === null) return (
        <div id="revolution-description" className={`modal ${isActive ? "active" : ""}`}>
            <div className="window"></div>
        </div>
    );

    const style = {top: `${position.current.top + 10}px`, left: `${position.current.left + 10}px`};
    // const style = {top: `${top + 10}px`, left: `${left + 10}px`};

    const commons = digimon.befores?.filter(b => b.method === "일반") || [];
    const jogress = digimon.befores?.filter(b => b.method === "조그레스") || [];

    return (
        <div id="revolution-description" className={`modal ${isActive ? "active" : ""}`} style={style} >
            <div className="window">
                <span className="title">진화 조건</span>
                { commons.length > 0 &&
                    <div className="commons">
                        <svg width={200} height={20}>
                            <line x1={10} y1={10} x2={190} y2={10} style={{stroke: "var(--white)", strokeWidth: `${2}px`}} strokeDasharray="4,4" />
                        </svg>
                        <span className="semi-title">일반 진화</span>
                        { commons.length > 0 && digimon.grade < 5 &&
                            <div className="targets">
                                { commons.map(d => (
                                    <div className="target" key={getUUID()}>
                                        <img src={`/images/${d.digimon.name}.png`} />
                                        <span>{d.digimon.name}</span>
                                        <span>{`${d.getRate()}%`}</span>
                                    </div>
                                )) }
                            </div>
                        }
                        { commons.length > 0 && digimon.grade < 5 &&
                            <div className="conditions">
                                <div className="conditions common">
                                    { Object.keys(commons[0])?.filter(key => Object.keys(requireStatName).includes(key) && commons[0][key] !== 0 && commons[0][key] !== "").map(key => (
                                        <div className="condition" key={getUUID()}>
                                            <span className="condition-title">{requireStatName[key]}</span>
                                            <span className="condition-value">{key === "reqBonding" ? commons[0].getBonding() + "%" : commons[0][key]}</span>
                                        </div>
                                    )) }
                                    { commons[0].ingredient !== "" &&
                                        <div className="condition">
                                            <span className="condition-title">아이템</span>
                                            <span>
                                                {commons[0].ingredient}&nbsp;
                                                <img src={`/images/${commons[0].ingredient}.png`} />
                                            </span>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        { commons.length > 0 && digimon.grade >= 5 && 
                            <div className="conditions">
                                { commons.map(common => (
                                    <div className="conditions common" key={getUUID()}>
                                        <img src={`/images/${common.digimon.name}.png`} />
                                        <span className="digimon-name">{common.digimon.name}<br />{`${common.getRate()}%`}</span>
                                        { Object.keys(common)?.filter(key => Object.keys(requireStatName).includes(key) && common[key] !== 0 && common[key] !== "").map(key => (
                                            <div className="condition" key={getUUID()}>
                                                <span className="condition-title">{requireStatName[key]}</span>
                                                <span className="condition-value">{key === "reqBonding" ? common.getBonding() + "%" : common[key]}</span>
                                            </div>
                                        )) }
                                        { common.ingredient !== "" && 
                                            <div className="condition" style={{alignSelf: "flex-end"}}>
                                                <img src={`/images/${common.ingredient}.png`} />
                                                <span className="digimon-name">{common.ingredient}</span>
                                            </div> 
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                }
                { jogress.length > 0 && (
                    <div className="jogress">
                        <svg width={200} height={20}>
                            <line x1={10} y1={10} x2={190} y2={10} style={{stroke: "var(--white)", strokeWidth: `${2}px`}}  strokeDasharray="4,4" />
                        </svg>
                        <span className="semi-title">조그레스 진화</span>
                        <div className="conditions">
                            <div className="conditions jogress">
                                <img src={`/images/${jogress[0].digimon.name}.png`} />
                                <span className="digimon-name">{jogress[0].digimon.name}</span>
                                { Object.keys(jogress[0])?.filter(key => Object.keys(requireStatName).includes(key) && jogress[0][key] !== 0 && jogress[0][key] !== "").map(key => (
                                    <div className="condition" key={getUUID()}>
                                        <span className="condition-title">{requireStatName[key]}</span>
                                        <span className="condition-value">{key === "reqBonding" ? jogress[0].getBonding() + "%" : jogress[0][key]}</span>
                                    </div>
                                )) }
                            </div>
                            <div className="conditions jogress">
                                <img src={`/images/${jogress[1].digimon.name}.png`} />
                                <span className="digimon-name">{jogress[1].digimon.name}</span>
                                { Object.keys(jogress[1])?.filter(key => Object.keys(requireStatName).includes(key) && jogress[1][key] !== 0 && jogress[1][key] !== "").map(key => (
                                    <div className="condition" key={getUUID()}>
                                        <span className="condition-title">{requireStatName[key]}</span>
                                        <span className="condition-value">{key === "reqBonding" ? jogress[1].getBonding() + "%" : jogress[1][key]}</span>
                                    </div>
                                )) } 
                            </div>
                            { jogress[0].ingredient !== "" && <div className="conditions jogress">
                                <img src={`/images/${jogress[0].ingredient}.png`} />
                                <span className="digimon-name">{jogress[0].ingredient}</span>
                            </div> }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}