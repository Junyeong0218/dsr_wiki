import { FieldType, IFieldType } from "../classes/FieldType";
import data from "../json/fieldTypes.json";

const origin: Array<FieldType> = new Array();

const loadFieldTypes = (): void => {
    if(origin.length === 0) {
        data.forEach((value: IFieldType) => {
            origin.push(new FieldType(value));
        });
    }
}

const deepCopyAll = (): Array<FieldType> => {
    loadFieldTypes();

    const all = new Array();
    for (const each of origin) {
        all.push(new FieldType(each));
    }

    return all;
};

const getDigimonByName = (name: string): FieldType|null => {
    loadFieldTypes();

    const fieldType = origin.find(each => each.type === name) ?? null;

    if(!fieldType) return fieldType;

    return new FieldType(fieldType);
}

const getAllFieldTypes = (): Array<FieldType> => deepCopyAll();

export {
    getAllFieldTypes,
    getDigimonByName
}