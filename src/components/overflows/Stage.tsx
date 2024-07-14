import React, { useState } from "react";
import { Stage } from "../../classes/Overflow";
import Reword from "./Reword";
import { getUUID } from "../../functions/commons";

type StageProps = { stage: Stage };

export default function StageTag({ stage }: StageProps): React.ReactElement {
    const [isFold, SetIsFold] = useState(true);

    return (
        <div className={`stage ${isFold ? "fold": ""}`}>
            <button type="button" className="title" onClick={() => SetIsFold(!isFold)}>stage {stage.id}</button>
            <div className="monsters">
                { stage.monsters.map((monster, index) => {
                    return <div className="monster" key={getUUID()}>
                        <img src={`/images/${monster.name}.png`} className="stage-monster-image"  data-id={`${stage.id}-${index}`}/>
                        <img src={`/images/${monster.digimonType}.png`} />
                    </div>
                })}
            </div>
            <div className="rewords">
                <div className="first-rewords">
                    <span className="title">첫 클리어</span>
                    { stage.firstRewards.map(reword => (
                        <Reword reword={reword} key={getUUID()}/>
                    ))}
                </div>
                <div className="repeat-rewords">
                    <span className="title">반복</span>
                    { stage.repeatRewards.map(reword => (
                        <Reword reword={reword} key={getUUID()}/>
                    ))}
                </div>
            </div>
        </div>
    );
}