import React, { useEffect, useMemo, useState } from "react";
import { getUUID } from "../../functions/commons";
import TamerEquipmentFilter from "./TamerEquipmentFilter";
import { TamerEquipment, TamerEquipmentSet } from "../../classes/TamerEquipment";
import { getTamerEquipments } from "../../functions/getTamerEquipments";

export default function TamerEquipmentSearcher(): React.ReactElement {
    const [all, setAll] = useState<Array<TamerEquipment>>(getTamerEquipments());
    const parts = useMemo(() => ["귀걸이", "목걸이", "반지", "팔찌"], []);
    // const setNames = useMemo(() => all.map(e => e.setName), [all]);

    const selectedPartsLocal = localStorage.getItem("selectedTamerParts");
    const selectedSetsLocal = localStorage.getItem("selectedTamerSets");

    const [selectedParts, setSelectedParts] = useState<Array<string>>(selectedPartsLocal ? JSON.parse(selectedPartsLocal) : [...parts]);
    // const [selectedSets, setSelectedSets] = useState<Array<string>>(selectedSetsLocal ? JSON.parse(selectedSetsLocal) : [...setNames]);

    // useEffect(() => {
    //     fetch("/.netlify/functions/getTamerEquipmentLogs").then(async response => {
    //         const tamerEquipmentLogs: Array<TamerEquipmentLogs> = await response.json();

    //         applyRangeData(tamerEquipmentLogs);

    //         setAll([...getTamerEquipmentSets()]);

    //         console.log("setted!");
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, []);
    
    const partFilter = <TamerEquipmentFilter title={"파트"} local={"selectedTamerParts"} originList={parts} selectedList={selectedParts} setSelectedList={setSelectedParts} key={getUUID()}/>;
    // const setNameFilter = <TamerEquipmentFilter title={"세트명"} local={"selectedTamerSets"} originList={setNames} selectedList={selectedSets} setSelectedList={setSelectedSets} key={getUUID()}/>;

    const filtered = all.filter(e => selectedParts.includes(e.part))
                        .map(equipment => {
                            return <div className="tamer-equipment" key={getUUID()}>
                                <div className="equipment-image">
                                    <img src={`/images/${equipment.type === null ? equipment.fullName : `드랍_${equipment.part}`}.png`} />
                                </div>
                                <div className="equipment-options title">{equipment.fullName}</div>
                                <div className="equipment-options">{`${equipment.options[0].name} ${equipment.options[0].minValue} ~ ${equipment.options[0].maxValue}`}</div>
                                <div className="equipment-options">{`${equipment.options[1].name} ${equipment.options[1].minValue} ~ ${equipment.options[1].maxValue}`}</div>
                                <div className="equipment-options">{`${equipment.reqTamerLevel}`}</div>
                                <div className="equipment-options">{`${equipment.reqDigimonLevel}`}</div>
                            </div>
                        });
    // const filtered = all.map(equipment => {
    //                         const equipments = set.equipments.filter(equipment => selectedParts.includes(equipment.part) && equipment.isReleased);

    //                         if(equipments.length === 0) return "";

    //                         const tag = equipments.map(equipment => {
    //                             return (
    //                                 <div className="tamer-equipment" key={getUUID()}>
    //                                     <div className="equipment-image">
    //                                         <img src={`/images/${equipment.grade === null ? equipment.fullname : `드랍_${equipment.part}`}.png`} />
    //                                     </div>
    //                                     <div className="equipment-options title">{`${equipment.setName} ${equipment.part}`}</div>
    //                                     <div className="equipment-options">
    //                                         <div className="equipment-option">{`${equipment.normal.min} ~ ${equipment.normal.max}`}</div>
    //                                         <div className="equipment-option">{`${equipment.normal.min} ~ ${equipment.normal.max}`}</div>
    //                                     </div>
    //                                     <div className="equipment-options">
    //                                         <div className="equipment-option">{`${equipment.useful.min} ~ ${equipment.useful.max}`}</div>
    //                                         <div className="equipment-option">{`${equipment.useful.min} ~ ${equipment.useful.max}`}</div>
    //                                     </div>
    //                                     <div className="equipment-options">
    //                                         <div className="equipment-option">{`${equipment.intact.min} ~ ${equipment.intact.max}`}</div>
    //                                         <div className="equipment-option">{`${equipment.intact.min} ~ ${equipment.intact.max}`}</div>
    //                                     </div>
    //                                     <div className="equipment-options">
    //                                         <div className="equipment-option">{`${equipment.perfect.min} ~ ${equipment.perfect.max}`}</div>
    //                                         <div className="equipment-option">{`${equipment.perfect.min} ~ ${equipment.perfect.max}`}</div>
    //                                     </div>
    //                                     <div className="equipment-options">{`${equipment.reqTamerLevel}`}</div>
    //                                     <div className="equipment-options">{`${equipment.reqDigimonLevel}`}</div>
    //                                 </div>
    //                             );
    //                         })

    //                         return (
    //                             <div className="tamer-equipment-set" key={getUUID()}>
    //                                 <div className="set-items">
    //                                     {tag}
    //                                 </div>
    //                                 <div className="set-option">?</div>
    //                             </div>
    //                         );
    //                     });

    return (
        <div className="main">
            <div className="equipment-searcher-container">
                {partFilter}
                {/* {setNameFilter} */}

                <div className="tamer-equipment-set white">
                    <div className="set-items">
                        <div className="tamer-equipment" style={{ fontSize: "15px" }}>
                            <div className="equipment-image" style={{ width: "36px" }}/>
                            <div className="equipment-options" style={{ minWidth: "200px", fontSize: "15px" }}>장비명</div>
                            <div className="equipment-options"style={{ fontSize: "15px" }}>옵션1</div>
                            <div className="equipment-options"style={{ fontSize: "15px" }}>옵션2</div>
                            {/* <div className="equipment-options">온전한 옵션</div>
                            <div className="equipment-options">완벽한 옵션</div> */}
                            <div className="equipment-options"style={{ fontSize: "15px" }}>테이머 레벨</div>
                            <div className="equipment-options"style={{ fontSize: "15px" }}>디지몬 레벨</div>
                        </div>
                    </div>
                    <div className="equipment-options">세트 옵션</div>
                </div>
                {filtered}
            </div>
        </div>
    );
}