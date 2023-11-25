import React, { useEffect, useState } from 'react';
import Revolution from './components/revolution';
import Filters from './components/Filters';
import { getEvolutions } from './functions';
import { getUUID } from './functions/commons';

export default function Main() {
    const [selectedDigimon, setSelectedDigimon] = useState(null);
    const [searchRange, setSearchRange] = useState(5);

    useEffect(() => {
        if(selectedDigimon) getEvolutions(selectedDigimon);
    }, [selectedDigimon])
    
    return (
        <div className='main'>
            <h1 className="title-message">진화 상태에 맞는 디지몬을 선택하세요.</h1>
            <Filters selectedDigimon={selectedDigimon} setSelectedDigimon={setSelectedDigimon} 
                     searchRange={searchRange} setSearchRange={setSearchRange} key={getUUID()} />
            <Revolution selectedDigimon={selectedDigimon} key={getUUID()} />
        </div>
    );
}