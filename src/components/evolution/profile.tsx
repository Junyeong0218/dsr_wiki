import React from "react";
import { Evolution } from "../../classes";
import { getDigimonFileName } from "../../functions/getDigimonFileName";

type ProfileProps = { 
    digimon: Evolution, 
    align?: string|null
}

type AlignStyle = {
    alignSelf?: string,
    cursor?: string
}

export default function Profile({ digimon, align = null }: ProfileProps): React.ReactElement {
    const alignStyle: AlignStyle = !align ? {} : align === "end" ? {alignSelf: "flex-end"} : 
                                                                   {alignSelf: "flex-start"};
    
    const fileName = digimon.name.includes("[돌연변이]") ? digimon.name.replace("[돌연변이]", "") : 
                     digimon.name.includes(":") ? digimon.name.replace(":", " ") : 
                     digimon.name;
    
    if(!digimon.name.includes("돌연변이")) alignStyle['cursor'] = "pointer";
    
    return (
        <div className="profile" style={alignStyle}>
            <img className="profile-image" src={`/images/${getDigimonFileName(digimon.name)}.png`} alt={digimon.name} data-id={digimon.name}/>
            {/* <span>{digimon.name}</span> */}
            { digimon.grade > 2 && 
                <img className="profile-digimon-type" src={`/images/${digimon.digimonType}.png`} />
            }
        </div>
    );
}