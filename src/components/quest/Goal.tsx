import React, { MouseEvent, useState } from "react";
import { IConversation, IQuestGoal } from "../../classes/Quest";
import { getUUID } from "../../functions/commons";
import { getDigimonFileName } from "../../functions/getDigimonFileName";

type QuestGoalProps = {
    goal: IQuestGoal
}

const getMaxHeight = (conversations: Array<IConversation>): number => {
    let sum = 0;
    // for(let i = 0; i < conversations.length; i++) {
    //     const con = conversations[i];
    //     if(con.speaker === "유저") {
    //         sum += 26; // padding

    //         let sen = con.sentence;
    //         while(sen.includes("\\r\\n")) {
    //             sen = sen.replace("\\r\\n", "");
    //             sum += 16; // sentence
    //         }
    //     } else if(con.speaker === "알림") {
    //         sum += 50;
    //     } else if(i === 0) {
    //         let temp = 48; // title + gap + padding + 1 sentence
    //         let sen = con.sentence;
    //         while(sen.includes("\\r\\n")) {
    //             sen = sen.replace("\\r\\n", "");
    //             temp += 16; // sentence
    //         }

    //         if(temp < 50) sum += 50;
    //         else          sum += temp;
    //     } else {
    //         const prev = conversations[i - 1];

    //         let temp = 16; 
    //         let sen = con.sentence;
    //         while(sen.includes("\\r\\n")) {
    //             sen = sen.replace("\\r\\n", "");
    //             temp += 16; // sentence
    //         }

    //         if(prev.speaker === con.speaker) {
    //             sum += temp + 10;
    //         } else {
    //             temp += 32; // title + gap + padding
    //             if(temp < 50) sum += 50;
    //             else          sum += temp;
    //         }
    //     }

    //     if(i < conversations.length - 1) sum += 5; // gap

    //     console.log(`sum : ${sum}`)
    // }

    // return sum;
    return 3000;
}

export default function QuestGoal({ goal }: QuestGoalProps): React.ReactElement {
    // const [myGoal, setMyGoal] = useState<IQuestGoal>(goal);
    const [spread, setSpread] = useState(false);
    const style = spread ? goal.conversations ? { maxHeight: `${getMaxHeight(goal.conversations)}px`, marginTop: "5px" } : 
                                                { maxHeight: "0px" } :
                           { maxHeight: "0px" };

    const singleBubbleStyle = { marginLeft: "58px" };

    const toggleSpread = () => {
        setSpread(!spread);
    }

    const forTest = () => {
        console.log(goal.rewards);
    }

    return <button type="button" className={`quest-goal`} onClick={toggleSpread}>
        <div className="goal-subject">
            { goal.goalDescription }&nbsp;
            { goal.goalCount > 0 ? `(0/${goal.goalCount})` : ""}
            { goal.rewards && goal.rewards.length > 0 ? <img className="reward-icon" src="/images/quest_reward.png" onMouseEnter={forTest} /> : "" }
            { goal.isBattle ? <div className="badge red">전투 미션</div> : "" }
            { goal.isForceEncounter ? <div className="badge red">선공 몬스터</div> : "" }
            { goal.isForceLose ? <div className="badge red">패배 미션</div> : "" }
        </div>
        { goal.conversations &&
            <div className="conversations" style={style} key={getUUID()}>
                { goal.conversations.map((conversation, index) => {
                    if(conversation.speaker === "유저") {
                        return <div className="speech-bubble" dangerouslySetInnerHTML={{ __html: conversation.sentence.replace("\\r\\n", "<br />") }} key={getUUID()}></div>
                    } else if(conversation.speaker === "알림") {
                        return <div className="speech-notice" dangerouslySetInnerHTML={{ __html: conversation.sentence.replace("\\r\\n", "<br />") }} key={getUUID()}></div>
                    }else if(index === 0) {
                        return <div className="character-speech" key={getUUID()}>
                                    <div className="speaker-icon">
                                        <img src={`/images/${getDigimonFileName(conversation.speaker)}.png`} />
                                    </div>
                                    <div className="speech">
                                        <span>{conversation.speaker}</span>
                                        <div className="speech-bubble left" dangerouslySetInnerHTML={{ __html: conversation.sentence.replace("\\r\\n", "<br />") }}></div>
                                    </div>
                            </div>
                    } else {
                        const prev = goal.conversations![index - 1];

                        if(prev.speaker === conversation.speaker)
                            return <div className="speech-bubble left" style={singleBubbleStyle} dangerouslySetInnerHTML={{ __html: conversation.sentence.replace("\\r\\n", "<br />") }} key={getUUID()}></div>
                        else
                        return <div className="character-speech" key={getUUID()}>
                                        <div className="speaker-icon">
                                            <img src={`/images/${getDigimonFileName(conversation.speaker)}.png`} />
                                        </div>
                                        <div className="speech">
                                            <span>{conversation.speaker}</span>
                                            <div className="speech-bubble left" dangerouslySetInnerHTML={{ __html: conversation.sentence.replace("\\r\\n", "<br />") }}></div>
                                        </div>
                                </div>
                    }
                })}
            </div>
        }
    </button>
}