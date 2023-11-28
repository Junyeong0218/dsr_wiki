import React from "react";
import { flexColumn, flexRow, flexRowAndAlignEnd } from "../styles";
import Profile from "./profile";
import ToLeftProfileLine from "./toLeftProfileLine";
import { getUUID } from "../../functions/commons";

export default function ToLeftProfileGroup({ digimon }) {
    const wrapperStyle = digimon.befores.length === 1 ? flexRow : flexColumn;

    if(digimon.befores.length === 1) {
        if(digimon.befores[0].digimon.befores) {
            return (<div className="profile-group" style={wrapperStyle} key={getUUID()}>
                        <ToLeftProfileGroup digimon={digimon.befores[0].digimon} key={getUUID()} />
                        <ToLeftProfileLine digimon={digimon.befores[0].digimon} key={getUUID()} />
                        <Profile digimon={digimon.befores[0].digimon} key={getUUID()} />
                    </div>);
        }
        return <Profile digimon={digimon.befores[0].digimon} key={getUUID()} />
    } else {
        return (
            <div className="profile-group" style={wrapperStyle} key={getUUID()}>
                { digimon.befores.map(before => {
                    const beforeDigimon = before.digimon;
                    if(!beforeDigimon.befores) {
                        return <Profile digimon={beforeDigimon} align={"end"} key={getUUID()} />
                    }
                    return (<div className="profile-group" style={flexRowAndAlignEnd} key={getUUID()}>
                                <ToLeftProfileGroup digimon={beforeDigimon} key={getUUID()} />
                                <ToLeftProfileLine digimon={beforeDigimon} key={getUUID()} />
                                <Profile digimon={beforeDigimon} key={getUUID()} />
                            </div>);
                })}
            </div>
        );
    }
}