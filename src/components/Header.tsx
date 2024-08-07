import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IMG_URL_BASE } from "../enums";

export default function Header(): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className={`background ${isOpen ? "open" : ""}`}></div>
            <div className="header">
                <Link to="/" className="to-main-logo">
                    <img src={`${IMG_URL_BASE}/logo.png`} />
                </Link>
                <nav className={`${isOpen ? "open" : ""}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                    <div className="nav-element">
                        <Link to="/" className="text-nav">홈</Link>
                    </div>
                    {/* <div className="nav-element">
                        <Link to="/guides" className="text-nav">기초 가이드</Link>
                    </div> */}
                    <div className="nav-element">
                        <Link to="/digimons/digidex" className="text-nav">디지몬</Link>
                        <div className="nav-subs">
                            <Link to="/digimons/digidex" className="text-nav">디지몬 도감</Link>
                            <Link to="/digimons/evolutions" className="text-nav">진화트리</Link>
                            <Link to="/digimons/experiences" className="text-nav">경험치 테이블</Link>
                        </div>
                    </div>
                    <div className="nav-element">
                        <Link to="/maps" className="text-nav">맵스</Link>
                    </div>
                    <div className="nav-element">
                        <Link to="/dungeons/overflows" className="text-nav">던전</Link>
                        <div className="nav-subs">
                            <Link to="/dungeons/detectors" className="text-nav">탐지기</Link>
                            <Link to="/dungeons/overflows" className="text-nav">오버플로우 던전</Link>
                        </div>
                    </div>
                    {/* <div className="nav-element">
                        <Link to="/raids" className="text-nav">레이드</Link>
                    </div> */}
                    <div className="nav-element">
                        <Link to="/tools/adjustments" className="text-nav">도구</Link>
                        <div className="nav-subs">
                            <Link to="/tools/adjustments" className="text-nav">교정 시뮬</Link>
                            <Link to="/tools/babies" className="text-nav">유년기 시뮬</Link>
                            <Link to="/tools/potentials" className="text-nav">포텐셜 시뮬</Link>
                            <Link to="/tools/skills" className="text-nav">스킬강화 시뮬</Link>
                            <Link to="/tools/quests" className="text-nav">퀘스트<span style={{ fontSize: "12px"}}>BETA</span></Link>
                        </div>
                    </div>
                    <div className="nav-element">
                        <Link to="/items/equipments/tamer" className="text-nav">아이템</Link>
                        <div className="nav-subs">
                            <Link to="/items/equipments/tamer" className="text-nav">테이머 장비</Link>
                            <Link to="/items/combinations" className="text-nav">조합표</Link>
                        </div>
                    </div>
                    <div className="nav-element">
                        <Link to="https://www.digimonsuperrumble.com" target="_blank" className="text-nav">외부 링크</Link>
                        <div className="nav-subs">
                            <Link to="https://www.digimonsuperrumble.com" target="_blank" className="text-nav">공식 홈페이지</Link>
                            <Link to="https://cafe.naver.com/movedsr" target="_blank" className="text-nav">네이버 공식 카페</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        
    );
}