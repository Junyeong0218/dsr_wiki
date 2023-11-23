import React from "react";

export default function Profile({ digimon, align = null }) {
    const alignStyle = !align ? {} : 
                        align === "end" ? {alignSelf: "flex-end"} : 
                                          {alignSelf: "flex-start"};
                                          
    const fileName = digimon.from.includes("[돌연변이]") ? digimon.from.replace("[돌연변이]", "") : 
                                                          digimon.from;
    
    return (
        <div className="profile" style={alignStyle}>
            <img src={`/images/${fileName}.png`} />
            <span>{digimon.from}</span>
        </div>
    );
}