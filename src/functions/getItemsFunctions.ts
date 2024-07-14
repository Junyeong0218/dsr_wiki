import { Item } from "../classes";
import { IItem } from "../classes/Item";
import data from "../json/items.json";

const origin = new Array<Item>();

const loadItems = (): void => {
    if(origin.length === 0) {
        data.forEach((each: IItem) => {
            origin.push(new Item(each));
        });
    }
}

const getItems = (): Array<Item> => {
    loadItems();

    return origin;
}

const getItemById = (id: number): Item|null => {
    loadItems();

    return origin.find(item => item.id === id) ?? null;
}

const getItemByName = (name: string, tradable: boolean = true) => {
    loadItems();

    return origin.find(item => item.name === name);
}

export {
    getItems,
    getItemById,
    getItemByName
}