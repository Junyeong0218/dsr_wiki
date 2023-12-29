import React, { useMemo } from "react";
import { Evolution } from "../../classes";
import { divideEvolutionByMethod, getJustAfterEvolution, getJustBeforeEvolution } from "../../functions";
import ToLeftProfileGroup from "../evolution/toLeftProfileGroup";
import ToLeftProfileLine from "../evolution/toLeftProfileLine";
import Profile from "../evolution/profile";
import ToRightProfileLine from "../evolution/toRightProfileLine";
import ToRightProfileGroup from "../evolution/toRightProfileGroup";
import { useNavigate } from "react-router-dom";

type EvolutionsProps = { selected: string }

export default function Evolutions({ selected }: EvolutionsProps): React.ReactElement {
    const evolution = Evolution.getByName(selected);

    if(!evolution) return <></>;

    getJustBeforeEvolution(evolution);
    getJustAfterEvolution(evolution);

    const navigate = useNavigate();

    const [commonEvolution, jogressEvolution] = divideEvolutionByMethod(evolution);
    
    const changeDigimon = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        let digimonName = "";
        if(target.className === "profile") {
            digimonName = (target.children[1] as HTMLSpanElement).innerText;
        } else if(target.className === "profile-image") {
            digimonName = (target.nextElementSibling as HTMLSpanElement).innerText;
        } else return;
        console.log(digimonName);
        if(digimonName.includes("돌연변이")) return;

        navigate(`/digidex?digimon=${digimonName}`);
    }

    const evolutions = useMemo(() => {
        return <div className="evolutions" onClick={changeDigimon}>
                    <div className="evolution">
                        <span className="title">이전 진화</span>
                        <ToLeftProfileGroup digimon={evolution} />
                        <ToLeftProfileLine digimon={evolution} />
                        <Profile digimon={evolution} />
                    </div>
                    { commonEvolution.afters &&
                        <div className="evolution">
                            <span className="title">일반 진화</span>
                            <Profile digimon={commonEvolution} />
                            <ToRightProfileLine digimon={commonEvolution} />
                            <ToRightProfileGroup digimon={commonEvolution} />
                        </div>
                    }
                    { jogressEvolution && 
                        <div className="evolution">
                            <span className="title">조그레스 진화</span>
                            <Profile digimon={jogressEvolution} />
                            <ToRightProfileLine digimon={jogressEvolution} />
                            <ToRightProfileGroup digimon={jogressEvolution} />
                        </div>
                    }
                </div>;
    }, [selected]);

    return evolutions;
}