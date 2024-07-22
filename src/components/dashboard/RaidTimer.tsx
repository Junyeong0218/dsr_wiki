import React, { useEffect, useMemo, useRef, useState } from "react";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";

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

const AUDIO_DIR = "/audios";

type Raid = {
    time: number
    timeString: string
    color: string
    name: string
}

const today = () => {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} 00:00:00`;
}

export default function RaidTimer(): React.ReactElement {
    const [kuwaga, setKuwaga] = useState(today());
    const [count, setCount] = useState(0);
    const timer = useRef<NodeJS.Timeout>();
    const audio = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        fetch(`api/raid/kuwaga`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                const kuwaga = result.data[0];

                setKuwaga(kuwaga.time);
                // localStorage.setItem("notices", JSON.stringify(notices));

                timer.current = setInterval(() => {
                    if(count === 10_000) {
                        setCount(0);
                    } else {
                        setCount(c => c + 1);
                    }
        
                    if(audio.current?.dataset.audioname) {
                        const iframe = document.createElement("iframe");
                        iframe.src = audio.current!.dataset.audioname;
                        iframe.allow = "autoplay";
                        iframe.id = "iframeAudio";
        
                        audio.current?.appendChild(iframe);
                        iframe.onload = () => {
                            const video = iframe.contentWindow?.document.querySelector("video");
                            video!.onended = () => {
                                iframe.remove();
                            }
        
                            setTimeout(() => {
                                if(video?.paused) {
                                    iframe.remove();
                                }
                            }, 3000);
                        }
                    }
                }, 1000);

                return () => clearInterval(timer.current);
            }
        }).catch(error => {
            console.log(error)
        });
    }, []);

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

    const getLeftTimeDaily = (name: string, time: string): Raid => {
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
            timeString: getTimeString(left),
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

    const getLeftTimeWeekly = (name: string, time: string): Raid => {
        const now = getNow();
        const nextRaid = new Date(getNextWeeklyRaid(now, time));

        let left = nextRaid.getTime() - now.getTime();
        const color = left < MINUTE * 5 ? "red" :
                      left < MINUTE * 30 ? "orange" : "";

        return {
            time: left,
            timeString: getTimeString(left),
            color: color,
            name: name
        };
    }

    const getLeftTimeKuwaga = (name: string, time: string): Raid => {
        const raid = getLeftTimeWeekly(name, time);

        raid.color = raid.time < MINUTE ? "red" :
                     raid.time < MINUTE * 5 ? "orange" : "";

        return raid;
    }

    const getRaidAudioName = (raid: Raid): string | undefined => {
        if(raid.name === "오파니몬:폴다운모드" || raid.name === "블랙세라피몬") {
            if(raid.timeString === "00:30:00") return `${AUDIO_DIR}/weekly_30minutes.wav`;
            if(raid.timeString === "00:05:00") return `${AUDIO_DIR}/weekly_5minutes.wav`;
        } else if(raid.name === "쿠가몬") {
            if(raid.timeString === "00:05:00") return `${AUDIO_DIR}/kuwagamon_5minutes.wav`;
            if(raid.timeString === "00:01:00") return `${AUDIO_DIR}/kuwagamon_1minute.wav`;
        } else if(raid.name === "울퉁몬") {
            if(raid.timeString === "00:05:00") return `${AUDIO_DIR}/gotsumon_5minutes.wav`;
            if(raid.timeString === "00:01:00") return `${AUDIO_DIR}/gotsumon_1minute.wav`;
        } else if(raid.name === "펌프몬") {
            if(raid.timeString === "00:05:00") return `${AUDIO_DIR}/pumpmon_5minutes.wav`;
            if(raid.timeString === "00:01:00") return `${AUDIO_DIR}/pumpmon_1minute.wav`;
        }
        return;
    }

    // console.log("울퉁몬1");
    const gotsumonTime1 = getLeftTimeDaily("울퉁몬", GOTSUMON1);
    // console.log("울퉁몬2");
    const gotsumonTime2 = getLeftTimeDaily("울퉁몬", GOTSUMON2);
    // console.log("펌프몬1");
    const pumpmonTime1 = getLeftTimeDaily("펌프몬", PUMPMON1);
    // console.log("펌프몬2");
    const pumpmonTime2 = getLeftTimeDaily("펌프몬", PUMPMON2);
    // console.log("펌프몬2");
    const kuwagaTime = getLeftTimeKuwaga("쿠가몬", kuwaga);
    // console.log("오파니몬");
    const ophanimonTime = getLeftTimeWeekly("오파니몬:폴다운모드", ophanimonRaidStart);
    // console.log("세라피몬");
    const seraphimonTime = getLeftTimeWeekly("블랙세라피몬", seraphimonRaidStart);

    const gotsumonLabel = useMemo(() => <div className="raid-portrait"><img src={`${IMG_URL_BASE}/울퉁몬.png`} />울퉁몬</div>, []);
    const pumpmonLabel = useMemo(() => <div className="raid-portrait"><img src={`${IMG_URL_BASE}/펌프몬.png`} />펌프몬</div>, []);
    const kuwagamonLabel = useMemo(() => <div className="raid-portrait"><img src={`${IMG_URL_BASE}/쿠가몬.png`} />쿠가몬</div>, []);
    const ophanimonLabel = useMemo(() => <div className="raid-portrait"><img src={`${IMG_URL_BASE}/오파니몬 폴다운모드.png`} />오파니몬:폴다운모드</div>, []);
    const seraphimonLabel = useMemo(() => <div className="raid-portrait"><img src={`${IMG_URL_BASE}/블랙세라피몬.png`} />블랙세라피몬</div>, []);

    const raids = [
        gotsumonTime1,
        gotsumonTime2,
        pumpmonTime1,
        pumpmonTime2,
        kuwagaTime,
        ophanimonTime,
        seraphimonTime
    ].sort((a, b) => {
        if(a.time - b.time !== 0) return a.time - b.time;

        if(a.name === "오파니몬:폴다운모드" || a.name === "블랙세라피몬") return -1;

        return 1;
    });

    const audioName = getRaidAudioName(raids[0]);

    return (
        <div className="content-shortcut" ref={audio} data-audioname={audioName}>
            <div className="title">레이드 타이머</div>
            <div className="content">
                { raids.map(raid => <div className="row flex-row" key={getUUID()}>
                                        { raid.name === "울퉁몬" ? gotsumonLabel : 
                                          raid.name === "펌프몬" ? pumpmonLabel : 
                                          raid.name === "쿠가몬" ? kuwagamonLabel : 
                                          raid.name === "오파니몬:폴다운모드" ? ophanimonLabel : 
                                          raid.name === "블랙세라피몬" ? seraphimonLabel : ""
                                        }
                                        <span className={`no-width raid-time ${raid.color}`}>{raid.timeString}</span>
                                    </div>
                )}
                <iframe src={`${AUDIO_DIR}/silence.mp3`} allow="autoplay" style={{ display: "none" }} />
            </div>
        </div>
    );
}