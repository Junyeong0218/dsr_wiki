import React from "react";
import { getAllDigimons } from "../../functions";
import { Link, useLocation } from "react-router-dom";
import { getUUID } from "../../functions/commons";
import Evolutions from "./evolutions";
import DigimonInfo from "./digimonInfo";

export default function Digidex() {
    const location = useLocation();
    const query = location.search;
    const selected = query.trim() === "" ? null : decodeURIComponent(query.replace("?digimon=", ""));

    const all = getAllDigimons(false);

    if(selected) {
        return (
            <div className="digidex">
                <Evolutions selected={selected} />
                <DigimonInfo selected={selected} />
            </div>
        );
    }
    
    return (
        <div className="digidex">
            { all.map(each => {
                const style = each.name.length > 8 ? {fontSize: "12px"} : {};

                return <Link to={`/digidex?digimon=${each.name}`} key={getUUID()}>
                            <button type="button" className="digimon-button">
                                <img src={`/images/${each.name}.png`} loading="lazy" />
                                <span style={style}>{each.name}</span>
                            </button>
                        </Link>
            }) }
        </div>
    );
}