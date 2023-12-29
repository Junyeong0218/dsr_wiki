import React, { useEffect, useState } from "react";
import { getAllDigimons } from "../../functions";
import { Link, useLocation } from "react-router-dom";
import { getUUID } from "../../functions/commons";
import Evolutions from "./evolutions";
import DigimonInfo from "./digimonInfo";
import { DigimonTypes, DigimonTypesEng, Grades } from "../../enums";
import DigidexFilter from "./digidexFilter";

export default function Digidex(): React.ReactElement {
    const location = useLocation();
    const query = location.search;
    const selected = query.trim() === "" ? null : decodeURIComponent(query.replace("?digimon=", ""));
    
    if(selected) {
        return (
            <div className="digidex">
                <Evolutions selected={selected} />
                <DigimonInfo selected={selected} />
            </div>
        );
    }
    
    const all = getAllDigimons(false);
    const [filtered, setFiltered] = useState(all);
    const [selectedGrade, setSelectedGrade] = useState(localStorage.getItem("grade") || "전체");
    const [selectedType, setSelectedType] = useState(localStorage.getItem("type") || "전체");
    const [selectedElement, setSelectedElement] = useState(localStorage.getItem("element") || "전체");

    useEffect(() => {
        if(selectedGrade === "전체" && selectedType === "전체" && selectedElement === "전체") {
            localStorage.removeItem("grade");
            localStorage.removeItem("type");
            localStorage.removeItem("element");
            setFiltered(all);
            return;
        }

        let digimons = all;
        if(selectedGrade !== "전체") {
            digimons = digimons.filter(digimon => digimon.grade === Object.values(Grades).indexOf(selectedGrade) + 1);
            localStorage.setItem("grade", selectedGrade);
        }
        if(selectedType !== "전체") {
            digimons = digimons.filter(digimon => digimon.digimonType === Object.values(DigimonTypesEng)[Object.values(DigimonTypes).indexOf(selectedType)]);
            localStorage.setItem("type", selectedType);
        }
        if(selectedElement !== "전체") {
            digimons = digimons.filter(digimon => {
                for(let i = 0; i < digimon.skills.length; i++) {
                    if(digimon.skills[i].element === selectedElement) return true;
                }
                return false;
            });
            localStorage.setItem("element", selectedElement);
        }
            
        setFiltered(digimons);
    }, [selectedGrade, selectedType, selectedElement]);
    
    return (
        <div className="digidex">
            <DigidexFilter selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade}
                           selectedType={selectedType} setSelectedType={setSelectedType}
                           selectedElement={selectedElement} setSelectedElement={setSelectedElement} 
                           all={all} setFiltered={setFiltered} />
            
            { filtered.map(each => {
                const style = each.name.length > 8 ? {fontSize: "12px"} : {};

                return <Link to={`/digidex?digimon=${each.name}`} key={getUUID()}>
                            <button type="button" className="digimon-button">
                                <img src={`/images/${each.name}.png`} loading="lazy" />
                                { each.tag ? <span style={style} dangerouslySetInnerHTML={{__html: each.tag}}></span> : <span style={style}>{each.name}</span>}
                            </button>
                        </Link>
            }) }
        </div>
    );
}