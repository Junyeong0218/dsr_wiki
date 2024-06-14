import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getUUID } from "../../functions/commons";

type ShopModalProps = { 
    isOpen: boolean, 
    items: Array<number>, 
    position: { top: number, left: number }
}

export default function ShopModal({ isOpen, items, position }: ShopModalProps): React.ReactElement {
    return (
        <div id="shop-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="title">상점</div>
                { items && items.map(itemId => {
                    const item = getItemById(itemId)!;
                    console.log(item)

                    return (
                        <div className="shop-item" key={getUUID()}>
                            <img src={`/images/${item.name.includes("조합법") ? "조합법" : item.name}.png`}/>
                            <span className="item-name">{item.name}</span>
                            <div className="item-price">
                                {item.price}
                                <img src="/images/상점 비트 아이콘.png" />
                            </div>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}