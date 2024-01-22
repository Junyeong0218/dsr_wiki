import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header(): React.ReactElement {
    const HEADER_ORIGIN = "header";
    const shadowList = ["baby1-1", "baby1-2", "baby2-1", "baby2-2", "child1", "child2", "adult1", "adult2", "perfect1", "perfect2", ""];
    const [headerClassName, setHeaderClassName] = useState(HEADER_ORIGIN);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let dial = 0;
        const autoShadow = setInterval(() => {
            setHeaderClassName(`${HEADER_ORIGIN} ${shadowList[dial++]}`);
            if(dial > 10) dial = 0;
        }, 2000);
    }, []);

    const closeNav = (event: React.MouseEvent) => {
        if(window.innerWidth > 1023) return;

        const target = event.target as HTMLElement;
        if(target.tagName !== "A") return;
        
        const aTag = target as HTMLAnchorElement
        if(aTag.href.startsWith("http://localhost:3000/") || aTag.href.startsWith("https://dsr-wiki.netlify.app/")) {
            setIsOpen(false);
        }
    }

    const toggleNav = (event: React.MouseEvent) => {
        if(window.innerWidth > 1023) return;

        setIsOpen(!isOpen);
    }

    return (
        <div className={headerClassName} onClick={closeNav}>
            <Link to="/" className="to-main-logo">
                <img src="/images/logo.png" />
            </Link>
            <div className="nav-container">
                <button className="spread-menu-button" onClick={toggleNav}>
                    <i className="fa-solid fa-bars" />
                </button>
                <nav className={isOpen ? "open" : ""}>
                    <Link to="/" className="text-nav">홈</Link>
                    <Link to="/evolutions" className="text-nav">진화트리</Link>
                    <Link to="/maps" className="text-nav">맵스</Link>
                    <Link to="/overflows" className="text-nav">오버플로우 던전</Link>
                    {/* <Link to="/detectors" className="text-nav">탐지기</Link> */}
                    <Link to="/combinations" className="text-nav">조합법</Link>
                    <Link to="/digidex" className="text-nav">디지몬 도감</Link>
                    <Link to="https://www.digimonsuperrumble.com" target="_blank" className="text-nav">공식 홈페이지</Link>
                    <Link to="https://cafe.naver.com/movedsr" target="_blank" className="text-nav">네이버 공식 카페</Link>
                </nav>
            </div>
        </div>
    );
}