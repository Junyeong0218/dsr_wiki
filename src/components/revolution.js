import React, { useRef } from "react";
import Profile from "./profile";
import ToLeftProfileLine from "./toLeftProfileLine";
import ToLeftProfileGroup from "./toLeftProfileGroup";
import ToRightProfileLine from "./toRightProfileLine";
import ToRightProfileGroup from "./toRightProfileGroup";
import { getEvolutions } from "../functions";

export default function Revolution({ selectedDigimon }) {
    if(!selectedDigimon) {
        return <div className='revolution'></div>;
    }

    getEvolutions(selectedDigimon);
    console.log(selectedDigimon)
    
    return (
        <div className='revolution'>
            { selectedDigimon?.befores?.length > 0 && <ToLeftProfileGroup digimon={selectedDigimon} /> }
            { selectedDigimon?.befores?.length > 0 && <ToLeftProfileLine digimon={selectedDigimon} /> }
            { selectedDigimon && <Profile digimon={selectedDigimon} ></Profile>}
            { selectedDigimon?.afters?.length > 0 && <ToRightProfileLine digimon={selectedDigimon} /> }
            { selectedDigimon?.afters?.length > 0 && <ToRightProfileGroup digimon={selectedDigimon} /> }
        </div>
    );
}