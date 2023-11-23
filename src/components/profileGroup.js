import React from "react";
import Profile from "./profile";
import ProfileLine from "./profileLine";

export default function ProfileGroup({ digimons, direction }) {
    const flexRowAndAlignEnd = {flexDirection: "row", alignSelf: "flex-end"};
    const flexRowAndAlignStart = {flexDirection: "row", alignSelf: "flex-start"};
    const flexRow = {flexDirection: "row"};
    const flexColumn = {flexDirection: "column"};

    const getRandomInt = () => Math.floor(Math.random() * 100000);

    if(direction === "right") {
        if(digimons?.length === 1) {
            if(digimons[0].down !== undefined && digimons[0].down !== null) {
                return (<div className="profile-group" style={flexRow} key={`${digimons[0].from}_${getRandomInt()}`}>
                            <ProfileGroup digimons={digimons[0].down} direction={direction} key={`${digimons[0].from}_group_${getRandomInt()}`}></ProfileGroup>
                            <ProfileLine digimon={digimons[0]} direction={direction} key={`${digimons[0].from}_line_${getRandomInt()}`}></ProfileLine>
                            <Profile digimon={digimons[0]} key={`${digimons[0].from}_${getRandomInt()}`}></Profile>
                        </div>);
            } else {
                return (<div className="profile-group" style={flexRow} key={`${digimons[0].from}_group_${getRandomInt()}`}>
                            <Profile digimon={digimons[0]} key={`${digimons[0].from}_${getRandomInt()}`}></Profile>
                        </div>);
            }
        } else if(digimons?.length > 1) {
            return (
                <div className="profile-group" style={flexColumn} >
                    { digimons.map(digimon => {
                        if(digimon.down === undefined || digimon.down === null) {
                            if(digimon.type === "유년기1" || digimon.type === "유년기2")
                                return <Profile digimon={digimon} align={"end"} key={`${digimon.from}_${getRandomInt()}_${getRandomInt()}`}></Profile>;
                            else
                                console.log("digimons3 - only profile", direction, digimons)
                                return (<div className="profile-group">
                                    <ProfileLine digimon={digimon} direction={direction} key={`${digimon.from}_line_${getRandomInt()}`}></ProfileLine>
                                    <Profile digimon={digimon} align={"end"} key={`${digimon.from}_${getRandomInt()}`}></Profile>
                                </div>);
                        } else if(direction === "right") {
                            return (<div className="profile-group" style={flexRowAndAlignEnd} key={`${digimon.from}_group_${getRandomInt()}`}>
                                        <ProfileGroup digimons={digimon.down} direction={direction} key={`${digimon.from}_group__${getRandomInt()}`}></ProfileGroup>
                                        <ProfileLine digimon={digimon} direction={direction} key={`${digimon.from}_line_${getRandomInt()}`}></ProfileLine>
                                        <Profile digimon={digimon} key={`${digimon.from}_${getRandomInt()}`}></Profile>
                                    </div>);
                        } else {
                            return (<ProfileGroup digimons={digimon.down} direction={direction} key={`${digimon.from}_group_${getRandomInt()}`}></ProfileGroup>);
                        }
                    })}
                </div>
            );
        }
    } else {
        if(digimons?.length === 1) {
            if(digimons[0].up !== undefined && digimons[0].up !== null) {
                return (<div className="profile-group" style={flexRow} key={`${digimons[0].from}_group_${getRandomInt()}`}>
                            <Profile digimon={digimons[0]} key={`${digimons[0].from}_${getRandomInt()}`}></Profile>
                            <ProfileLine digimon={digimons[0]} direction={direction} key={`${digimons[0].from}_line_${getRandomInt()}`}></ProfileLine>
                            <ProfileGroup digimons={digimons[0].up} direction={direction} key={`${digimons[0].from}_group_${getRandomInt()}`}></ProfileGroup>
                        </div>);
            } else {
                return (<div className="profile-group" style={flexRow}>
                            <Profile digimon={digimons[0]} key={`${digimons[0].from}_${getRandomInt()}`}></Profile>
                        </div>);
            }
        } else if(digimons?.length > 1) {
            return (
                <div className="profile-group" style={flexColumn} key={`${digimons[0].from}_group_${getRandomInt()}`}>
                    { digimons.map(digimon => {
                        if(digimon.up === undefined || digimon.up === null) {
                            if(digimon.type === "궁극체" || digimon.type === "완전체")
                                return <Profile digimon={digimon} align={"start"} key={`${digimon.from}_${getRandomInt()}`}></Profile>;
                            else
                                return (<div className="profile-group" style={flexRowAndAlignStart} key={`${digimon.from}_group_${getRandomInt()}`}>
                                    {/* <ProfileLine digimon={digimon} direction={direction}></ProfileLine> */}
                                    <Profile digimon={digimon} align={"start"} key={`${digimon.from}_${getRandomInt()}`}></Profile>
                                </div>);
                        } else {
                            return (<div className="profile-group" style={flexRowAndAlignStart} key={`${digimon.from}_group_${getRandomInt()}`}>
                                <Profile digimon={digimon} key={`${digimon.from}_${getRandomInt()}`}></Profile>
                                <ProfileLine digimon={digimon} direction={direction} key={`${digimon.from}_line_${getRandomInt()}`}></ProfileLine>
                                <ProfileGroup digimons={digimon.up} direction={direction} key={`${digimon.from}_group_${getRandomInt()}`}></ProfileGroup>
                            </div>);
                        }
                    })}
                </div>
            );
        }
    }
}