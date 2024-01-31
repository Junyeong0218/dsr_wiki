import React from "react";
import { PROFILE_HEIGHT } from "../../enums";
import { getToLeftTextStyle, jogressLineStyle, revolutionLineStyle } from "../styles";
import RequiredItem from "./requiredItem";
import { getUUID } from "../../functions/commons";
import { Evolution } from "../../classes";

type LineProps = { 
    digimon: Evolution, 
    reload?: () => void
}

export default function ToLeftProfileLine({ digimon, reload }: LineProps): React.ReactElement {
    const commons = digimon.befores?.filter(each => each.method === "일반");
    const jogress = digimon.befores?.filter(each => each.method === "조그레스") || [];
    const commonReqItems = commons?.filter((each, index) => each.ingredient !== "") || [];
    const jogressReqItems = jogress.filter((each, index) => each.ingredient !== "" && index === 0) || [];

    const GAP = 5;
    
    const getLeftScore = (d: Evolution): number => {
        if(d.befores === null) return 1;
        if(d.befores[0].isFold) return 1;
        if(d.grade === 2) return d.befores.length;
        
        let acc = 0;

        d.befores?.forEach((b, i) => {
            if(b.duplicated) {
                acc++;
            } else {
                acc += getLeftScore(b.digimon!);
            }
        });
        return acc;
    }

    const getLeftScoreUntil = (digimon: Evolution, index: number): number => {
        let acc = 0;
        for(let i = 0; i < (digimon.befores?.length ?? 0); i++) {
            if(i >= index) break;
            acc += getLeftScore(digimon.befores![i].digimon!);
        }

        return acc;
    }

    const getWholeTop = (digimon: Evolution) => {
        const leftScore = getLeftScore(digimon);

        let acc = PROFILE_HEIGHT * leftScore;

        if(leftScore > 1) acc += GAP * (leftScore - 1);

        return acc;
    }

    const getMiddleTop = (digimon: Evolution) => getWholeTop(digimon) / 2;

    const getRateTop = (_digimon: Evolution, i: number) => {
        const ownIndex = digimon.befores!.findIndex(before => before.from === _digimon.id);
        
        const untilScore = getLeftScoreUntil(digimon, i);
        let untilHeight = PROFILE_HEIGHT * untilScore;
        
        if(untilScore > 0) untilHeight += GAP * untilScore;
        
        // 이전까지의 순수 높이 + 현재 높이의 절반 - 20
        return untilHeight
            + getMiddleTop(digimon.befores![ownIndex].digimon!)
            - 20;
    }

    const toggleFold = () => {
        digimon.befores!.forEach(before => {
            before.isFold = !before.isFold;
        });
        
        if(reload) reload();
    }

    if(digimon.befores![0].isFold) {
        return (
            <div className="line-wrapper" style={{width: "20px", height: "80px"}} key={getUUID()}>
                <button type="button" className="toggle-fold-button" style={{top: "30px", right: "5px"}} onClick={toggleFold}>
                    <i className="fa-solid fa-plus" />
                </button>
            </div>
        );
    }

    return (
        <div className="line-wrapper" key={getUUID()}>
            {/* rate - ok */}
            { digimon.befores?.map((before, i) => 
                <span style={getToLeftTextStyle(getRateTop(before.digimon!, i)) as React.CSSProperties} key={getUUID()}>
                    {`${before.getRate()}%`}
                </span>
            )}

            <svg width={100} height={getWholeTop(digimon)}>
                {/* left line */}
                { digimon.befores?.map((before, i) => 
                    <line x1={0} y1={getRateTop(before.digimon!, i) + 20} 
                          x2={50} y2={getRateTop(before.digimon!, i) + 20} 
                          style={revolutionLineStyle as React.CSSProperties} 
                          key={getUUID()} />
                )}

                {/* vertical middle line */}
                { digimon.befores!.length > 1 && 
                    <line x1={50} y1={getMiddleTop(digimon.befores![0].digimon!)} 
                          x2={50} y2={getWholeTop(digimon) - getMiddleTop(digimon.befores!.at(-1)!.digimon!)} 
                          style={revolutionLineStyle as React.CSSProperties} 
                          key={getUUID()}/>}

                {/* right line - ok */}
                <line x1={50} y1={getMiddleTop(digimon)} 
                      x2={100} y2={getMiddleTop(digimon)} 
                      style={revolutionLineStyle as React.CSSProperties} 
                      key={getUUID()} />

                {/* jogress left line */}
                { jogress.length > 0 && 
                    jogress.map(each => (
                        <line x1={0} y1={getRateTop(each.digimon!, digimon.befores!.findIndex(before => before.from === each.from && before.method === "조그레스")) + 20} 
                              x2={50} y2={getRateTop(each.digimon!, digimon.befores!.findIndex(before => before.from === each.from && before.method === "조그레스")) + 20} 
                              style={jogressLineStyle as React.CSSProperties}
                              key={getUUID()} />
                    ))
                }

                {/* jogress vertical middle line */}
                { jogress.length > 0 && 
                    <line x1={50} y1={getRateTop(jogress[0].digimon!, digimon.befores!.findIndex(before => before.from === jogress[0].from && before.method === "조그레스")) + 20} 
                          x2={50} y2={getRateTop(jogress.at(-1)!.digimon!, digimon.befores!.findIndex(before => before.from === jogress.at(-1)!.from && before.method === "조그레스")) + 20} 
                          style={jogressLineStyle as React.CSSProperties}
                          key={getUUID()} />
                }
            </svg>

            {/* 필요아이템 있는 경우 표시 */}
            { commonReqItems.length > 0 &&
                <RequiredItem fileName={commonReqItems[0].ingredient} 
                              left={43}
                              top={getMiddleTop(digimon) - 15}
                              key={getUUID()} />
            }
            { jogressReqItems.length > 0 &&
                <RequiredItem fileName={jogressReqItems[0].ingredient} 
                              left={43}
                              top={getMiddleTop(digimon) - 15}
                              key={getUUID()} />
            }

            { reload && 
                <button type="button" className="toggle-fold-button" onClick={toggleFold} style={{top: `${getMiddleTop(digimon)-22}px`, right: "5px"}}>
                    <i className="fa-solid fa-minus" />
                </button>
            }
            
        </div>
    );
}