import React, { useState } from "react";
import { getUUID } from "../../functions/commons";
import { Map } from "../../classes";

type MapSelectorProps = { 
    maps: Array<Map>, 
    selectedMap: Map, 
    setMap: (id: number) => void
}

export default function MapSelector({ maps, selectedMap, setMap }: MapSelectorProps): React.ReactElement {
    return (
        <div className="map-selector">
            { maps.map(map => (
                <button type="button" className={`map-name-button ${selectedMap?.id === map.id ? "selected" : ""}`} onClick={() => setMap(map.id)} key={getUUID()}>{map.name}</button>
            )) }
        </div>
    );
}