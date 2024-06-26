import React from "react";
import { flexColumn, flexRow, flexRowAndAlignStart } from "../styles";
import Profile from "./profile";
import ToRightProfileLine from "./toRightProfileLine";
import { getUUID } from "../../functions/commons";
import { Evolution } from "../../classes";

type GroupProps = { 
    digimon: Evolution, 
    reload?: () => void
}

export default function ToRightProfileGroup({ digimon, reload }: GroupProps): React.ReactElement {
    if(!digimon.afters || digimon.afters[0].isFold) return <></>;
    
    const wrapperStyle = digimon.afters.length === 1 ? flexRow : flexColumn;

    if(digimon.afters.length === 1) {
        if(digimon.afters[0].digimon!.afters) {
            return (<div className="profile-group" style={wrapperStyle as React.CSSProperties} key={getUUID()}>
                        <Profile digimon={digimon.afters[0].digimon!} key={getUUID()} />
                        <ToRightProfileLine digimon={digimon.afters[0].digimon!} reload={reload} key={getUUID()} />
                        <ToRightProfileGroup digimon={digimon.afters[0].digimon!} reload={reload} key={getUUID()} />
                    </div>);
        }
        return <Profile digimon={digimon.afters[0].digimon!} key={getUUID()}/>;
    } else {
        return (
            <div className="profile-group" style={wrapperStyle as React.CSSProperties} >
                { digimon.afters.map(after => {
                    const afterDigimon = after.digimon;
                    if(!afterDigimon?.afters) {
                        return <Profile digimon={afterDigimon!} align={"start"} key={getUUID()} />
                    }
                    return (<div className="profile-group" style={flexRowAndAlignStart as React.CSSProperties} key={getUUID()}>
                                <Profile digimon={afterDigimon!} key={getUUID()} />
                                <ToRightProfileLine digimon={afterDigimon!} reload={reload} key={getUUID()} />
                                <ToRightProfileGroup digimon={afterDigimon!} reload={reload} key={getUUID()} />
                            </div>);
                })}
            </div>
        );
    }
}