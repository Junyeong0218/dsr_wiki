import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getUUID } from "../../functions/commons";

export default function ShopModal({ isOpen, items, position }) {
    return (
        <div id="shop-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="title">상점</div>
                { items && items.map(itemId => {
                    const item = getItemById(itemId);

                    return (
                        <div className="shop-item" key={getUUID()}>
                            <img src={`/images/${item.name}.png`}/>
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