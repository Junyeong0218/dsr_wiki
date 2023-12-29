import React from "react";

type RequiredItemProps = { 
    fileName: string, 
    top: number, 
    left: number
}

export default function RequiredItem({ fileName, top, left }: RequiredItemProps): React.ReactElement {
    return (
        <div className="req-item jogress" style={{top: `${top}px`, left: `${left}px`}}>
            <img src={`/images/${fileName}.png`} title={fileName} />
        </div>
    );
}