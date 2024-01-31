import React, { useState } from "react";
import { getAllDigimons } from "../../functions";
import { Link, useLocation } from "react-router-dom";
import { getUUID } from "../../functions/commons";
import DigimonInfo from "./digimonInfo";
import DigidexFilter from "./digidexFilter";

export default function Digidex(): React.ReactElement {
    const location = useLocation();
    const query = location.search;
    const selected = query.trim() === "" ? null : decodeURIComponent(query.replace("?digimon=", ""));

    localStorage.removeItem("grade");
    localStorage.removeItem("type");
    localStorage.removeItem("element");
    
    if(selected) {
        return (
            <div className="main">
                <div className="digidex" style={{ flexWrap: "nowrap" }}>
                    <DigimonInfo selected={selected} />
                </div>
            </div>
        );
    }
    
    const all = getAllDigimons(false);
    const [filtered, setFiltered] = useState(all);
    
    return (
        <div className="main">
            <div className="digidex">
                <DigidexFilter all={all} setFiltered={setFiltered} />
                
                { filtered.map(each => {
                    const style = each.name.length > 8 ? {fontSize: "12px"} : {};

                    return <Link to={`/digimons/digidex?digimon=${each.name}`} key={getUUID()}>
                                <button type="button" className="digimon-button">
                                    <img src={`/images/${each.name}.png`} loading="lazy" />
                                    { each.tag ? <span style={style} dangerouslySetInnerHTML={{__html: each.tag}}></span> : <span style={style}>{each.name}</span>}
                                </button>
                            </Link>
                }) }
            </div>
        </div>
    );
}