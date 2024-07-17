import Calendar from '@toast-ui/calendar';
import React, { useEffect, useRef, useState } from "react";
import { getUUID } from '../../functions/commons';
// import '@toast-ui/calendar/dist/toastui-calendar.min.css';

type DSREvent = {
    id: number;
    title: string;
    start: string;
    end: string;
}

const BASE_HEIGHT = 100;

export default function EventCalendar() {
    // const calendar = useRef(null);
    const [height, setHeight] = useState(1500);

    const getBackgroundColor = (id: number) => {
        switch(id % 6) {
            case 0: return "baby1";
            case 1: return "baby2";
            case 2: return "child";
            case 3: return "adult";
            case 4: return "perfect";
            case 5: return "ultimate";
        }
    }

    useEffect(() => {
        const calendar = new Calendar("#calendar", {
            usageStatistics: false,
            defaultView: "month",
            month: {
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                startDayOfWeek: 0,
                visibleEventCount: 10,
                visibleWeeksCount: 2
            },
            timezone: {
                zones: [
                    {
                        timezoneName:"Asia/Seoul",
                        displayLabel: "GMT+09:00",
                        tooltip: "Seoul"
                    }
                ],
                customOffsetCalculator: (timezoneName: string, timestamp: number) => {
                    const offset = new Date(timestamp).getTimezoneOffset();
                    if(offset === -540) return 0;

                    return offset;
                },
            },
            isReadOnly: true,
            gridSelection: true,
            useDetailPopup: true
        });

        calendar.setTheme({
            common: {
                border: '1px solid var(--theme-light-background-600)',
                holiday: { color: "#FF4040" },
                saturday: { color: "rgb(64, 64, 255)" },
                dayName: { color: "#333" },
                today: { color: "#333" }
            },
            month: {
                dayName: {
                    backgroundColor: "var(--theme-light-background-400)",
                }
            }
        });

        calendar.setOptions({
            useDetailPopup: true
        });

        // fetch(`/api/events`).then(async (response) => {
        fetch(`http://koko198.cafe24.com:8000/events`).then(async (response) => {
            const result = await response.json();
            if(result.status === 200) {
                const events = result.data;
                
                calendar.createEvents(events.map((e: DSREvent, index: number) => {
                    const bg = getBackgroundColor(index);
                    return { ...e, 
                        category: "allday",
                        calendarId: "calendar",
                        backgroundColor: `var(--type-${bg}-thin)`
                    }
                }));
        
                const startDate = calendar.getDateRangeStart().getTime();
                const firstWeekEndDate = new Date(startDate + 1000 * 60 * 60 * 24 * 6).getTime();
                const secondWeekStartDate = new Date(startDate + 1000 * 60 * 60 * 24 * 7).getTime();
                const secondWeekEndDate = new Date(startDate + 1000 * 60 * 60 * 24 * 13).getTime();
                const firstWeek = new Set();
                const secondWeek = new Set();
        
                events.forEach((event: DSREvent) => {
                    const start = new Date(event.start).getTime();
                    const end = new Date(event.end).getTime();
                    if((start <= startDate && end >= startDate) || (start <= firstWeekEndDate && end >= firstWeekEndDate)) {
                        firstWeek.add(event);
                    }
                    if((start <= secondWeekStartDate && end >= secondWeekStartDate) || (start <= secondWeekEndDate && end >= secondWeekEndDate)) {
                        secondWeek.add(event);
                    }
                });
        
                // calendar.on("afterRenderEvent", event => {
                //     setHeight(BASE_HEIGHT + firstWeek.size * 26 + secondWeek.size * 26);
                //     const elements = document.querySelectorAll(".toastui-calendar-month-week-item");
                //     (elements[0] as HTMLDivElement).style.setProperty("height", `${firstWeek.size === 0 ? 33 : (firstWeek.size + 1) * 26 + 8}px`);
                //     (elements[1] as HTMLDivElement).style.setProperty("height", `${secondWeek.size === 0 ? 33 : (secondWeek.size + 1) * 26 + 9}px`);
                // })
                calendar.render();
                setTimeout(() => {
                    setHeight(BASE_HEIGHT + firstWeek.size * 26 + secondWeek.size * 26);
                    const elements = document.querySelectorAll(".toastui-calendar-month-week-item");
                    (elements[0] as HTMLDivElement).style.setProperty("height", `${firstWeek.size === 0 ? 33 : (firstWeek.size + 1) * 26 + 8}px`);
                    (elements[1] as HTMLDivElement).style.setProperty("height", `${secondWeek.size === 0 ? 33 : (secondWeek.size + 1) * 26 + 9}px`);
                }, 500);
            }
        }).catch(error => {
            console.log(error)
        });

        // const events = [
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "사천왕의 데이터 이벤트",
        //         start: "2024-06-05T15:00:00",
        //         end: "2024-07-18T10:00:00",
        //         backgroundColor: "var(--type-ultimate-thin)",
        //     },
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "스파이럴 마운틴 출시 이벤트",
        //         start: "2024-06-05T15:00:00",
        //         end: "2024-07-18T10:00:00",
        //         backgroundColor: "var(--type-baby1-thin)"
        //     },
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "기억의 파편 이벤트",
        //         start: "2024-06-05 15:00:00",
        //         end: "2024-08-01 10:00:00",
        //         backgroundColor: "var(--type-baby2-thin)"
        //     },
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "점핑 익스프레스 이벤트",
        //         start: "2024-06-05T15:00:00",
        //         end: "2024-08-01T10:00:00",
        //         backgroundColor: "var(--type-child-thin)"
        //     },
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "뿌띠몬의 새로운 시즌 메뉴 이벤트",
        //         start: "2024-07-04T15:00:00",
        //         end: "2024-07-18T10:00:00",
        //         backgroundColor: "var(--type-adult-thin)"
        //     },
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "디지패스 2024 시즌7",
        //         start: "2024-07-04T15:00:00",
        //         end: "2024-08-01T10:00:00",
        //         backgroundColor: "var(--type-perfect-thin)"
        //     },
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "도전! 낚시왕 이벤트(07.18 ~ 08.14 점검 전)",
        //         start: "2024-07-18T15:00:00",
        //         end: "2024-08-14T10:00:00",
        //         backgroundColor: "var(--type-ultimate-thin)"
        //     },
        //     {
        //         id: getUUID(),
        //         calendarId: "calendar",
        //         title: "디지털해저드 토큰 교환 이벤트(07.18 ~ 08.14 점검 전)",
        //         start: "2024-07-18T15:00:00",
        //         end: "2024-08-14T10:00:00",
        //         backgroundColor: "var(--type-baby1-thin)"
        //     },
        // ];

        
    }, []);
    
    return (
        <div className="content-shortcut" id="event-calendar">
            <div className="title">이벤트 캘린더</div>
            <div className="content">
                <div id="calendar" style={{ height: `${height}px` }}></div>
                {/* <div id="calendar" style={{ minHeight: "400px", maxHeight: "800px", height: "600px" }}></div> */}
            </div>
        </div>
    );
}