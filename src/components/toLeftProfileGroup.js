import React from "react";
import Digimon from "../classes/Digimon";
import { flexColumn, flexRow, flexRowAndAlignEnd } from "./styles";
import Profile from "./profile";
import ToLeftProfileLine from "./toLeftProfileLine";

export default function ToLeftProfileGroup({ digimon }) {
    const wrapperStyle = digimon.befores.length === 1 ? flexRow : flexColumn;

    if(digimon.befores.length === 1) {
        if(digimon.befores[0].digimon.befores) {
            return (<div className="profile-group" style={wrapperStyle}>
                        <ToLeftProfileGroup digimon={digimon.befores[0].digimon} />
                        <ToLeftProfileLine digimon={digimon.befores[0].digimon} />
                        <Profile digimon={digimon.befores[0].digimon} />
                    </div>);
        }
        return <Profile digimon={digimon.befores[0].digimon} />
    } else {
        return (
            <div className="profile-group" style={wrapperStyle} >
                { digimon.befores.map(before => {
                    const beforeDigimon = before.digimon;
                    if(!beforeDigimon.befores) {
                        return <Profile digimon={beforeDigimon} align={"end"} />
                    }
                    return (<div className="profile-group" style={flexRowAndAlignEnd}>
                                <ToLeftProfileGroup digimon={beforeDigimon} />
                                <ToLeftProfileLine digimon={beforeDigimon} />
                                <Profile digimon={beforeDigimon} />
                            </div>);
                })}
            </div>
        );
    }
}