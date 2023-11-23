import React, { useEffect, useRef, useState } from 'react';
import Combo from './components/combo';
import data from './json/data.json';
import getEvolutions from './functions/getEvolutions';
import ProfileGroup from './components/profileGroup';
import Profile from './components/profile';
import Revolution from './components/revolution';

export default function Main() {
    const [selectedType, setSelectedType] = useState("진화 상태");
    const [types, setTypes] = useState(["유년기1", "유년기2", "성장기", "성숙기", "완전체"]);
    const [all, setAll] = useState(data);
    const [filtered, setFiltered] = useState([]);
    const [selectedDigimon, setSelectedDigimon] = useState({ from: "" });

    const selectDigimon = (digimon) => {
        getEvolutions(digimon);
        setSelectedDigimon(digimon);
    }

    const changeType = (type) => {
        setSelectedType(type);
        setSelectedDigimon({ from: "디지몬 선택"});
        const temp = new Array();
        let prev = "";
        for(const each of all) {
            if(each.from === prev) continue;
            if(each.type !== type) continue;

            prev = each.from;
            temp.push(each);
        }
        setFiltered(temp);
    }
    
    return (
        <div className='main'>
            <h1 className="title-message">진화 상태에 맞는 디지몬을 선택하세요.</h1>
            <div className="filters">
                <Combo list={types} selected={selectedType} select={changeType} selectedType={selectedType}></Combo>
                <Combo list={filtered} selected={selectedDigimon.from} select={(current) => selectDigimon(current)}  selectedType={selectedType}></Combo>
            </div>
            <Revolution selectedDigimon={selectedDigimon}></Revolution>
        </div>
    );
}