import React, { useEffect, useMemo, useRef, useState } from "react";
import { getUUID } from "../../functions/commons";
import CouponModal from "./CouponModal";
import { IMG_URL_BASE } from "../../enums";

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

export default function Coupons() : React.ReactElement {
    let prevCoupons = localStorage.getItem("coupons") ? JSON.parse(localStorage.getItem("coupons")!) : [];

    const [coupons, setCoupons] = useState<Array<Coupon>>(prevCoupons);
    const [isOpen, setIsOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const selectedCoupon = useRef<Coupon>();

    const captureMouse = (event: React.MouseEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLImageElement;
        if(target?.tagName === "IMG") {
            const id = target.id;
            
            const coupon = coupons.find(c => c.name === id);
            if(coupon) {
                if(selectedCoupon.current?.name === coupon.name) {
                    return;
                }
                selectedCoupon.current = coupon;
                
                const mainRect = document.querySelector(".main")!.getBoundingClientRect();
                const modalHeight = 77 + 60 * coupon.items.length - 5 > 450 ? 450 : 77 + 60 * coupon.items.length - 5;
                
                if(event.pageY - mainRect.top + modalHeight > window.innerHeight) {
                    setModalPosition({ top: event.pageY - mainRect.top - modalHeight + 2, left: event.pageX - mainRect.left + 2 });
                } else {
                    setModalPosition({ top: event.pageY - mainRect.top + 2, left: event.pageX - mainRect.left + 2 });
                }
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }
    }

    const mouseLeaveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const relatedTarget = event.relatedTarget as HTMLDivElement;
        try {
            // if(relatedTarget.classList.contains("modal") || relatedTarget.classList.contains("coupon")) return;

            setIsOpen(false);
            selectedCoupon.current = undefined;
        } catch (e) {
            setIsOpen(false);
            selectedCoupon.current = undefined;
        }
    }

    useEffect(() => {
        fetch(`/api/coupons/active`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                const coupons:Array<Coupon> = result.data;

                localStorage.setItem("coupons", JSON.stringify(coupons));
                setCoupons(coupons);
            }
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const getDateText = (dateString: string, includeTime: boolean = false) => {
        const date = new Date(dateString);
        // const localized = new Date(date.getTime() + 1000 * 60 * 60 * 9);
        const localized = date

        const year = localized.getFullYear();
        const month = String(localized.getMonth() + 1).padStart(2, "0");
        const day = String(localized.getDate()).padStart(2, "0");

        if(!includeTime)
            return `${year}-${month}-${day}`;

        const hour = String(localized.getHours()).padStart(2, "0");
        const minute = String(localized.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    const getCouponDateText = (coupon: Coupon): string => {
        return `${getDateText(coupon.startDate)} ~ ${getDateText(coupon.expDate, true)}`;
    }

    const copyCoupon = (coupon: Coupon) => {
        navigator.clipboard.writeText(coupon.code).then(() => alert("복사 완료"));
    }

    const couponModal = useMemo(() => <CouponModal isOpen={isOpen} coupon={selectedCoupon.current} position={modalPosition} />, [isOpen, modalPosition]);

    return (
        <div className="content" onMouseMove={captureMouse} onMouseLeave={mouseLeaveHandler} >
            { coupons.length === 0 && <div className="coupon"><strong>쿠폰이 없습니다.</strong></div>}
            { coupons.map((coupon, index) => (
                <div className="coupon" key={getUUID()}>
                    <strong>
                        {coupon.name}
                        <img id={coupon.name} src={`${IMG_URL_BASE}/quest_reward.png`} />
                    </strong>
                    <small>{getCouponDateText(coupon)}</small>
                    <button type='button' className='copy-coupon' title='누르면 복사돼요!' onClick={() => copyCoupon(coupon)}>{coupon.code}</button>
                    { index < coupons.length - 1 && <hr /> }
                </div>
            ))}
            { couponModal }
        </div>
    );
}