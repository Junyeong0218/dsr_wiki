import React, { useEffect, useRef, useState } from "react";

export default function YoutubePlayer() : React.ReactElement {
    const [youtubeId, setYoutubeId] = useState<string|null>(null);
    const playerTag = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const playerResizeHandler = (player: YT.Player) => {
        const width = contentRef.current!.clientWidth - 16;
        const height = width * 0.5625;

        player.setSize(width, height);
    }

    useEffect(() => {
        fetch(`/api/youtubeIds/recent`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
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

        const height = contentRef.current!.clientWidth * 0.5625;
        let player: YT.Player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player(playerTag.current!, {
                width: `${contentRef.current!.clientWidth - 16}`,
                height: `${height}`,
                videoId: youtubeId!,
                playerVars: {
                    'autoplay': 1,
                    'mute': 1
                },
                events: {
                    'onReady': (e) => e.target.playVideo()
                }
            });

            window.addEventListener("resize", () => {
                playerResizeHandler(player);
            });
        }

        onYouTubeIframeAPIReady();

        return window.removeEventListener("resize", () => {
            playerResizeHandler(player);
        });
    }, [youtubeId]);

    return (
        <div className="content" ref={contentRef}>
            <div id="player" ref={playerTag} />
        </div>
    );
}