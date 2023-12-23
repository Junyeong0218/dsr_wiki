import React, { useMemo, useRef, useState } from 'react';
import { Evolution } from '../../classes';
import { getEvolutions, getJustBeforeEvolution, toggleFoldEvolution } from '../../functions';
import Filters from '../Filters';
import SearchBar from '../SearchBar';
import EvolutionTree from './EvolutionTree';
import EvolutionDescriptionModal from './evolutionDescriptionModal';
import { getUUID } from '../../functions/commons';

export default function EvolutionSearcher() {
    const [selectedDigimon, setSelectedDigimon] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [hideFoldButton, setHideFoldButton] = useState(false);

    const modalDigimon = useRef(null);

    const captureMouse = (event) => {
        if(event.target?.className === "profile-image") {
            const targetName = event.target.nextElementSibling.innerText;
            if(targetName.includes("[돌연변이]")) {
                setPosition({ top: 0, left: 0 });
                setIsOpen(false);
                return;
            }

            if(targetName === selectedDigimon.name) modalDigimon.current = selectedDigimon;
            else if(targetName !== modalDigimon.current?.name) {
                const digimon = Evolution.getByName(targetName);
                if(digimon.grade === 1) return;
                
                getJustBeforeEvolution(digimon);
                modalDigimon.current = digimon;
            }

            const mapRect = document.querySelector(".main").getBoundingClientRect();
            const modalHeight = modalDigimon.current.grade === 6 ? 396 :
                                modalDigimon.current.grade === 5 && modalDigimon.current.befores[0].method === "일반" ? 236 : 
                                modalDigimon.current.grade === 5 && modalDigimon.current.befores[0].method === "조그레스" ? 297 : 
                                modalDigimon.current.grade === 4 ? 179 : 159;
            if(event.clientY + modalHeight >= window.innerHeight - 20) {
                setPosition({ top: window.innerHeight - modalHeight - mapRect.top - 20, left: event.pageX - mapRect.left + 2 });
            } else {
                setPosition({ top: event.clientY - mapRect.top, left: event.clientX - mapRect.left + 2 });
            }
            setIsOpen(true);
        } else if(event.target?.id === "revolution-description") {
        } else {
            setPosition({ top: 0, left: 0 });
            setIsOpen(false);
        }
    }

    const changeDigimon = (event) => {
        let digimonName = "";
        if(event.target.className === "profile") {
            digimonName = event.target.children[1].innerText;
        } else if(event.target.className === "profile-image") {
            digimonName = event.target.nextElementSibling.innerText;
        } else return;

        if(digimonName.includes("돌연변이")) return;

        const digimon = Evolution.getByName(digimonName);
        getEvolutions(digimon);
        setSelectedDigimon(digimon);
        window.scrollTo(0, 0);
        setPosition({ top: 0, left: 0 });
        setIsOpen(false);
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

    const searchBar = useMemo(() => {
        return <SearchBar setSelectedDigimon={setSelectedDigimon}/>
    }, []);

    const evolution = useMemo(() => {
        return <EvolutionTree selectedDigimon={selectedDigimon} reload={reload} key={getUUID()} />;
    }, [selectedDigimon]);

    const inputs = useMemo(() => {
        return <div className='evolution-checkboxes'>
            <div className='toggle-all-buttons'>
                <button type='button' onClick={spreadAll}>모두 펼치기</button>
                <button type='button' onClick={foldAll}>모두 접기</button>
            </div>
            <label className="check-box-container" htmlFor='hide-toggle-fold'>
                <input type='checkbox' id="hide-toggle-fold" checked={hideFoldButton} onChange={(e) => setHideFoldButton(e.target.checked)}/>
                접기/펼치기 버튼 숨기기
            </label>
        </div>
    });

    return (
        <div className={`main ${hideFoldButton ? "hide-fold-button" : ""}`} onMouseMove={captureMouse} onClick={changeDigimon}>
            <h1 className="title-message">진화 상태에 맞는 디지몬을 선택하세요.</h1>
            { comboFilters }
            { searchBar }
            { evolution }
            { inputs }
            <EvolutionDescriptionModal isActive={isOpen} digimon={modalDigimon.current} position={position} />
        </div>
    );
}