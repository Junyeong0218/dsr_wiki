import React, { useEffect, useState } from 'react';
import { getAllOverflows } from './functions';
import { getOfficialNotices } from './functions/getOffcialNotices';
import { getUUID } from './functions/commons';
import { Link } from 'react-router-dom';
import YoutubePlayer from './components/dashboard/YoutubePlayer';
import UpdateArticles from './components/dashboard/UpdateArticles';
import Coupons from './components/dashboard/Coupons';
import Ladders from './components/dashboard/Ladders';


type DailyCheck = {
    title: string,
    titleEng: string,
    checked: boolean
}

type CheckList = {
    list: Array<DailyCheck>,
    created: Date,
    lastModified: Date
}

const generateChecklist = (): CheckList => {
    return {
        created: new Date(),
        lastModified: new Date(),
        list: [
            { title: "오버플로우 입장권 받기", titleEng: "Get OFD Tickets", checked: false },
            { title: "일일 퀘스트 클리어", titleEng: "Daily Quest", checked: false },
            { title: "오늘의 오버플로우 던전 클리어", titleEng: "Daily OFD", checked: false },
            { title: "디지패스 일일 미션 클리어", titleEng: "Daily Digipass Missions", checked: false },
            { title: "일일 이벤트 미션 클리어", titleEng: "Daily Event Missions", checked: false },
            { title: "유년기 먹이주기 & 놀아주기", titleEng: "Feed Baby Digimons", checked: false },
        ]
    };
}

const getPrevChecklist = (): CheckList => {
    if(!localStorage.getItem("checklist")) return generateChecklist();

    const checklist = JSON.parse(localStorage.getItem("checklist")!);
    const started = new Date(checklist.created).getDate();
    const now = new Date().getDate();
    if(started !== now) return generateChecklist();

    return checklist;
}

export default function Main(): React.ReactElement {
    let prevChecklist = getPrevChecklist();
    
    const [checklist, setChecklist] = useState<CheckList>(prevChecklist);

    // const getWeekdayText = (weekday: number): string => {
    //     switch(weekday) {
    //         case 0: return "일";
    //         case 1: return "월";
    //         case 2: return "화";
    //         case 3: return "수";
    //         case 4: return "목";
    //         case 5: return "금";
    //         case 6: return "토";
    //         default: return "";
    //     }
    // }

    const toggleCheckbox = (event: React.ChangeEvent, dailyCheck: DailyCheck) => {
        const target = event.target as HTMLInputElement;
        const element = checklist.list.find(e => e.title === dailyCheck.title)!;

        element.checked = target.checked;
        checklist.lastModified = new Date();
        localStorage.setItem("checklist", JSON.stringify(checklist));
        setChecklist({...checklist});
    }

    const today = new Date().getDay();
    const activeOverflows = getAllOverflows().filter(of => of.weekdays.includes(today));
    const text = activeOverflows.map(of => `${of.mapName} - ${of.reqItem.name}`);

    return (
        <div className="main">
            <div className="dashboard">
                <aside className="dashboard-left">
                    {/* 오늘의 오플 */}
                    <div className="content-shortcut">
                        <div className="title">오늘의 오버플로우 던전</div>
                        <div className="content">
                            { activeOverflows.map(overflow => (
                                <div className="row" key={getUUID()}>{overflow.mapName}</div>
                            ))}
                        </div>
                    </div>
                    {/* 오늘의 래더 */}
                    <div className="content-shortcut">
                        <div className="title">오늘의 래더</div>
                        <Ladders />
                    </div>
                </aside>
                <div className="dashboard-center">
                    <div className="content-shortcut">
                        <div className="title">체크리스트</div>
                        <div className="content">
                            { checklist.list.map(element => (
                                <label htmlFor={element.titleEng} key={getUUID()}>
                                    <input type="checkbox" id={element.titleEng} checked={element.checked} onChange={(event) => toggleCheckbox(event, element)}/>
                                    <span>{element.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="content-shortcut">
                        <div className="title">
                            <Link to={"https://www.youtube.com/@purr95"} target="_blank">밍루블 유튜브 <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                        </div>
                        <YoutubePlayer />
                    </div>
                </div>
                <aside className="dashboard-right">
                    {/* 디슈럼 업데이트 내역 */}
                    <div className="content-shortcut">
                        <div className="title">디슈럼 업데이트 공지</div>
                        <UpdateArticles />
                    </div>
                    {/* 쿠폰 */}
                    <div className="content-shortcut">
                        <div className="title">적용 가능한 쿠폰</div>
                        <Coupons />
                    </div>
                </aside>
            </div>
        </div>
    );
}