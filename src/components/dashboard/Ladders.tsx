import React, { useEffect, useMemo, useState } from "react";

type Ladder = {
    date: string,
    grade: string
}

export default function Ladders() : React.ReactElement {
    const prevLadderLocal = localStorage.getItem("ladder");
    let prevLadder = !prevLadderLocal ? JSON.parse(localStorage.getItem("ladder")!) : null;

    const [ladder, setLadder] = useState<Ladder|null>(prevLadder);

    useEffect(() => {
        fetch(`/api/ladders/today`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                const newLadder:Ladder = result.data[0];
                    
                localStorage.setItem("ladder", JSON.stringify(newLadder));
                setLadder(newLadder);
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
    }, [ladder]);

    return content;
}