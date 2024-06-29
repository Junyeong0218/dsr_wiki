import React, { useEffect, useRef, useState } from "react";

type props = {
    timeString: string
    raids: Array<{ time: number, color: string, name: string }>
}
export default function Audio({ timeString, raids }: props): React.ReactElement {
    const audio = useRef<HTMLAudioElement>(null);
    const [src, setSrc] = useState("");

    useEffect(() => {
        // audio.current!.play();
    }, [src]);

    if(timeString === "00:30:00" && (raids[0].name === "오파니몬:폴다운모드" || raids[0].name === "블랙세라피몬")) {
        if(audio.current) {
            audio.current.src = "/audio/weekly_30minutes.wav";
            audio.current.play();
        }
    } else if(timeString === "00:05:00") {
        if(audio.current) {
            if(raids[0].name === "울퉁몬") {
                audio.current.src = "/audio/gotsumon_5minutes.wav";
                audio.current.play();
            } else if(raids[0].name === "펌프몬") {
                audio.current.src = "/audio/pumpmon_5minutes.wav";
                audio.current.play();
            } else if(raids[0].name === "쿠가몬") {
                audio.current.src = "/audio/kuwagamon_5minutes.wav";
                audio.current.play();
            }
        }
    } else if(timeString === "00:01:00") {
        if(audio.current) {
            if(raids[0].name === "울퉁몬") {
                setSrc("/audio/gotsumon_1minute.wav");
                // audio.current.src = "/audio/gotsumon_1minute.wav";
                // audio.current.play();
            } else if(raids[0].name === "펌프몬") {
                audio.current.src = "/audio/pumpmon_1minute.wav";
                audio.current.play();
            } else if(raids[0].name === "쿠가몬") {
                audio.current.src = "/audio/kuwagamon_1minute.wav";
                audio.current.play();
            }
        }
    }

    return <audio ref={audio} src={src} style={{ display: "none" }}/>;
}