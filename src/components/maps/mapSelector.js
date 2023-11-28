import React, { useState } from "react";

export default function MapSelector({ maps, selectedMap, setSelectedMap }) {
    return (
        <div className="map-selector">
            { maps.map(map => (
                <button type="button" className={`map-name-button ${selectedMap?.id === map.id ? "selected" : ""}`} onClick={() => setSelectedMap(map.id)}>{map.name}</button>
            )) }
        </div>
    );
}