import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const HEADER_ORIGIN = "header";
    const shadowList = ["baby1-1", "baby1-2", "baby2-1", "baby2-2", "child1", "child2", "adult1", "adult2", "perfect1", "perfect2", ""];
    const [headerClassName, setHeaderClassName] = useState(HEADER_ORIGIN);

    useEffect(() => {
        let dial = 0;
        const autoShadow = setInterval(() => {
            setHeaderClassName(`${HEADER_ORIGIN} ${shadowList[dial++]}`);
            if(dial > 10) dial = 0;
        }, 2000);
    }, []);

    return (
        <div className={headerClassName}>
            <Link to="/" className="to-main-logo">
                <img src="/images/logo.png" />
            </Link>
            <nav>
                <Link to="/" className="text-nav">진화표</Link>
            </nav>
        </div>
    );
}