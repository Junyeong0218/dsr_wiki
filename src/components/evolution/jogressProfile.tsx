import React from "react";
import { Evolution } from "../../classes";

type JogressProfileProps = { 
    digimon: Evolution, 
    top: number
}

export default function JogressProfile({ digimon, top }: JogressProfileProps): React.ReactElement {
    const fileName = digimon.name.includes("[돌연변이]") ? digimon.name.replace("[돌연변이]", "") : 
                                                          digimon.name;
    
    return (
        <div className="profile jogress" style={{top: `${top}px`, left: "5px"}}>
            <img src={`/images/${fileName}.png`} />
            <span>{digimon.name}</span>
        </div>
    );
}