import React, { useMemo } from "react";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE, RequireStatName } from "../../enums";
import { Evolution } from "../../classes";
import { getDigimonFileName } from "../../functions/getDigimonFileName";

type ModalProps = { 
    isActive: boolean, 
    position: { top: number, left: number }, 
    digimon: Evolution|null
}

export default function EvolutionDescriptionModal({ isActive, position, digimon }: ModalProps): React.ReactElement {
// export default function RevolutionDescriptionModal({ isActive, top, left, digimon }) {
    if(digimon === null) return (
        <div id="evolution-description" className={`modal ${isActive ? "active" : ""}`}>
            <div className="window"></div>
        </div>
    );

    const style = {top: `${position.top + 10}px`, left: `${position.left + 10}px`};
    // const style = {top: `${position.current.top + 10}px`, left: `${position.current.left + 10}px`};
    // const style = {top: `${top + 10}px`, left: `${left + 10}px`};

    const commons = digimon.befores?.filter(b => b.method === "일반") || [];
    const jogress = digimon.befores?.filter(b => b.method === "조그레스") || [];

    const commonsRevolution = useMemo(() => {
        return commons.length > 0 &&
        // return 
        <div className="commons">
            <svg width={200} height={20}>
                <line x1={10} y1={10} x2={190} y2={10} style={{stroke: "var(--theme-light-font-color)", strokeWidth: `${2}px`}} strokeDasharray="4,4" />
            </svg>
            <span className="semi-title">일반 진화</span>
            { commons.length > 0 && digimon.grade < 5 &&
                <div className="targets">
                    { commons.map(d => (
                        <div className="target" key={getUUID()}>
                            <img src={`${IMG_URL_BASE}/${getDigimonFileName(d.digimon!.name)}.png`} />
                            <span>{d.digimon!.name}</span>
                            <span>{`${d.getRate()}%`}</span>
                        </div>
                    )) }
                </div>
            }
            { commons.length > 0 && digimon.grade < 5 &&
                <div className="conditions">
                    <div className="conditions common">
                        { Object.keys(commons[0])?.filter(key => Object.keys(RequireStatName).includes(key) && commons[0][key] !== 0 && commons[0][key] !== "").map(key => (
                            <div className="condition" key={getUUID()}>
                                <span className="condition-title">{RequireStatName[key]}</span>
                                <span className="condition-value">{key === "reqBonding" ? commons[0].getBonding() + "%" : commons[0][key]}</span>
                            </div>
                        )) }
                        { commons[0].ingredient !== null &&
                            <div className="condition">
                                <span className="condition-title">아이템</span>
                                <span>
                                    {commons[0].ingredient}&nbsp;
                                    <img src={`${IMG_URL_BASE}/${commons[0].ingredient}.png`} />
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
                            <img src={`${IMG_URL_BASE}/${getDigimonFileName(common.digimon!.name)}.png`} />
                            <span className="digimon-name">{common.digimon!.name}<br />{`${common.getRate()}%`}</span>
                            { Object.keys(common)?.filter(key => Object.keys(RequireStatName).includes(key) && common[key] !== 0 && common[key] !== "").map(key => (
                                <div className="condition" key={getUUID()}>
                                    <span className="condition-title">{RequireStatName[key]}</span>
                                    <span className="condition-value">{key === "reqBonding" ? common.getBonding() + "%" : common[key]}</span>
                                </div>
                            )) }
                            { common.ingredient !== null && 
                                <div className="condition" style={{alignSelf: "flex-end"}}>
                                    <img src={`${IMG_URL_BASE}/${common.ingredient}.png`} />
                                    <span className="digimon-name">{common.ingredient}</span>
                                </div> 
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    }, [digimon]);

    const jogressRevolution = useMemo(() => {
        return jogress.length > 0 &&
        // return 
        <div className="jogress">
                        <svg width={200} height={20}>
                        <line x1={10} y1={10} x2={190} y2={10} style={{stroke: "var(--theme-light-font-color)", strokeWidth: `${2}px`}}  strokeDasharray="4,4" />
                    </svg>
                    <span className="semi-title">조그레스 진화</span>
                    <div className="conditions">
                        <div className="conditions jogress">
                            <img src={`${IMG_URL_BASE}/${jogress[0].digimon!.name}.png`} />
                            <span className="digimon-name">{jogress[0].digimon!.name}</span>
                            { Object.keys(jogress[0])?.filter(key => Object.keys(RequireStatName).includes(key) && jogress[0][key] !== 0 && jogress[0][key] !== "").map(key => (
                                <div className="condition" key={getUUID()}>
                                    <span className="condition-title">{RequireStatName[key]}</span>
                                    <span className="condition-value">{key === "reqBonding" ? jogress[0].getBonding() + "%" : jogress[0][key]}</span>
                                </div>
                            )) }
                        </div>
                        <div className="conditions jogress">
                            <img src={`${IMG_URL_BASE}/${jogress[1].digimon!.name}.png`} />
                            <span className="digimon-name">{jogress[1].digimon!.name}</span>
                            { Object.keys(jogress[1])?.filter(key => Object.keys(RequireStatName).includes(key) && jogress[1][key] !== 0 && jogress[1][key] !== "").map(key => (
                                <div className="condition" key={getUUID()}>
                                    <span className="condition-title">{RequireStatName[key]}</span>
                                    <span className="condition-value">{key === "reqBonding" ? jogress[1].getBonding() + "%" : jogress[1][key]}</span>
                                </div>
                            )) } 
                        </div>
                        { jogress[0].ingredient !== "" && <div className="conditions jogress">
                            <img src={`${IMG_URL_BASE}/${jogress[0].ingredient}.png`} />
                            <span className="digimon-name">{jogress[0].ingredient}</span>
                        </div> }
                    </div>
                </div>
    }, [digimon]);

    return (
        <div id="evolution-description" className={`modal ${isActive ? "active" : ""}`} style={style} >
            <div className="window">
                <span className="title">{digimon.name} 진화 조건</span>
                { commonsRevolution }
                { jogressRevolution }
            </div>
        </div>
    );
}