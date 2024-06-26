import React from "react";
import { flexColumn, flexRow, flexRowAndAlignEnd } from "../styles";
import Profile from "./profile";
import ToLeftProfileLine from "./toLeftProfileLine";
import { getUUID } from "../../functions/commons";
import { Evolution } from "../../classes";

type GroupProps = { 
    digimon: Evolution, 
    reload?: () => void
}

export default function ToLeftProfileGroup({ digimon, reload }: GroupProps): React.ReactElement {
    const wrapperStyle = digimon.befores?.length === 1 ? flexRow : flexColumn;
    
    if(!digimon.befores || digimon.befores[0].isFold) return <></>;

    if(digimon.befores.length === 1) {
        if(digimon.befores[0].digimon!.befores) {
            return (<div className="profile-group" style={wrapperStyle as React.CSSProperties} key={getUUID()}>
                        <ToLeftProfileGroup digimon={digimon.befores[0].digimon!} reload={reload} key={getUUID()} />
                        <ToLeftProfileLine digimon={digimon.befores[0].digimon!} reload={reload} key={getUUID()} />
                        <Profile digimon={digimon.befores[0].digimon!} key={getUUID()} />
                    </div>);
        }
        return <Profile digimon={digimon.befores[0].digimon!} key={getUUID()} />
    // } else if(digimon.befores[0].isFold) {
        // 접은 경우
    } else {
        return (
            <div className="profile-group" style={wrapperStyle as React.CSSProperties} key={getUUID()}>
                { digimon.befores.map(before => {
                    const beforeDigimon = before.digimon;
                    if(!beforeDigimon!.befores) {
                        return <Profile digimon={beforeDigimon!} align={"end"} key={getUUID()} />
                    }
                    return (<div className="profile-group" style={flexRowAndAlignEnd as React.CSSProperties} key={getUUID()}>
                                <ToLeftProfileGroup digimon={beforeDigimon!} reload={reload} key={getUUID()} />
                                <ToLeftProfileLine digimon={beforeDigimon!} reload={reload} key={getUUID()} />
                                <Profile digimon={beforeDigimon!} key={getUUID()} />
                            </div>);
                })}
            </div>
        );
    }
}