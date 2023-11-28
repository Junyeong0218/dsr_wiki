import React from "react";

export default function MapViewer({ map }) {
    if(!map) return (<div className="map-viewer"></div>);

    return (
        <div className="map-viewer">
            <div className="map-container">
                <img src={`/images/${map.name}.png`} />
                
            </div>
        </div>
    );
}