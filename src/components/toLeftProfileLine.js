import React from "react";
import { PROFILE_HEIGHT } from "../enums";
import { getToLeftTextStyle, jogressLineStyle, revolutionLineStyle } from "./styles";
import Digimon from "../classes/Digimon";
import RequiredItem from "./requiredItem";
import JogressProfile from "./jogressProfile";

export default function ToLeftProfileLine({ digimon }) {
    const commons = digimon.befores.filter(each => each.method === "일반");
    const jogress = digimon.befores.filter(each => each.method === "조그레스") || null;
    const commonReqItems = commons.filter((each, index) => each.ingredient !== "");
    const jogressReqItems = jogress?.filter((each, index) => each.ingredient !== "" && index === 0) || [];
    
    console.log(jogress);

    const getLeftScore = (d) => {
        if(d.befores === null) return 1;
        if(d.grade === 2) return d.befores.length;
        
        let acc = 0;

        d.befores?.forEach((b, i) => {
            if(b.duplicated) {
                acc++;
            } else {
                acc += getLeftScore(b.digimon);
            }
        });
        return acc;
    }

    const getLeftScoreUntil = (digimon, index) => {
        let acc = 0;
        for(let i = 0; i < digimon.befores?.length; i++) {
            if(i >= index) break;
            acc += getLeftScore(digimon.befores[i].digimon);
        }

        return acc;
    }

    const getWholeTop = (digimon) => PROFILE_HEIGHT * getLeftScore(digimon);

    const getMiddleTop = (digimon) => getWholeTop(digimon) / 2;

    const getRateTop = (_digimon, i) => {
        const ownIndex = digimon.befores.findIndex(before => before.from === _digimon.id);
        
        // 이전까지의 순수 높이 + 현재 높이의 절반 - 20
        return PROFILE_HEIGHT * getLeftScoreUntil(digimon, i)
            + getMiddleTop(digimon.befores[ownIndex].digimon)
            - 20;
    }

    return (
        <div className="line-wrapper">
            {/* rate - ok */}
            { digimon.befores?.map((before, i) => 
                <span style={getToLeftTextStyle(getRateTop(before.digimon, i))}>
                    {`${before.getRate()}%`}
                </span>
            )}

            <svg width={100} height={getWholeTop(digimon)}>
                {/* left line */}
                { digimon.befores?.map((before, i) => 
                    <line x1={0} y1={getRateTop(before.digimon, i) + 20} 
                          x2={50} y2={getRateTop(before.digimon, i) + 20} 
                          style={revolutionLineStyle} />
                )}

                {/* vertical middle line */}
                { digimon.befores?.length > 1 && 
                    <line x1={50} y1={getMiddleTop(digimon.befores[0].digimon)} 
                          x2={50} y2={getWholeTop(digimon) - getMiddleTop(digimon.befores.at(-1).digimon)} 
                          style={revolutionLineStyle} />}

                {/* right line - ok */}
                <line x1={50} y1={getMiddleTop(digimon)} 
                      x2={100} y2={getMiddleTop(digimon)} 
                      style={revolutionLineStyle} />

                {/* jogress left line */}
                { jogress.length > 0 && 
                    jogress.map(each => (
                        <line x1={0} y1={getRateTop(each.digimon, digimon.befores.findIndex(before => before.from === each.from && before.method === "조그레스")) + 20} 
                              x2={50} y2={getRateTop(each.digimon, digimon.befores.findIndex(before => before.from === each.from && before.method === "조그레스")) + 20} 
                              style={jogressLineStyle} />
                    ))
                }

                {/* jogress vertical middle line */}
                { jogress.length > 0 && 
                    <line x1={50} y1={getRateTop(jogress[0].digimon, digimon.befores.findIndex(before => before.from === jogress[0].from && before.method === "조그레스")) + 20} 
                          x2={50} y2={getRateTop(jogress.at(-1).digimon, digimon.befores.findIndex(before => before.from === jogress.at(-1).from && before.method === "조그레스")) + 20} 
                          style={jogressLineStyle} />
                }
            </svg>

            {/* 필요아이템 있는 경우 표시 */}
            { commonReqItems.length > 0 &&
                <RequiredItem fileName={commonReqItems[0].ingredient} 
                              left={43}
                              top={getMiddleTop(digimon) - 15}/>
            }
            { jogressReqItems.length > 0 &&
                <RequiredItem fileName={jogressReqItems[0].ingredient} 
                              left={43}
                              top={getMiddleTop(digimon) - 15} />
            }
        </div>
    );
}