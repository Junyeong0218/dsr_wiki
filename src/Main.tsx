import React, { useEffect, useState } from 'react';
import { getAllOverflows } from './functions';
import { getOfficialNotices } from './functions/getOffcialNotices';
import { getUUID } from './functions/commons';
import { Link } from 'react-router-dom';

type Notice = {
    href: string,
    title: string,
    date: string
}

type Coupon = {
    name: string,
    code: string,
    startDate: string,
    expDate: string,
    active: boolean
}

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

type Ladder = {
    date: string,
    grade: string
}

const DSR_ROOT = "https://www.digimonsuperrumble.com/";

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
    let prevNotices = localStorage.getItem("notices") ? JSON.parse(localStorage.getItem("notices")!) : [];
    let prevCoupons = localStorage.getItem("coupons") ? JSON.parse(localStorage.getItem("coupons")!) : [];
    let prevLadder = localStorage.getItem("ladder") ? JSON.parse(localStorage.getItem("ladder")!) : null;
    const [checklist, setChecklist] = useState<CheckList>(prevChecklist);
    const [notices, setNotices] = useState<Array<Notice>>(prevNotices);
    const [coupons, setCoupons] = useState<Array<Coupon>>(prevCoupons);
    const [ladder, setLadder] = useState<Ladder|null>(prevLadder);

    useEffect(() => {
        const url = "https://script.google.com/macros/s/AKfycbzW0bOmuKVwka0LeClnrw68dNV4hi77bnbrZbeEOZjadwj1e-TnRiFBgC49z57F_PJkqw/exec";

        fetch(`${url}?sheetName=notices`).then(async response => {
            const result = await response.json();
            
            if(result.ok) {
                const notices:Array<Notice> = result.data;
                setNotices(notices.filter((e, i) => i < 5));
                localStorage.setItem("notices", JSON.stringify(notices.filter((e, i) => i < 5)));
            }
        }).catch(error => {
            console.log(error);
        })

        fetch(`${url}?sheetName=coupons`).then(async response => {
            const result = await response.json();
            
            if(result.ok) {
                const coupons:Array<Coupon> = result.data;
                setCoupons(coupons.filter(e => e.active));
                localStorage.setItem("coupons", JSON.stringify(coupons));
            }
        }).catch(error => {
            console.log(error);
        })

        fetch(`${url}?sheetName=ladders`).then(async response => {
            const result = await response.json();
            
            if(result.ok) {
                const ladders:Array<Ladder> = result.data;
                const today = new Date();
                const month = today.getMonth();
                const day = today.getDate();

                const ladder = ladders.find(ladder => {
                    const date = new Date(ladder.date);

                    return date.getMonth() === month && date.getDate() === day;
                }) ?? null;

                setLadder(ladder);
                localStorage.setItem("ladder", JSON.stringify(ladder));
            }
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const getWeekdayText = (weekday: number): string => {
        switch(weekday) {
            case 0: return "일";
            case 1: return "월";
            case 2: return "화";
            case 3: return "수";
            case 4: return "목";
            case 5: return "금";
            case 6: return "토";
            default: return "";
        }
    }

    const getCouponDateText = (coupon: Coupon): string => {
        let text = "";
        const startDate = new Date(coupon.startDate);
        const tz = startDate.getTimezoneOffset();

        // if(tz === 0) {
            text += `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}(${getWeekdayText(startDate.getDay())})-`;
        // } else {
        //     const fixedStartDate = new Date(startDate.getTime() + tz * 60 * 1000 * (-1));
        //     text += `${fixedStartDate.getFullYear()}.${fixedStartDate.getMonth() + 1}.${fixedStartDate.getDate()}(${getWeekdayText(fixedStartDate.getDay())})-`;
        // }

        const expDate = new Date(coupon.expDate);
        const expTz = expDate.getTimezoneOffset();

        // if(tz === 0) {
            text += `${expDate.getFullYear()}.${expDate.getMonth() + 1}.${expDate.getDate()}(${getWeekdayText(expDate.getDay())}) ${expDate.getHours()}:${expDate.getMinutes()}`;
        // } else {
        //     const fixedExpDate = new Date(expDate.getTime() + expTz * 60 * 1000 * (-1));
        //     text += `${fixedExpDate.getFullYear()}.${fixedExpDate.getMonth() + 1}.${fixedExpDate.getDate()}(${getWeekdayText(fixedExpDate.getDay())}) ${fixedExpDate.getHours()}:${fixedExpDate.getMinutes()}`;
        // }

        return text;
    }

    const toggleCheckbox = (event: React.ChangeEvent, dailyCheck: DailyCheck) => {
        const target = event.target as HTMLInputElement;
        const element = checklist.list.find(e => e.title === dailyCheck.title)!;

        element.checked = target.checked;
        checklist.lastModified = new Date();
        localStorage.setItem("checklist", JSON.stringify(checklist));
        setChecklist({...checklist});
    }

    const copyCoupon = (coupon: Coupon) => {
        navigator.clipboard.writeText(coupon.code).then(() => alert("복사 완료"));
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
                        <div className="content">
                            <div className="row">
                                { ladder && <img src={`/images/daily_${ladder.grade}.png`}/> }
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="content-shortcut dashboard-center">
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
                <aside className="dashboard-right">
                    {/* 디슈럼 업데이트 내역 */}
                    <div className="content-shortcut">
                        <div className="title">디슈럼 업데이트 공지</div>
                        <div className="content">
                            { notices.map(notice => {
                                const date = new Date(notice.date).getTime();
                                const now = new Date().getTime();
                                
                                return <Link className="row long" to={`${DSR_ROOT}${notice.href}`} target="_blank" key={getUUID()} title={notice.title}>
                                    <span>{notice.title}</span>
                                    {now - date < 60 * 60 * 24 * 5 * 1000 && <i className='new'><img src="/images/new_tag.png" alt="" /></i>}
                                </Link>
                            })}
                        </div>
                    </div>
                    {/* 쿠폰 */}
                    <div className="content-shortcut">
                        <div className="title">적용 가능한 쿠폰</div>
                        <div className="content">
                            { coupons.length === 0 && <div className="coupon"><strong>쿠폰이 없습니다.</strong></div>}
                            { coupons.map((coupon, index) => (
                                <div className="coupon" key={getUUID()}>
                                    <strong>{coupon.name}</strong>
                                    <small>{getCouponDateText(coupon)}</small>
                                    <button type='button' className='copy-coupon' title='누르면 복사돼요!' onClick={() => copyCoupon(coupon)}>{coupon.code}</button>
                                    { index < coupons.length - 1 && <hr /> }
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}