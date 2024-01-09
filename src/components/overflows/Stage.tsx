import React from "react";
import { Stage } from "../../classes/Overflow";
import Reword from "./Reword";
import { getUUID } from "../../functions/commons";

type StageProps = { stage: Stage };

export default function StageTag({ stage }: StageProps): React.ReactElement {
    return (
        <div className="stage">
            <div className="monsters">
                <span>stage {stage.id}</span>
                { stage.monsters.map((monster, index) => {
                    // const digimon = Digimon.getByName(monster.name)!;

                    return <div className="monster" key={getUUID()}>
                        <img src={`/images/${monster.name}.png`} className="stage-monster-image"  data-id={`${stage.id}-${index}`}/>
                        <img src={`/images/${monster.digimonType}.png`} />
                        {/* <span>{monster.name}</span>
                        <span>Lv.{monster.level}</span>
                        <span>hp : {monster.hp}</span>
                        <div>
                            <img src={`/images/${digimon.strength} 강점.png`} />
                            <img src={`/images/${digimon.weakness} 약점.png`} />
                        </div> */}
                    </div>
                })}
            </div>
            <div className="rewords">
                <div className="first-rewords">
                    <span className="title">첫 클리어</span>
                    { stage.firstRewords.map(reword => (
                        <Reword reword={reword} key={getUUID()}/>
                    ))}
                </div>
                <div className="repeat-rewords">
                    <span className="title">반복</span>
                    { stage.repeatRewords.map(reword => (
                        <Reword reword={reword} key={getUUID()}/>
                    ))}
                </div>
            </div>
        </div>
    );
}