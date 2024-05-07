import React, { useEffect, useMemo, useState } from "react";

type Ladder = {
    date: string,
    grade: string
}

export default function Ladders() : React.ReactElement {
    let prevLadder = localStorage.getItem("ladder") ? JSON.parse(localStorage.getItem("ladder")!) : null;

    const [ladder, setLadder] = useState<Ladder|null>(prevLadder);

    useEffect(() => {
        // fetch("/.netlify/functions/getLadder").then(async response => {
        //     const ladder:Ladder = await response.json();

        //     localStorage.setItem("ladder", JSON.stringify(ladder));
        //     setLadder(ladder);
        // }).catch(error => {
            //     console.log(error);
            // });
            
        const st2 = new Date().getTime();
        fetch(`/api/ladders/today`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                const ladder:Ladder = result.data[0];
                console.log(ladder);
                console.log(`ladders function time : ${new Date().getTime() - st2}`)
                    
                localStorage.setItem("ladder", JSON.stringify(ladder));
                setLadder(ladder);
            }
        }).catch(error => {
            console.log(error)
        });
    }, []);

    const content = useMemo(() => {
        return (
            <div className="content">
                <div className="row">
                    { ladder && <img src={`/images/daily_${ladder.grade}.png`}/> }
                </div>
            </div>
        );
    }, []);

    return content;
}