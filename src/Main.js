import React, { useMemo, useRef, useState } from 'react';
import Filters from './components/Filters';
import { getUUID } from './functions/commons';
import SearchBar from './components/SearchBar';
import EvolutionTree from './components/evolution/EvolutionTree';
import EvolutionDescriptionModal from './components/evolution/evolutionDescriptionModal';
import { Evolution } from './classes';
import { getJustBeforeEvolution } from './functions';

export default function Main() {
    const [selectedDigimon, setSelectedDigimon] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const modalDigimon = useRef(null);

    const captureMouse = (event) => {
        if(event.target?.className === "profile-image") {
            const targetName = event.target.nextElementSibling.innerText;
            if(targetName === selectedDigimon.name) modalDigimon.current = selectedDigimon;
            else if(targetName === modalDigimon.current?.name) {
                setPosition({ top: event.pageY, left: event.pageX });
            }
            else if(targetName.includes("[돌연변이]")) {
                setPosition({ top: event.pageY, left: event.pageX });
                setIsOpen(false);
                return;
            }
            else {
                const digimon = Evolution.getByName(targetName);
                if(digimon.grade === 1) return;
                
                getJustBeforeEvolution(digimon);
                modalDigimon.current = digimon;
            }
            setPosition({ top: event.pageY, left: event.pageX });
            setIsOpen(true);
        } else if(event.target?.id === "revolution-description") {
        } else {
            setIsOpen(false);
        }
    }

    const comboFilters = useMemo(() => {
        return <Filters selectedDigimon={selectedDigimon} setSelectedDigimon={setSelectedDigimon} key={"digimon_filter"} />;
    }, [selectedDigimon]);

    const searchBar = useMemo(() => {
        return <SearchBar setSelectedDigimon={setSelectedDigimon}/>
    }, []);

    const revolution = useMemo(() => {
        return <EvolutionTree selectedDigimon={selectedDigimon} key={getUUID()} />;
    }, [selectedDigimon])

    return (
        // <div className='main'>
        <div className='main' onMouseMove={captureMouse}>
            <h1 className="title-message">진화 상태에 맞는 디지몬을 선택하세요.</h1>
            { comboFilters }
            { searchBar }
            { revolution }
            <EvolutionDescriptionModal isActive={isOpen} digimon={modalDigimon.current} position={position} />
        </div>
    );
}