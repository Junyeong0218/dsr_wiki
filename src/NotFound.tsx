import React from "react";

export default function NotFound(): React.ReactElement {
    const notFoundStyle = {display: "flex", flexDirection: "column" as 'column', flexGrow: 1, justifyContent: "center", alignItems: "center"};
    
    return (
        <div style={notFoundStyle}>
            <span>잘못된 페이지입니다.</span>
        </div>
    );
}