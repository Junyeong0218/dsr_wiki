import React from "react";
import Profile from "./profile";
import ToLeftProfileLine from "./toLeftProfileLine";
import ToLeftProfileGroup from "./toLeftProfileGroup";
import ToRightProfileLine from "./toRightProfileLine";
import ToRightProfileGroup from "./toRightProfileGroup";
import { getUUID } from "../../functions/commons";

export default function EvolutionTree({ selectedDigimon, reload }) {
    if(!selectedDigimon) {
        return <div className='evolution'></div>;
    }
    
    return (
        <div className='evolution'>
            { selectedDigimon?.befores?.length > 0 && <ToLeftProfileGroup reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
            { selectedDigimon?.befores?.length > 0 && <ToLeftProfileLine reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
            { selectedDigimon && <Profile digimon={selectedDigimon} key={getUUID()} />}
            { selectedDigimon?.afters?.length > 0 && <ToRightProfileLine reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
            { selectedDigimon?.afters?.length > 0 && <ToRightProfileGroup reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
        </div>
    );
}