import React, { useMemo, useState } from "react";
import { getUUID } from "../../functions/commons";
import { Map } from "../../classes";

type MapSelectorProps = { 
    maps: Array<Map>, 
    selectedMap: Map, 
    setMap: (id: number) => void
}

type MapShotcut = {
    [key:string]: Array<Map>
}

export default function MapSelector({ maps, selectedMap, setMap }: MapSelectorProps): React.ReactElement {
    const mapShortcuts = useMemo(() => {
        const shortcuts: MapShotcut = {};
        maps.forEach((map) => {
            let shortcut = shortcuts[`${map.category}`];
            if(!shortcut) {
                shortcuts[`${map.category}`] = [];
            }

            if(!map.disable) {
                shortcuts[`${map.category}`].push(map);
            }
        });
        
        return shortcuts;
    }, [maps]);

    return (
        <div className="map-selector">
            { Object.keys(mapShortcuts).map(category => (
                <div className="digidex-filter2" key={getUUID()}>
                    <div className="title">{category}</div>
                    <div className="checkboxes map-names">
                    { mapShortcuts[`${category}`].map(map => (
                        <label htmlFor={map.name} key={getUUID()} className={selectedMap.name === map.name ? "checked" : ""}>
                            <input type="radio" id={map.name} checked={selectedMap.name === map.name}
                                                                onChange={() => setMap(map.id)}/>
                            <span>{map.name}</span>
                        </label>
                    ))}
                    </div>
                </div>
            ))}
            
            {/* { maps.map(map => (
                <button type="button" className={`map-name-button ${selectedMap?.id === map.id ? "selected" : ""}`} onClick={() => setMap(map.id)} key={getUUID()}>{map.name}</button>
            )) } */}
        </div>
    );
}