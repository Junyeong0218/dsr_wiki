import React from "react";
import { SpentItem } from "./Adjustments";
import { getUUID } from "../../functions/commons";
import { IMG_URL_BASE } from "../../enums";

type SpentItemsProps = {
    spentItems: Array<SpentItem>
}

export default function SpentItems({ spentItems }: SpentItemsProps): React.ReactElement {
    return (
        <div className="spent-items">
            { spentItems.map(spent => (
                <div className="spent-item" key={getUUID()}>
                    <img src={`${IMG_URL_BASE}/${spent.item.name}.png`} />
                    *
                    <span>{spent.count}</span>
                </div>
            ))}
        </div>
    );
}