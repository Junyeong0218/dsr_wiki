import { IQuest, Quest } from "../classes/Quest";
import data from "../json/quests.json";

const origin: Array<Quest> = new Array();

const loadQuests = (): void => {
    if(origin.length === 0) {
        data.forEach((value: IQuest) => {
            origin.push(new Quest(value));
        });
    }
}

const deepCopyAll = (): Array<Quest> => {
    loadQuests();

    const all = new Array();
    for (const each of origin) {
        all.push(new Quest(each));
    }

    return all;
};

const getQuestById = (id: number): Quest|null => {
    loadQuests();

    const quest = origin.find(each => each.id === id) ?? null;

    if(!quest) return quest;

    return new Quest(quest);
}

const getQuestByName = (name: string): Quest|null => {
    loadQuests();

    const quest = origin.find(each => each.name === name) ?? null;

    if(!quest) return quest;

    return new Quest(quest);
}

const getQuests = (): Array<Quest> => deepCopyAll();

export {
    getQuests,
    getQuestById,
    getQuestByName
}