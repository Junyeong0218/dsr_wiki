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
        // const st1 = new Date().getTime();
        // fetch("/.netlify/functions/getCoupons").then(async response => {
        //     const coupons:Array<Coupon> = await response.json();
            
        //     localStorage.setItem("coupons", JSON.stringify(coupons.filter(e => e.active)));
        //     setCoupons(coupons);
        //     console.log(`netlify function time : ${new Date().getTime() - st1}`)
        // }).catch(error => {
        //     console.log(error);
        // });

        const st2 = new Date().getTime();
        fetch(`/api/coupons/active`).then(async (response) => {
            const result = await response.json();
            console.log(result)
            if(result.status === 200) {
                const coupons:Array<Coupon> = result.data;
                // console.log(coupons);
                // console.log(`coupons function time : ${new Date().getTime() - st2}`)

                localStorage.setItem("coupons", JSON.stringify(coupons.filter(e => e.active)));
                setCoupons(coupons);
            }
        }).catch(error => {
            console.log(error)
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