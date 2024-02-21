interface IFeedEffect {
    name: string,
    value: number
}

interface IFeed {
    name: string,
    fullness: number,
    effects: Array<IFeedEffect>
}

interface IToy {
    name: string,
    stature: number,
    fullness: number,
    satisfaction: number
}

class BabyItem {
    feeds: Array<IFeed> = [];
    toys: Array<IToy> = [];

    addFeed = (feed: IFeed) => this.feeds.push(feed);
    addToy = (toy: IToy) => this.toys.push(toy);
}

export {
    IFeedEffect,
    IFeed,
    IToy,

    BabyItem
}