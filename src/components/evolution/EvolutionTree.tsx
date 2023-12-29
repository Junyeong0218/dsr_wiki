import React from "react";
import Profile from "./profile";
import ToLeftProfileLine from "./toLeftProfileLine";
import ToLeftProfileGroup from "./toLeftProfileGroup";
import ToRightProfileLine from "./toRightProfileLine";
import ToRightProfileGroup from "./toRightProfileGroup";
import { getUUID } from "../../functions/commons";
import { Evolution } from "../../classes";

type EvolutionTreeProps = { 
    selectedDigimon: Evolution|null, 
    reload: () => void 
}

export default function EvolutionTree({ selectedDigimon, reload }: EvolutionTreeProps): React.ReactElement {
    if(!selectedDigimon) {
        return <div className='evolution'></div>;
    }
    
    return (
        <div className='evolution'>
            { selectedDigimon.befores && selectedDigimon.befores?.length > 0 && <ToLeftProfileGroup reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
            { selectedDigimon.befores && selectedDigimon.befores?.length > 0 && <ToLeftProfileLine reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
            { selectedDigimon && <Profile digimon={selectedDigimon} key={getUUID()} />}
            { selectedDigimon.afters && selectedDigimon.afters?.length > 0 && <ToRightProfileLine reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
            { selectedDigimon.afters && selectedDigimon.afters?.length > 0 && <ToRightProfileGroup reload={reload} digimon={selectedDigimon} key={getUUID()} /> }
        </div>
    );
}