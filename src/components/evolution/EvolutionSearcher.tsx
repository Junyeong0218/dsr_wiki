import React, { useMemo, useRef, useState } from 'react';
import { Evolution } from '../../classes';
import { getEvolutions, getJustBeforeEvolution, toggleFoldEvolution } from '../../functions';
import Filters from './Filters';
import SearchBar from './SearchBar';
import EvolutionTree from './EvolutionTree';
import EvolutionDescriptionModal from './evolutionDescriptionModal';
import { getUUID } from '../../functions/commons';

export default function EvolutionSearcher(): React.ReactElement {
    const [selectedDigimon, setSelectedDigimon] = useState<Evolution|null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [hideFoldButton, setHideFoldButton] = useState(false);

    const modalDigimon = useRef<Evolution|null>(null);

    const captureMouse = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if(target?.className === "profile-image") {
            // const targetName = (target.nextElementSibling! as HTMLSpanElement).innerText;
            const targetName = target.dataset.id!;
            if(targetName.includes("[돌연변이]")) {
                setPosition({ top: 0, left: 0 });
                setIsOpen(false);
                return;
            }

            if(targetName === selectedDigimon!.name) modalDigimon.current = selectedDigimon;
            else if(targetName !== modalDigimon.current?.name) {
                const digimon = Evolution.getByName(targetName);
                if(!digimon || digimon.grade === 1) return;
                
                getJustBeforeEvolution(digimon);
                modalDigimon.current = digimon;
            }

            const mapRect = document.querySelector(".main")!.getBoundingClientRect();
            const modalHeight = modalDigimon.current!.grade === 6 && modalDigimon.current!.befores![0].method === "조그레스" ? 337 : 
                                modalDigimon.current!.grade === 6 && modalDigimon.current!.befores![0].method === "일반" ? 396 :
                                modalDigimon.current!.grade === 5 && modalDigimon.current!.befores![0].method === "일반" ? 236 : 
                                modalDigimon.current!.grade === 5 && modalDigimon.current!.befores![0].method === "조그레스" ? 337 : 
                                modalDigimon.current!.grade === 4 && modalDigimon.current!.befores![0].method === "조그레스" ? 297 : 
                                modalDigimon.current!.grade === 4 ? 179 : 159;
            if(event.clientY + modalHeight >= window.innerHeight - 20) {
                setPosition({ top: window.innerHeight - modalHeight - mapRect.top - 20, left: event.pageX - mapRect.left + 2 });
            } else {
                setPosition({ top: event.clientY - mapRect.top, left: event.clientX - mapRect.left + 2 });
            }
            setIsOpen(true);
        } else if(target?.id === "revolution-description") {
        } else {
            setPosition({ top: 0, left: 0 });
            setIsOpen(false);
        }
    }

    const changeDigimon = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        let digimonName = "";
        if(target.className === "profile") {
            digimonName = (target.querySelector(".profile-image") as HTMLImageElement).dataset.id!;
        } else if(target.className === "profile-image") {
            digimonName = target.dataset.id!;
        } else return;

        if(digimonName.includes("돌연변이")) return;

        const digimon = Evolution.getByName(digimonName);
        if(digimon) {
            getEvolutions(digimon);
            setSelectedDigimon(digimon);
            // window.scrollTo(0, 0);
            setPosition({ top: 0, left: 0 });
            setIsOpen(false);
        }
        
    }

    const reload = () => {
        setSelectedDigimon(Object.assign({}, selectedDigimon));
    }

    const foldAll = () => {
        toggleFoldEvolution(selectedDigimon, true);
        reload();
    }

    const spreadAll = () => {
        toggleFoldEvolution(selectedDigimon, false);
        reload();
    }

    const comboFilters = useMemo(() => {
        return <Filters selectedDigimon={selectedDigimon} setSelectedDigimon={setSelectedDigimon} key={"digimon_filter"} />;
    }, [selectedDigimon]);

    // const searchBar = useMemo(() => {
    //     return <SearchBar setSelectedDigimon={setSelectedDigimon}/>
    // }, []);

    const evolution = useMemo(() => {
        return <EvolutionTree selectedDigimon={selectedDigimon} reload={reload} key={getUUID()} />;
    }, [selectedDigimon]);

    const inputs = useMemo(() => {
        return <div className='evolution-checkboxes'>
            <div className='toggle-all-buttons'>
                <button type='button' onClick={spreadAll} key={getUUID()}>모두 펼치기</button>
                <button type='button' onClick={foldAll} key={getUUID()}>모두 접기</button>
            </div>
            <label className="check-box-container" htmlFor='hide-toggle-fold'>
                <input type='checkbox' id="hide-toggle-fold" checked={hideFoldButton} onChange={(e) => setHideFoldButton(e.target.checked)}/>
                접기/펼치기 버튼 숨기기
            </label>
        </div>
    }, [selectedDigimon, hideFoldButton]);

    return (
        <div className={`main ${hideFoldButton ? "hide-fold-button" : ""}`} onMouseMove={captureMouse} onClick={changeDigimon}>
            { comboFilters }
            { inputs }
            { evolution }
            <EvolutionDescriptionModal isActive={isOpen} digimon={modalDigimon.current} position={position} />
        </div>
    );
}