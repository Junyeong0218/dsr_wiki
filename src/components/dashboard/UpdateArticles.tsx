import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getUUID } from "../../functions/commons";

type Notice = {
    href: string,
    title: string,
    date: string
}

const DSR_ROOT = "https://www.digimonsuperrumble.com/";

export default function UpdateArticles() : React.ReactElement {
    let prevNotices = localStorage.getItem("notices") ? JSON.parse(localStorage.getItem("notices")!) : [];

    const [notices, setNotices] = useState<Array<Notice>>(prevNotices);

    useEffect(() => {
        const st1 = new Date().getTime();
        fetch(`/api/notices`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                const notices:Array<Notice> = result.data;
                console.log(notices);
                console.log(`notices function time : ${new Date().getTime() - st1}`)

                setNotices(notices);
                localStorage.setItem("notices", JSON.stringify(notices));
            }
        }).catch(error => {
            console.log(error)
        });

        const st2 = new Date().getTime();
        const url = "https://script.google.com/macros/s/AKfycbzW0bOmuKVwka0LeClnrw68dNV4hi77bnbrZbeEOZjadwj1e-TnRiFBgC49z57F_PJkqw/exec";

        fetch(`${url}?sheetName=notices`).then(async response => {
            const result = await response.json();
            
            if(result.ok) {
                // const notices:Array<Notice> = result.data;
                // setNotices(notices.filter((e, i) => i < 5));
                // localStorage.setItem("notices", JSON.stringify(notices.filter((e, i) => i < 5)));
                console.log(`notices netlify function time : ${new Date().getTime() - st2}`)
            }
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const contents = useMemo(() => {
        return (
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
        );
    }, [notices]);

    return contents;
}