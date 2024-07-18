import React from "react";
import { getItemById } from "../../functions/getItemsFunctions";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import { IShopItem } from "../../classes/Shop";

type CouponItem = {
    couponId: number;
    itemName: string;
    count: number;
}

type Coupon = {
    name: string,
    code: string,
    startDate: string,
    expDate: string,
    items: Array<CouponItem>
}

type CouponModalProps = { 
    isOpen: boolean,
    position: { left: number, top: number },
    coupon: Coupon | undefined
}

export default function CouponModal({ isOpen, position, coupon }: CouponModalProps): React.ReactElement {
    return (
        <div id="coupon-modal" className={`modal ${isOpen ? "active" : ""}`} style={{ top: position.top, left: position.left }}>
            <div className="window">
                <div className="title">쿠폰 보상</div>
                { coupon && coupon.items && coupon.items.map(item => {
                    return (
                        <div className="coupon-item" key={getUUID()}>
                            <img src={`/images/${item.itemName.includes("조합법") ? "조합법" : encodeURIComponent(item.itemName)}.png`}/>
                            <span className="item-name">{item.itemName}</span>
                            <span className="item-count">* {item.count}</span>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}