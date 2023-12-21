import React from "react";
import { PROFILE_HEIGHT } from "../../enums";
import { getToRightTextStyle, jogressLineStyle, revolutionLineStyle } from "../styles";
import JogressProfile from "./jogressProfile";
import RequiredItem from "./requiredItem";
import { getUUID } from "../../functions/commons";
import { Evolution } from "../../classes";

export default function ToRightProfileLine({ digimon, reload }) {
    const commons = digimon.afters.filter(each => each.method === "일반");
    const jogress = digimon.afters.filter(each => each.method === "조그레스") || null;
    const commonReqItems = commons.filter((each, index) => each.ingredient !== "");
    const jogressReqItems = jogress?.filter((each, index) => each.ingredient !== "" && index === 0) || [];
    
    const getRightScore = (d) => {
        if(d.afters === null) return 1;
        if(d.afters[0].isFold) return 1;
        if(d.grade === 5) return d.afters.length;

        let acc = 0;

        d.afters?.forEach((a, i) => {
            if(a.duplicated) {
                acc++;
            } else {
                acc += getRightScore(a.digimon);
            }
        });
        return acc;
    }

    const getRightScoreUntil = (digimon, index) => {
        let acc = 0;
        for(let i = 0; i < digimon.afters?.length; i++) {
            if(i >= index) break;
            acc += getRightScore(digimon.afters[i].digimon);
        }

        return acc;
    }

    const getWholeTop = (digimon) => PROFILE_HEIGHT * getRightScore(digimon);

    const getMiddleTop = (digimon) => getWholeTop(digimon) / 2;

    const getRateTop = (_digimon, i) => {
        const ownIndex = digimon.afters.findIndex(after => after.to === _digimon.id);
        
        // 이전까지의 순수 높이 + 현재 높이의 절반 - 20
        return PROFILE_HEIGHT * getRightScoreUntil(digimon, i)
            + getMiddleTop(digimon.afters[ownIndex].digimon)
            - 20;
    }

    const toggleFold = () => {
        digimon.afters.forEach(after => {
            after.isFold = !after.isFold;
        });
        reload();
    }

    if(digimon.afters[0].isFold) {
        return (
            <div className="line-wrapper" style={{width: "20px", height: "80px"}} key={getUUID()}>
                <button type="button" className="toggle-fold-button" style={{top: "30px", left: "5px"}} onClick={toggleFold}>
                    <i className="fa-solid fa-plus" />
                </button>
            </div>
        );
    }

    return (
        <div className="line-wrapper" key={getUUID()}>
            {/* rate - ok */}
            { digimon.afters?.map((after, i) => 
                <span style={getToRightTextStyle(getRateTop(after.digimon, i))} key={getUUID()}>
                    {`${after.getRate()}%`}
                </span>
            )}

            <svg width={100} height={getWholeTop(digimon)}>
                {/* left line - ok */}
                <line x1={0} y1={getMiddleTop(digimon)} 
                      x2={50} y2={getMiddleTop(digimon)} 
                      style={revolutionLineStyle} 
                      key={getUUID()}/>
                
                {/* right line */}
                { digimon.afters?.map((after, i) => 
                    <line x1={50} y1={getRateTop(after.digimon, i) + 20} 
                          x2={100} y2={getRateTop(after.digimon, i) + 20} 
                          style={revolutionLineStyle} 
                          key={getUUID()}/>
                )}

                {/* vertical middle line */}
                { digimon.afters?.length > 1 && 
                    <line x1={50} y1={getMiddleTop(digimon.afters[0].digimon)} 
                          x2={50} y2={getWholeTop(digimon) - getMiddleTop(digimon.afters.at(-1).digimon)} 
                          style={revolutionLineStyle} 
                          key={getUUID()}/>}

                {/* jogress right line */}
                { jogress.length > 0 && 
                    jogress.map(each => (
                        <line x1={50} y1={getRateTop(each.digimon, digimon.afters.findIndex(after => after.to === each.to && after.method === "조그레스")) + 20} 
                              x2={100} y2={getRateTop(each.digimon, digimon.afters.findIndex(after => after.to === each.to && after.method === "조그레스")) + 20} 
                              style={jogressLineStyle} 
                              key={getUUID()}/>
                    ))
                }

                {/* jogress vertical middle line */}
                { jogress.length > 0 && 
                    <line x1={50} y1={getRateTop(jogress[0].digimon, digimon.afters.findIndex(after => after.to === jogress[0].to && after.method === "조그레스")) + 20} 
                          x2={50} y2={getRateTop(jogress.at(-1).digimon, digimon.afters.findIndex(after => after.to === jogress.at(-1).to && after.method === "조그레스")) + 20} 
                          style={jogressLineStyle} 
                          key={getUUID()}/>
                }
            </svg>

            {/* 조그레스 대상 디지몬 with */}
            { jogress.length > 0 &&
                <JogressProfile digimon={Evolution.getById(jogress[0].with)} 
                                top={getRateTop(jogress[0].digimon, digimon.afters.findIndex(after => after.to === jogress[0].to && after.method === "조그레스")) + 30}
                                key={getUUID()} />
            }

            {/* 필요아이템 있는 경우 표시 */}
            { commonReqItems.length > 0 &&
                <RequiredItem fileName={commonReqItems[0].ingredient} 
                              left={7}
                              top={PROFILE_HEIGHT * (commonReqItems.length / 2) - 15}
                              key={getUUID()} />
            }
            { jogressReqItems.length > 0 &&
                <RequiredItem fileName={jogressReqItems[0].ingredient} 
                              left={45}
                              top={getRateTop(jogress[0].digimon, digimon.afters.findIndex(after => after.to === jogress[0].to && after.method === "조그레스")) + 45}
                              key={getUUID()} />
            }
            <button type="button" className="toggle-fold-button" onClick={toggleFold} style={{top: `${getMiddleTop(digimon)-22}px`, left: "5px"}}>
                <i className="fa-solid fa-minus" />
            </button>
        </div>
    );
}