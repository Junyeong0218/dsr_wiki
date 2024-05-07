import React, { useEffect, useRef, useState } from "react";

export default function YoutubePlayer() : React.ReactElement {
    const [youtubeId, setYoutubeId] = useState<string|null>(null);
    const playerTag = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // fetch("/.netlify/functions/getRecentYoutube").then(async response => {
        //     const result = await response.json();

        //     setYoutubeId(result.youtubeId);
        // }).catch();

        const st2 = new Date().getTime();
        fetch(`/api/youtubeIds/recent`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                // console.log(result.data[0]);
                // console.log(`youtubeIds function time : ${new Date().getTime() - st2}`)
                    
                setYoutubeId(result.data[0].youtubeId);
            }
        }).catch(error => {
            console.log(error)
        });
    }, []);

    useEffect(() => {
        if(!youtubeId) return;

        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0]!;
        firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

        let player: YT.Player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player(playerTag.current!, {
                width: '544',
                height: '306',
                videoId: youtubeId!,
                playerVars: {
                    'autoplay': 1,
                    'mute': 1
                },
                events: {
                    'onReady': (e) => e.target.playVideo()
                }
            });
        }

        onYouTubeIframeAPIReady();
    }, [youtubeId]);

    return (
        <div className="content">
            <div id="player" ref={playerTag} />
        </div>
    );
}