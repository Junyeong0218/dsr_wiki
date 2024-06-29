import React, { useEffect, useMemo, useRef, useState } from "react";
import Audio from "./Audio";
import { getUUID } from "../../functions/commons";

const GOTSUMON1 = "01:00:00";
const GOTSUMON2 = "23:00:00";
const PUMPMON1 = "19:30:00";
const PUMPMON2 = "21:30:00";

const ophanimonRaidStart = "2024-06-22 23:00:00";
const seraphimonRaidStart = "2024-06-29 23:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const ONE_DAY = HOUR * 24;
const TWO_WEEK = ONE_DAY * 14;

export default function RaidTimer(): React.ReactElement {
    const [refresh, setRefresh] = useState(true);
    const timer = useRef<NodeJS.Timeout>();
    
    useEffect(() => {
        timer.current = setInterval(() => {
            setRefresh(!refresh);

        }, 1000);
    });

    const getTimeString = (time: number) => {
        const leftDay = time >= ONE_DAY ? Math.floor(time / ONE_DAY) : 0;
        const leftHour = Math.floor((time - leftDay * ONE_DAY) / HOUR);
        const leftMinute = Math.floor((time - leftDay * ONE_DAY - leftHour * HOUR) / MINUTE);
        const leftSecond = Math.floor((time - leftDay * ONE_DAY - leftHour * HOUR - leftMinute * MINUTE) / SECOND);

        if(leftDay !== 0) 
            return `${leftDay}일 ${String(leftHour).padStart(2, "0")}:${String(leftMinute).padStart(2, "0")}:${String(leftSecond).padStart(2, "0")}`;

        return `${String(leftHour).padStart(2, "0")}:${String(leftMinute).padStart(2, "0")}:${String(leftSecond).padStart(2, "0")}`;
    }

    const getNow = () => {
        const now = new Date();
        if(now.getTimezoneOffset() !== -540) {
            const utc = now.getTime() + now.getTimezoneOffset() * 1000 * 60;
            
            return new Date(utc + HOUR * 9 - SECOND * 1);
        }
        
        return new Date(now.getTime() - SECOND * 1);
    }

    const getLeftTimeDaily = (name: string, time: string) => {
        const now = getNow();
        const raidHour = Number(time.substring(0,2));
        const raidMinute = Number(time.substring(3,5));
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const date = String(now.getDate()).padStart(2, "0");
        const hour = now.getHours();
        const minute = now.getMinutes();

        let left = 0;

        // 레이드 출현 시간 < 현재 시간 혹은 레이드 출현 시간 === 현재 시간 이면서 레이드 출현 분 <= 현재 분
        // 이미 종료된 레이드로 다음 날 기준
        if(raidHour < hour || (raidHour === hour && raidMinute <= minute)) {
            const nextDay = new Date(now.getTime() + 1000 * 60 * 60 * 24);
            const nextYear = nextDay.getFullYear();
            const nextMonth = String(nextDay.getMonth() + 1).padStart(2, "0");
            const nextDate = String(nextDay.getDate()).padStart(2, "0");

            const nextRaidDate = new Date(`${nextYear}-${nextMonth}-${nextDate} ${time}`);
            left = nextRaidDate.getTime() - now.getTime();
        } else {
            const raidDate = new Date(`${year}-${month}-${date} ${time}`);
            left = raidDate.getTime() - now.getTime();
        }

        const color = left < MINUTE ? "red" :
                      left < MINUTE * 5 ? "orange" : "";

        return {
            time: left,
            color: color,
            name: name
        };
    }

    const getNextWeeklyRaid = (now: Date, time: string) => {
        const nowTime = now.getTime();
        let startTime = new Date(time).getTime();
        
        while(startTime <= nowTime) {
            startTime += TWO_WEEK;
        }
        
        return startTime;
    }

    const getLeftTimeWeekly = (name: string, time: string) => {
        const now = getNow();
        const nextRaid = new Date(getNextWeeklyRaid(now, time));

        let left = nextRaid.getTime() - now.getTime();
        const color = left < MINUTE * 5 ? "red" :
                      left < MINUTE * 30 ? "orange" : "";

        return {
            time: left,
            color: color,
            name: name
        };
    }

    // console.log("울퉁몬1");
    const gotsumonTime1 = getLeftTimeDaily("울퉁몬", GOTSUMON1);
    // console.log("울퉁몬2");
    const gotsumonTime2 = getLeftTimeDaily("울퉁몬", GOTSUMON2);
    // console.log("펌프몬1");
    const pumpmonTime1 = getLeftTimeDaily("펌프몬", PUMPMON1);
    // console.log("펌프몬2");
    const pumpmonTime2 = getLeftTimeDaily("펌프몬", PUMPMON2);
    // console.log("오파니몬");
    const ophanimonTime = getLeftTimeWeekly("오파니몬:폴다운모드", ophanimonRaidStart);
    // console.log("세라피몬");
    const seraphimonTime = getLeftTimeWeekly("블랙세라피몬", seraphimonRaidStart);

    const gotsumonLabel = useMemo(() => <div className="raid-portrait"><img src="/images/울퉁몬.png" />울퉁몬</div>, []);
    const pumpmonLabel = useMemo(() => <div className="raid-portrait"><img src="/images/펌프몬.png" />펌프몬</div>, []);
    const ophanimonLabel = useMemo(() => <div className="raid-portrait"><img src="/images/오파니몬 폴다운모드.png" />오파니몬:폴다운모드</div>, []);
    const seraphimonLabel = useMemo(() => <div className="raid-portrait"><img src="/images/블랙세라피몬.png" />블랙세라피몬</div>, []);

    const raids = [
        gotsumonTime1,
        gotsumonTime2,
        pumpmonTime1,
        pumpmonTime2,
        ophanimonTime,
        seraphimonTime
    ].sort((a, b) => {
        if(a.time - b.time !== 0) return a.time - b.time;

        if(a.name === "오파니몬:폴다운모드" || a.name === "블랙세라피몬") return -1;

        return 1;
    });

    return (
        <div className="content-shortcut">
            <div className="title">레이드 타이머</div>
            <div className="content">
                { raids.map(raid => <div className="row flex-row">
                                        { raid.name === "울퉁몬" ? gotsumonLabel : 
                                          raid.name === "펌프몬" ? pumpmonLabel : 
                                          raid.name === "오파니몬:폴다운모드" ? ophanimonLabel : 
                                          raid.name === "블랙세라피몬" ? seraphimonLabel : ""
                                        }
                                        <span className={`no-width ${raid.color}`}>{getTimeString(raid.time)}</span>
                                    </div>
                )}
                {/* <div className="row flex-row">
                    { gotsumonLabel }
                    <span className={`no-width red ${gotsumonTime1.color}`}>{getTimeString(gotsumonTime1.time)}</span>
                </div>
                <div className="row flex-row">
                    { gotsumonLabel }
                    <span className={`no-width orange ${gotsumonTime2.color}`}>{getTimeString(gotsumonTime2.time)}</span>
                </div>
                <div className="row flex-row">
                    { pumpmonLabel }
                    <span className={`no-width ${pumpmonTime1.color}`}>{getTimeString(pumpmonTime1.time)}</span>
                </div>
                <div className="row flex-row">
                    { pumpmonLabel }
                    <span className={`no-width ${pumpmonTime2.color}`}>{getTimeString(pumpmonTime2.time)}</span>
                </div>
                <div className="row flex-row">
                    { ophanimonLabel }
                    <span className={`no-width ${ophanimonTime.color}`}>{getTimeString(ophanimonTime.time)}</span>
                </div>
                <div className="row flex-row">
                    { seraphimonLabel }
                    <span className={`no-width ${seraphimonTime.color}`}>{getTimeString(seraphimonTime.time)}</span>
                </div> */}
                {/* <Audio raids={raids} timeString={getTimeString(raids[0].time)} key={getUUID()} /> */}
            </div>
        </div>
    );
}