import React from "react";

export default function RequiredItem({ fileName, top, left }) {
    return (
        <div className="req-item jogress" style={{top: `${top}px`, left: `${left}px`}}>
            <img src={`/images/${fileName}.png`} title={fileName} />
        </div>
    );
}