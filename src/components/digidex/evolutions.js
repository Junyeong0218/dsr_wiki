import React, { useMemo } from "react";
import { Evolution } from "../../classes";
import { divideEvolutionByMethod, getJustAfterEvolution, getJustBeforeEvolution } from "../../functions";
import ToLeftProfileGroup from "../evolution/toLeftProfileGroup";
import ToLeftProfileLine from "../evolution/toLeftProfileLine";
import Profile from "../evolution/profile";
import ToRightProfileLine from "../evolution/toRightProfileLine";
import ToRightProfileGroup from "../evolution/toRightProfileGroup";
import { useNavigate } from "react-router-dom";

export default function Evolutions({ selected }) {
    const evolution = Evolution.getByName(selected);
    getJustBeforeEvolution(evolution);
    getJustAfterEvolution(evolution);

    const navigate = useNavigate();

    const [commonEvolution, jogressEvolution] = divideEvolutionByMethod(evolution);

    const changeDigimon = (event) => {
        let digimonName = "";
        if(event.target.className === "profile") {
            digimonName = event.target.children[1].innerText;
        } else if(event.target.className === "profile-image") {
            digimonName = event.target.nextElementSibling.innerText;
        } else return;

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