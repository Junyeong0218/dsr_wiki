import React, { useState } from "react";

export default function TRItems() {
    const [text, setText] = useState("");

    return (
        <input type="text" defaultValue={text} />
    );
}