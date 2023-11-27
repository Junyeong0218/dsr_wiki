import React, { useRef, useState } from 'react';
import Revolution from './components/revolution';
import Filters from './components/Filters';
import { getUUID } from './functions/commons';
import RevolutionDescriptionModal from './components/revolutionDescriptionModal';
import Digimon from './classes/Digimon';
import getJustBeforeRevolution from './functions/getJustBeforeRevolution';

export default function Main() {
    const [selectedDigimon, setSelectedDigimon] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const modalDigimon = useRef(null);
    const position = useRef({ top: 0, left: 0 });

    const captureMouse = (event) => {
        if(event.target?.className === "profile-image") {
            const targetName = event.target.nextElementSibling.innerText;
            if(targetName === selectedDigimon.name) modalDigimon.current = selectedDigimon;
            else if(targetName === modalDigimon.current?.name) {}
            else if(targetName.includes("[돌연변이]")) {
                position.current.top = 0;
                position.current.left = 0;
                setIsOpen(false);
                return;
            }
            else {
                // console.log("새로 구함", targetName, selectedDigimon.name)
                const digimon = Digimon.getByName(targetName);
                if(digimon.grade === 1) return;
                
                getJustBeforeRevolution(digimon);
                modalDigimon.current = digimon;
            }
            // setModalTop(event.pageY);
            // setModalLeft(event.pageX);
            position.current.top = event.pageY;
            position.current.left = event.pageX;
            setIsOpen(true);
        } else if(event.target?.id === "revolution-description") {
        } else {
            position.current.top = 0;
            position.current.left = 0;
            setIsOpen(false);
        }
    }

    return (
        // <div className='main'>
        <div className='main' onMouseMove={captureMouse}>
            <h1 className="title-message">진화 상태에 맞는 디지몬을 선택하세요.</h1>
            <Filters selectedDigimon={selectedDigimon} setSelectedDigimon={setSelectedDigimon} key={"digimon_filter"} />
            <Revolution selectedDigimon={selectedDigimon} key={getUUID()} />
            <RevolutionDescriptionModal isActive={isOpen} digimon={modalDigimon.current} position={position} />
            {/* <RevolutionDescriptionModal isActive={isOpen} digimon={modalDigimon.current} top={modalTop} left={modalLeft} /> */}
        </div>
    );
}