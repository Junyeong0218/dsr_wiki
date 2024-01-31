import React from "react";

export default function Preparing(): React.ReactElement {
    const notFoundStyle = {display: "flex", flexDirection: "column" as 'column', flexGrow: 1, justifyContent: "center", alignItems: "center"};
    
    return (
        <div style={notFoundStyle}>
            <span>준비중입니다.</span>
        </div>
    );
}