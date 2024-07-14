import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import { IShopItem } from "../../classes/Shop";

type ShopModalProps = { 
    isOpen: boolean, 
    items: Array<IShopItem>, 
    position: { top: number, left: number }
}

export default function ShopModal({ isOpen, items, position }: ShopModalProps): React.ReactElement {
    const getLimitText = (item: IShopItem) => {
        let limitText = "";
        if(item.limitPeriod === "day") limitText += "일일";
        if(item.limitPeriod === "week") limitText += "주간";
        if(item.limitPeriod === "month") limitText += "월간";

        limitText += ` 구매 한정 (0/${item.limitCount})`;
        return limitText;
    }

    return (
        <div id="shop-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="title">상점</div>
                { items && items.map(item => {
                    // const item = getItemById(itemId)!;
                    console.log(item)

                    return (
                        <div className="shop-item" key={getUUID()}>
                            <img src={`/images/${item.name.includes("조합법") ? "조합법" : encodeURIComponent(item.name)}.png`}/>
                            <span className="item-name">{item.name}</span>
                            { item.limitPeriod && 
                                <span className="item-limit">{getLimitText(item)}</span> }
                            <div className="item-price">
                                {item.price.toLocaleString("ko-KR")}
                                <img src={`/images/무배경_${getNameExceptColon(item.currency)}.png`} title={item.currency} />
                            </div>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}