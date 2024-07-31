import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";

type Notice = {
    href: string,
    title: string,
    date: string
}

const DSR_ROOT = "https://www.digimonsuperrumble.com/";

export default function UpdateArticles() : React.ReactElement {
    // let prevNotices = localStorage.getItem("notices") ? JSON.parse(localStorage.getItem("notices")!) : [];

    const [notices, setNotices] = useState<Array<Notice>>([]);

    useEffect(() => {
        fetch(`/api/notices`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                const notices:Array<Notice> = result.data;

                setNotices(notices);
                localStorage.setItem("notices", JSON.stringify(notices));
            }
        }).catch(error => {
            setNotices([]);
        });
    }, []);

    const contents = useMemo(() => {
        return (
            <div className="content">
                { notices.map(notice => {
                    const date = new Date(notice.date).getTime();
                    const now = new Date().getTime();
                    
                    return <Link className="row long" to={`${notice.href}`} target="_blank" key={getUUID()} title={notice.title}>
                        <span>{notice.title}</span>
                        {now - date < 60 * 60 * 24 * 5 * 1000 && <i className='new'><img src={`${IMG_URL_BASE}/new_tag.png`} alt="" /></i>}
                    </Link>
                })}
            </div>
        );
    }, [notices]);

    return contents;
}