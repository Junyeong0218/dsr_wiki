import React, { useEffect, useState } from "react";

export default function ProfileLine({ digimon, direction }) {
    const PROFILE_HEIGHT = 80;

    const getDownScore = (digimon) => {
        if(digimon.down === undefined || digimon.down === null) return 1;
        if(digimon.type === "유년기2") return digimon.down?.length;
        if(digimon.type === "성장기") {
            let acc = 0;
            digimon.down.forEach(d => acc += d.down?.length || 0);
            return acc;
        }
        let acc = 0;
        digimon.down.forEach(d => {
            const score = getDownScore(d);
            acc += score;
        });
        return acc;
    }

    const getUpScore = (digimon) => {
        let acc = 0;
        if(digimon.up === undefined || digimon.up === null) return 1;
        if(digimon.type === "완전체") return digimon.up?.length || 1;
        digimon.up.forEach(u => {
            const score = getUpScore(u);
            acc += score;
        });
        return acc;
    }

    const getDownScoreUntil = (digimon, index) => {
        let acc = 0;
        for(let i = 0; i < digimon.down?.length; i++) {
            if(i >= index) break;
            const d = digimon.down[i];
            let score = 0;
            if(digimon.type === "성장기") {
                score = d.down?.length || 0;
            } else {
                score = getDownScore(d);
            }
            acc += score;
        }
        return acc;
    }

    const getUpScoreUntil = (digimon, index) => {
        let acc = 0;
        for(let i = 0; i < digimon.up?.length; i++) {
            if(i >= index) break;
            const u = digimon.up[i];
            const score = getUpScore(u);
            acc += score;
        }
        return acc;
    }

    const getPercent = (d) => Number.isInteger(d.percentage * 100) ? 
                            d.percentage * 100 :
                            (d.percentage * 100).toFixed(2);

    const lineStyle = {stroke:"#e6e6e6", strokeWidth: 5 + "px", strokeLinecap: "round"};

    const getPercentTop = (d) => {
        if(direction === "right") {
            const i = digimon?.down.findIndex(d2 => d2.from === d.from);
            return 80 * (i+1) - 60;
        } else {
            const i = digimon?.up.findIndex(d2 => d2.to === d.to);
            return 80 * (i+1) - 60;
        }
    }

    const getRandomInt = () => Math.floor(Math.random() * 100000);

    if(direction === "right") {
        return (
            <div className="line-wrapper">
                { digimon.down?.map((d, i) => {
                    if(d.type === "유년기1")
                        return <span key={`${d.from}_number_${getRandomInt()}`} style={{position: "absolute", top:`${getPercentTop(d)}px`, left: `${0}px`}}>{`${getPercent(d)}%`}</span>
                    else if(digimon.down.length === 1)
                        return <span key={`${d.from}_number_${getRandomInt()}`} style={{position: "absolute", top:`${PROFILE_HEIGHT * (getDownScore(digimon) / 2) - 20}px`, left: `${0}px`}}>{`${getPercent(d)}%`}</span>
                    else
                        return <span key={`${d.from}_number_${getRandomInt()}`} style={{position: "absolute", top:`${PROFILE_HEIGHT * getDownScoreUntil(digimon, i) + PROFILE_HEIGHT * getDownScore(digimon.down[i]) / 2 - 20}px`, left: `${0}px`}}>{`${getPercent(d)}%`}</span>
                })}
                <svg width={100} height={PROFILE_HEIGHT * getDownScore(digimon)}>
                    { digimon.down?.map((d, i) => {
                        if(d.type === "유년기1")
                            return <line key={`${d.from}_stroke_${getRandomInt()}`} x1={0} y1={PROFILE_HEIGHT * (i+1) - 40} x2={50} y2={PROFILE_HEIGHT * (i+1) - 40} style={lineStyle}></line>
                        else if(digimon.down.length === 1)
                            return <line key={`${d.from}_stroke_${getRandomInt()}`} x1={0} y1={PROFILE_HEIGHT * (getDownScore(digimon) / 2)} x2={50} y2={PROFILE_HEIGHT * (getDownScore(digimon) / 2)} style={lineStyle}></line>
                        else
                           return <line key={`${d.from}_stroke_${getRandomInt()}`} x1={0} y1={PROFILE_HEIGHT * getDownScoreUntil(digimon, i) + PROFILE_HEIGHT * getDownScore(digimon.down[i]) / 2} x2={50} y2={PROFILE_HEIGHT * getDownScoreUntil(digimon, i) + PROFILE_HEIGHT * getDownScore(digimon.down[i]) / 2} style={lineStyle}></line>
                    })}
                    { digimon.down?.length > 1 && <line key={`${digimon.down[0].from}_stroke_${getRandomInt()}`} x1={50} y1={PROFILE_HEIGHT * getDownScore(digimon.down[0]) / 2} x2={50} y2={PROFILE_HEIGHT * getDownScore(digimon) - PROFILE_HEIGHT * getDownScore(digimon.down.at(-1)) / 2} style={lineStyle}></line>}
                    <line key={`${digimon.down[0].from}_stroke_${getRandomInt()}`} x1={50} y1={PROFILE_HEIGHT * (getDownScore(digimon) / 2)} x2={100} y2={PROFILE_HEIGHT * getDownScore(digimon) / 2} style={lineStyle}></line>
                </svg>
            </div>
        );
    } else {
        return (
            <div className="line-wrapper">
                <svg width={100} height={PROFILE_HEIGHT * getUpScore(digimon)}>
                    { digimon.up?.map((u, i) => {
                         if(digimon.up.length === 1) {
                            return <line key={`${u.from}_stroke_${getRandomInt()}`} x1={50} y1={PROFILE_HEIGHT * (getUpScore(digimon) / 2)} x2={100} y2={PROFILE_HEIGHT * (getUpScore(digimon) / 2)} style={lineStyle}></line>
                        } else {
                           return <line key={`${u.from}_stroke_${getRandomInt()}`} x1={50} y1={PROFILE_HEIGHT * getUpScoreUntil(digimon, i) + PROFILE_HEIGHT * getUpScore(digimon.up[i]) / 2} x2={100} y2={PROFILE_HEIGHT * getUpScoreUntil(digimon, i) + PROFILE_HEIGHT * getUpScore(digimon.up[i]) / 2} style={lineStyle}></line>
                        }   
                    })}
                    { digimon.up?.length > 1 && <line key={`${digimon.up[0].from}_stroke_${getRandomInt()}`} x1={50} y1={PROFILE_HEIGHT * getUpScore(digimon.up[0]) / 2} x2={50} y2={PROFILE_HEIGHT * getUpScore(digimon) - PROFILE_HEIGHT * getUpScore(digimon.up.at(-1)) / 2} style={lineStyle}></line>}
                    <line key={`${digimon.up[0].from}_stroke_${getRandomInt()}`} x1={0} y1={PROFILE_HEIGHT * (getUpScore(digimon) / 2)} x2={50} y2={PROFILE_HEIGHT * getUpScore(digimon) / 2} style={lineStyle}></line>
                </svg>
                { digimon.up?.map((u, i) => {
                    if(digimon.up.length === 1) {
                        return <span key={`${u.from}_stroke_${getRandomInt()}`} style={{position: "absolute", top:`${PROFILE_HEIGHT * (getUpScore(digimon) / 2) - 20}px`, right: `${0}px`}}>{`${getPercent(u)}%`}</span>
                    } else {
                        return <span key={`${u.from}_stroke_${getRandomInt()}`} style={{position: "absolute", top:`${PROFILE_HEIGHT * getUpScoreUntil(digimon, i) + PROFILE_HEIGHT * getUpScore(digimon.up[i]) / 2 - 20}px`, right: `${0}px`}}>{`${getPercent(u)}%`}</span>
                    }
                })}
            </div>
        );
    }
}