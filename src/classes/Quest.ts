export interface IQuest {
    id: number,
    type: number,
    name: string,
    exp: number,
    bit: number,
    rewards: Array<any>,
    questGoals: Array<any>
}

export interface IQuestGoal {
    id: number,
    goalCount: number,
    goalDescription: string,
    isBattle: boolean,
    isForceLose: boolean,
    isForceEncounter: boolean,
    rewards: null | Array<QuestReward>,
    conversations: null | Array<IConversation>,

    spread: boolean
}

export interface IConversation {
    id: number,
    speaker: string,
    sentence: string
}

export type QuestReward = {
    name: string,
    canTrade: boolean,
    count: number
}

export class Quest {
    id: number;
    type: number;
    name: string;
    exp: number;
    bit: number;
    rewards: Array<QuestReward>;
    questGoals: Array<IQuestGoal>;

    constructor(raw: IQuest) {
        this.id = raw.id;
        this.type = raw.type;
        this.name = raw.name;
        this.exp = raw.exp;
        this.bit = raw.bit;
        this.rewards = raw.rewards;
        this.questGoals = raw.questGoals;
    }
}