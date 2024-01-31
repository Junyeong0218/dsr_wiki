import React, { useMemo, useState } from "react";
import { Digimon, Evolution } from "../../classes";
import { divideEvolutionByMethod, getJustAfterEvolution, getJustBeforeEvolution } from "../../functions";
import ToLeftProfileGroup from "../evolution/toLeftProfileGroup";
import ToLeftProfileLine from "../evolution/toLeftProfileLine";
import Profile from "../evolution/profile";
import ToRightProfileLine from "../evolution/toRightProfileLine";
import ToRightProfileGroup from "../evolution/toRightProfileGroup";
import { useNavigate } from "react-router-dom";

type EvolutionsProps = { digimon: Digimon }

export default function Evolutions({ digimon }: EvolutionsProps): React.ReactElement {
    const evolution = Evolution.getByName(digimon.name);

    if(!evolution) return <></>;

    const [activePrevEvo, setActivePrevEvo] = useState(false);
    const [activeNextEvo, setActiveNextEvo] = useState(false);
    const [activeJogressEvo, setActiveJogressEvo] = useState(false);

    getJustBeforeEvolution(evolution);
    getJustAfterEvolution(evolution);

    const navigate = useNavigate();

    const [commonEvolution, jogressEvolution] = divideEvolutionByMethod(evolution);
    
    const changeDigimon = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        let digimonName = "";
        if(target.className === "profile") {
            digimonName = (target.querySelector(".profile-image") as HTMLImageElement).dataset.id!;
        } else if(target.className === "profile-image") {
            digimonName = (target as HTMLImageElement).dataset.id!;
        } else return;
        if(digimonName.includes("돌연변이")) return;

        navigate(`/digimons/digidex?digimon=${digimonName}`);
    }

    const evolutions = useMemo(() => {
        return <div className="evolutions" onClick={changeDigimon}>
                    <div className="evolution-info">
                        <button type="button" className="title" onClick={() => setActivePrevEvo(!activePrevEvo)}>이전 진화</button>
                        <div className={`evolution ${activePrevEvo ? "active" : ""}`}>
                            <ToLeftProfileGroup digimon={evolution} />
                            <ToLeftProfileLine digimon={evolution} />
                            <Profile digimon={evolution} />
                        </div>
                    </div>
                    { <div className="evolution-info">
                            <button className={`title ${commonEvolution.afters!.length > 0 ? "" : "disabled"}`} onClick={() => setActiveNextEvo(!activeNextEvo)}>일반 진화</button>
                            { commonEvolution.afters!.length > 0 &&
                                <div className={`evolution ${activeNextEvo ? "active" : ""}`}>
                                    <Profile digimon={commonEvolution} />
                                    <ToRightProfileLine digimon={commonEvolution} />
                                    <ToRightProfileGroup digimon={commonEvolution} />
                                </div>
                            }
                        </div>
                    }
                    { <div className="evolution-info">
                            <span className={`title ${jogressEvolution ? "" : "disabled"}`} onClick={() => setActiveJogressEvo(!activeJogressEvo)}>조그레스 진화</span>
                            { jogressEvolution && 
                                <div className={`evolution ${activeJogressEvo ? "active" : ""}`}>
                                    <Profile digimon={jogressEvolution} />
                                    <ToRightProfileLine digimon={jogressEvolution} />
                                    <ToRightProfileGroup digimon={jogressEvolution} />
                                </div>
                            }
                        </div>
                    }
                </div>;
    }, [digimon, activePrevEvo, activeNextEvo, activeJogressEvo]);

    return evolutions;
}