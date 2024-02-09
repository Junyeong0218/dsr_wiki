import React, { useMemo, useRef, useState } from "react";
import { getAllOverflows } from "../../functions";
import { getUUID } from "../../functions/commons";
import OverflowShortcut from "./OverflowShortcut";
import StageTag from "./Stage";
import MonsterDescriptionModal from "./MonsterDescriptionModal";
import { Monster } from "../../classes";

export default function Overflows(): React.ReactElement {
    const all = getAllOverflows();

    const [selected, setSelected] = useState(all[0]);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isOpenModal, setIsOpenModal] = useState(false);

    const selectedMonster = useRef<Monster|null>(null);

    const captureMouse = (event: React.MouseEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLImageElement;
        if(target?.tagName === "IMG") {
            const classList = target.classList;
            
            if(classList.contains("stage-monster-image")) {
                const [stageId, index] = target.dataset.id!.split("-").map(e => Number(e));
                const monster = selected.stages[stageId - 1].monsters[index];
                selectedMonster.current = monster;

                const mapRect = target.parentElement!.parentElement!.parentElement!.parentElement!.getBoundingClientRect();
                const modalHeight = 160;
                
                // console.log(event.pageY, modalHeight, "  ", window.innerHeight, mapRect)
                if(event.pageY + modalHeight >= window.innerHeight - 20) {
                    setModalPosition({ top: event.pageY - modalHeight - 10, left: event.pageX - mapRect.left + 10 });
                } else {
                    setModalPosition({ top: event.pageY - 90, left: event.pageX - mapRect.left + 10 });
                }
                setIsOpenModal(true);

                return;
            }
        }
        setIsOpenModal(false);
    }

    const mapSelector = useMemo(() => {
        return <div className="digidex-filter2" key={getUUID()}>
            <div className="title">맵</div>
            <div className="checkboxes map-names">
            { all.map(each => (
                <label htmlFor={each.mapName} key={getUUID()} className={selected.mapName === each.mapName ? "checked" : ""}>
                    <input type="radio" id={each.mapName} checked={selected.mapName === each.mapName}
                                                          onChange={() => setSelected(each)}/>
                    <span>{each.mapName}</span>
                </label>
            ))}
            </div>
        </div>
    }, [selected]);

    const overflowShortcut = useMemo(() => {
        return <OverflowShortcut selected={selected} />;
    }, [selected]);

    const stages = useMemo(() => {
        return <div className="stages">
            { selected.stages.map(stage => (
                <StageTag stage={stage} key={getUUID()}/>
            ))}
        </div>;
    }, [selected]);

    const monsterDescriptionModal = useMemo(() => {
        return <MonsterDescriptionModal isOpen={isOpenModal} monster={selectedMonster.current} position={modalPosition} key={getUUID()} />
    }, [modalPosition, isOpenModal, selectedMonster.current]);

    return (
        <div className="main">
            <div className="overflow-container" onMouseMove={captureMouse}>
                { mapSelector }
                
                { overflowShortcut }
                
                { stages }

                {/* monster description modal without drop table */}
                {/* recycle maps drops modal with strength and weakness */}
                { monsterDescriptionModal }
            </div>
        </div>
    );
}