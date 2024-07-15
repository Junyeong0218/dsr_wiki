import { Experience, IExperience } from "../classes/Experience";
import digimonExp from "../json/digimonExperience.json";
import tamerExp from "../json/tamerExperience.json";

const origin: { digimon: Array<Experience>, tamer: Array<Experience> } = { digimon: [], tamer: [] };

const loadExperiences = (): void => {
    if(origin.digimon.length === 0) {
        digimonExp.forEach((value: IExperience, index: number) => {
            if(index === 0) {
                origin.digimon.push(new Experience(value, 0));
            } else {
                origin.digimon.push(new Experience(value, origin.digimon[index - 1].acc));
            }
        });
        tamerExp.forEach((value: IExperience, index: number) => {
            if(index === 0) {
                origin.tamer.push(new Experience(value, 0));
            } else {
                origin.tamer.push(new Experience(value, origin.tamer[index - 1].acc));
            }
        });
    }
}

const deepCopyAll = (): { digimon: Array<Experience>, tamer: Array<Experience> } => {
    loadExperiences();

    const all: { digimon: Array<Experience>, tamer: Array<Experience> } = { digimon: [], tamer: [] };
    for (let i = 0; i < origin.digimon.length; i++) {
        const each = origin.digimon[i];
        if(i === 0) {
            all.digimon.push(new Experience(each, 0));
        } else {
            all.digimon.push(new Experience(each, origin.digimon[i - 1].acc));
        }
    }
    for (let i = 0; i < origin.tamer.length; i++) {
        const each = origin.tamer[i];
        if(i === 0) {
            all.tamer.push(new Experience(each, 0));
        } else {
            all.tamer.push(new Experience(each, origin.tamer[i - 1].acc));
        }
    }

    return all;
};

export const getExperiences = () => deepCopyAll();