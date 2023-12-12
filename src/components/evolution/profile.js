import React from "react";

export default function Profile({ digimon, align = null }) {
    const alignStyle = !align ? {} : align === "end" ? {alignSelf: "flex-end"} : 
                                                       {alignSelf: "flex-start"};
                                          
    const fileName = digimon.name.includes("[돌연변이]") ? digimon.name.replace("[돌연변이]", "") : 
                                                          digimon.name;
    
    return (
        <div className="profile" style={alignStyle}>
            <img className="profile-image" src={`/images/${fileName}.png`} />
            <span>{digimon.name}</span>
            { digimon.grade > 2 && 
                <img className="profile-digimon-type" src={`/images/${digimon.digimonType}.png`} />
            }
        </div>
    );
}