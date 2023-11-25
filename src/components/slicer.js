import { color } from "d3";
import React, { useState } from "react";

export default function Slicer({ searchRange, setSearchRange }) {
    const MIN_VALUE = 1;
    const MAX_VALUE = 5;

    const [moving, setMoving] = useState(false);

    return (
        <div className="slicer">
            <svg width={160} height={15}>
                <line x1={40} y1={0} x2={40} y2={15} style={{stroke:"#d0d0d0"}} />
                <line x1={80} y1={0} x2={80} y2={15} style={{stroke:"#d0d0d0"}} />
                <line x1={120} y1={0} x2={120} y2={15} style={{stroke:"#d0d0d0"}} />
            </svg>
            <button type="button" className="slice-handler" onMouseDown={setMoving(true)} onMouseUp={setMoving(false)}>
                <svg width={20} height={20}>
                    <circle cx="10" cy="10" r="10" style={{stroke:"#d0d0d0", fill:"#181818", fillOpacity: `${moving ? 1 : 0.7}`}} />
                </svg>
            </button>
        </div>
    );
}