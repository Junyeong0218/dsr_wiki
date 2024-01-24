import React from "react";
import { SpentItem } from "./Adjustments";
import { getUUID } from "../../functions/commons";

type SpentItemsProps = {
    spentItems: Array<SpentItem>
}

export default function SpentItems({ spentItems }: SpentItemsProps): React.ReactElement {
    return (
        <div className="spent-items">
            { spentItems.map(spent => (
                <div className="spent-item" key={getUUID()}>
                    <img src={`/images/${spent.item.name}.png`} />
                    *
                    <span>{spent.count}</span>
                </div>
            ))}
        </div>
    );
}