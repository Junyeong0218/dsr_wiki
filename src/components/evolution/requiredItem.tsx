import React from "react";
import { IMG_URL_BASE } from "../../enums";

type RequiredItemProps = { 
    fileName: string | null, 
    top: number, 
    left: number
}

export default function RequiredItem({ fileName, top, left }: RequiredItemProps): React.ReactElement {
    if(fileName === null) return <div></div>;

    return (
        <div className="req-item jogress" style={{top: `${top}px`, left: `${left}px`}}>
            <img src={`${IMG_URL_BASE}/${fileName}.png`} title={fileName} />
        </div>
    );
}