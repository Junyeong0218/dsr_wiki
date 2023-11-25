import React from "react";
import Digimon from "../classes/Digimon";
import { flexColumn, flexRow, flexRowAndAlignStart } from "./styles";
import Profile from "./profile";
import ToRightProfileLine from "./toRightProfileLine";

export default function ToRightProfileGroup({ digimon }) {
    const wrapperStyle = digimon.afters.length === 1 ? flexRow : flexColumn;

    if(digimon.afters.length === 1) {
        if(digimon.afters[0].digimon.afters) {
            return (<div className="profile-group" style={wrapperStyle}>
                        <Profile digimon={digimon.afters[0].digimon} />
                        <ToRightProfileLine digimon={digimon.afters[0].digimon} />
                        <ToRightProfileGroup digimon={digimon.afters[0].digimon} />
                    </div>);
        }
        return <Profile digimon={digimon.afters[0].digimon} />;
    } else {
        return (
            <div className="profile-group" style={wrapperStyle} >
                { digimon.afters.map(after => {
                    const afterDigimon = after.digimon;
                    if(!afterDigimon.afters) {
                        return <Profile digimon={afterDigimon} align={"start"} />
                    }
                    return (<div className="profile-group" style={flexRowAndAlignStart}>
                                <Profile digimon={afterDigimon} />
                                <ToRightProfileLine digimon={afterDigimon} />
                                <ToRightProfileGroup digimon={afterDigimon} />
                            </div>);
                })}
            </div>
        );
    }
}