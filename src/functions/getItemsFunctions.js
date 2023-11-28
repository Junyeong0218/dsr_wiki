import data from "../json/items.json";
import { Item } from '../classes';

const origin = new Array();

const loadItems = () => {
    if(origin.length === 0) {
        data.forEach(each => {
            origin.push(new Item(each));
        });
    }
}

const getItems = () => {
    loadItems();

    return origin;
}
const getItemById = (id) => {
    loadItems();

    return origin.find(item => item.id === id);
}

export {
    getItems,
    getItemById
}