import React, { ButtonHTMLAttributes, useMemo, useState } from "react";
import { getQuests } from "../../functions/getQuests";
import { IQuestGoal, Quest } from "../../classes/Quest";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import QuestGoal from "./Goal";
import { IMG_URL_BASE } from "../../enums";

export default function QuestViewer(): React.ReactElement {
    const all = useMemo(() => getQuests(), []);
    console.log(all);

    const [selectedQuest, setSelectedQuest] = useState<Quest>();
    const [update, updateSpread] = useState(false);

    const changeQuest = (quest: Quest) => {
        setSelectedQuest(quest)
    }

    const getImageFileName = (name: string) => {
        if(name.includes("목걸이")) return "드랍_목걸이";
        if(name.includes("귀걸이")) return "드랍_귀걸이";
        if(name.includes("반지")) return "드랍_반지";
        if(name.includes("팔찌")) return "드랍_팔찌";

        return name;
    }

    const questList = useMemo(() => {
        const fullHeight = window.innerHeight - 16; // 16 = .main vertical padding
        const headerHeight = window.document.querySelector("header")?.getBoundingClientRect().height ?? 0;
        const footerHeight = window.document.querySelector(".footer")?.getBoundingClientRect().height ?? 0;
        const style = { maxHeight: `${fullHeight - headerHeight - footerHeight}px`}

        console.log(headerHeight)
        console.log(footerHeight)
        return <div className="quest-list" style={style}>
                    { all.map(each => (
                        <button type="button" className={`quest-shortcut ${selectedQuest?.id === each.id ? "active" : ""}`} onClick={() => changeQuest(each)} key={getUUID()}>
                            <span>{each.name}</span>
                        </button>
                    ))}
                </div>
    }, [selectedQuest]);

    const goalList = useMemo(() => {
        return <div className="quest-description">
                    { selectedQuest && 
                        <div className="quest-rewards">
                            <div className="title">클리어 보상</div>
                            <div className="rewards">
                                <div><img src={`${IMG_URL_BASE}/EXP.png`} /><span>{selectedQuest?.exp}</span></div>
                                <div><img src={`${IMG_URL_BASE}/BIT.png`} /><span>{selectedQuest?.bit.toLocaleString("ko-KR")}</span></div>
                                { selectedQuest.rewards.length > 0 && 
                                    selectedQuest.rewards.map(reward => {
                                        const imageName = getImageFileName(getNameExceptColon(reward.name));
                                        const innerText = `${reward.name} * ${reward.count}`;
                                        const isTradable = `${reward.canTrade ? "<mark class='green'>거래가능</mark>" : "<mark class='red'>거래불가</mark>"}`;

                                        return <div className="reward" key={getUUID()}>
                                            <img src={`${IMG_URL_BASE}/${encodeURIComponent(imageName)}.png`} />
                                            <div className="reward-description">
                                                <span dangerouslySetInnerHTML={{ __html: innerText }}></span>
                                                <span dangerouslySetInnerHTML={{ __html: isTradable }}></span>
                                            </div>
                                        </div>;
                                    })
                                }
                            </div>
                        </div>
                    }
                    { selectedQuest?.questGoals.map((goal, index) => <QuestGoal goal={goal} key={getUUID()}/>)}
                </div>
    }, [selectedQuest]);

    return (
        <div className="main">
            <div className="quest-viewer">
                { questList }
                { goalList }
                {/* <div className="quest-description" key={getUUID()}>
                    { selectedQuest?.questGoals.map((goal, index) => <QuestGoal goal={goal} key={getUUID()}/>)}
                </div> */}
            </div>
        </div>
    );
}