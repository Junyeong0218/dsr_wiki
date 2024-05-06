import React, { useEffect, useMemo, useState } from "react";
import { getUUID } from "../../functions/commons";

type Coupon = {
    name: string,
    code: string,
    startDate: string,
    expDate: string,
    active: boolean
}

export default function Coupons() : React.ReactElement {
    let prevCoupons = localStorage.getItem("coupons") ? JSON.parse(localStorage.getItem("coupons")!) : [];

    const [coupons, setCoupons] = useState<Array<Coupon>>(prevCoupons);

    useEffect(() => {
        const st1 = new Date().getTime();
        fetch("/.netlify/functions/getCoupons").then(async response => {
            const coupons:Array<Coupon> = await response.json();
            
            localStorage.setItem("coupons", JSON.stringify(coupons.filter(e => e.active)));
            setCoupons(coupons);
            console.log(`netlify function time : ${new Date().getTime() - st1}`)
        }).catch(error => {
            console.log(error);
        });

        const st2 = new Date().getTime();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/coupons/active`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.code === 200) {
                const coupons:Array<Coupon> = result.data;
                
                console.log(coupons);
                console.log(`back function time : ${new Date().getTime() - st2}`)
            }
        }).catch(error => {
            console.log(error)
        });
    }, []);

    const getCouponDateText = (coupon: Coupon): string => {
        return `${coupon.startDate} ~ ${coupon.expDate}`;
    }

    const copyCoupon = (coupon: Coupon) => {
        navigator.clipboard.writeText(coupon.code).then(() => alert("복사 완료"));
    }

    const content = useMemo(() => {
        return (
            <div className="content">
                { coupons.length === 0 && <div className="coupon"><strong>쿠폰이 없습니다.</strong></div>}
                { coupons.map((coupon, index) => (
                    <div className="coupon" key={getUUID()}>
                        <strong>{coupon.name}</strong>
                        <small>{getCouponDateText(coupon)}</small>
                        <button type='button' className='copy-coupon' title='누르면 복사돼요!' onClick={() => copyCoupon(coupon)}>{coupon.code}</button>
                        { index < coupons.length - 1 && <hr /> }
                    </div>
                ))}
            </div>
        );
    }, [coupons]);
    return content;
}