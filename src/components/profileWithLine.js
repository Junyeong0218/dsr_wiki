import React from "react";
import Profile from "./profile";
import ProfileGroup from "./profileGroup";
import ProfileLine from "./profileLine";

export default function ProfileWithLine({ digimon, direction, length }) {
    const verticalHeight = { height: `calc(var(--profile-height) * ${digimon.down?.length - 1.05})` };
    // const verticalLine = <svg width={10} height={digimon.down?.length * }><line ></line></svg>
    if(direction === "right") {
        return (
            <div className="profile-line">
                { digimon.down?.length > 0 && <ProfileGroup digimons={digimon.down} direction={direction}></ProfileGroup>}
                { digimon.down?.length > 0 && length === "half" && <span className={`vertical-line ${direction}`} style={verticalHeight}></span> }
                { digimon.down?.length > 1 && length === "half" && <span className={`line ${length}`}></span> }
                <Profile digimon={digimon}></Profile>
                { <ProfileLine key={`${digimon.from}_horizontal`} digimon={digimon} length={length}></ProfileLine> }
            </div>
        );
    } else {
        return (
            <div className="profile-line">
                { direction === "left" && <span className={`line ${length}`}></span>}
                <Profile digimon={digimon}></Profile>
                { direction === "left" && digimon.down?.length > 0 && <ProfileGroup digimons={digimon.down} direction={direction}></ProfileGroup>}
                { direction === "left" && length === "half" && <span className={`vertical-line ${direction}`}></span> }
            </div>
        );
    }
}