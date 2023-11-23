import React from "react";

export default function NotFound() {
    const notFoundStyle = {display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", alignItems: "center"};
    return (
        <div style={notFoundStyle}>
            <span>잘못된 페이지입니다.</span>
        </div>
    );
}