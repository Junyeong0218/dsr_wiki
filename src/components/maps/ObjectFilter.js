import React, { useMemo } from "react";
import Checkbox from "./Checkbox";

export default function ObjectFilter({ portal, setPortal,
                                       warp, setWarp,
                                       shop, setShop,
                                       monster, setMonster,
                                       cube, setCube }) {
    return (
        <div className="object-filter">
            <Checkbox id={"portal"} text={"포탈"} 
                      checked={portal} setChecked={setPortal} />

            <Checkbox id={"warp"} text={"워프 포인트"} 
                      checked={warp} setChecked={setWarp} />

            <Checkbox id={"shop"} text={"상점"} 
                      checked={shop} setChecked={setShop} />

            <Checkbox id={"monster"} text={"몬스터"} 
                      checked={monster} setChecked={setMonster} />

            <Checkbox id={"cube"} text={"데뀨"} 
                      checked={cube} setChecked={setCube} />
        </div>
    );
}