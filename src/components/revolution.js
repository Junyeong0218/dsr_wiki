import React from "react";
import ProfileGroup from "./profileGroup";
import Profile from "./profile";
import ProfileLine from "./profileLine";

export default function Revolution({ selectedDigimon }) {
    if(selectedDigimon === undefined || selectedDigimon === null || selectedDigimon.from === "디지몬 선택") {
        return (
            <div className='revolution'></div>
        );
    }
    
    return (
        <div className='revolution'>
            { selectedDigimon?.down?.length > 0 && <ProfileGroup key={`${selectedDigimon.from}_down`} digimons={selectedDigimon.down} direction={"right"}></ProfileGroup> }
            { selectedDigimon?.down?.length > 0 && <ProfileLine digimon={selectedDigimon} direction={"right"}></ProfileLine> }
            { selectedDigimon.from !== "" && <Profile digimon={selectedDigimon} ></Profile>}
            { selectedDigimon?.up?.length > 0 && <ProfileLine digimon={selectedDigimon} direction={"left"}></ProfileLine> }
            { selectedDigimon?.up?.length > 0 && <ProfileGroup key={`${selectedDigimon.from}_up`} digimons={selectedDigimon.up} direction={"left"}></ProfileGroup> }
        </div>
    );
}