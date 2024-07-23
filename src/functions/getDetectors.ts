import { Detector, IDetector } from "../classes/Detector";
import data from "../json/detectors.json";

const origin: Array<IDetector> = new Array();

const loadDetectors = (): void => {
    if(origin.length === 0) {
        data.forEach((value: IDetector) => {
            origin.push(new Detector(value));
        });
    }
}

const deepCopyAll = (): Array<Detector> => {
    loadDetectors();

    const all = new Array();
    for (const each of origin) {
        all.push(new Detector(each));
    }

    return all;
};

const getDetectorByName = (name: string): Detector|null => {
    loadDetectors();

    const detector = origin.find(each => each.name === name) ?? null;

    if(!detector) return detector;

    return new Detector(detector);
}

const getAllDetectors = (): Array<Detector> => deepCopyAll();

export {
    getAllDetectors,
    getDetectorByName
}