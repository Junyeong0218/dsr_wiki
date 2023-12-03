import React, { useMemo } from "react";
import Checkbox from "./Checkbox";
import MonsterCheckboxes from "./MonsterCheckboxes";

export default function ObjectFilter({ portal, setPortal,
                                       warp, setWarp,
                                       shop, setShop,
                                       itemCheckFlags, setItemCheckFlags, items,
                                       cube, setCube }) {
    
    const filter = useMemo(() => {
        return <div className="object-filter">
                    <Checkbox id={"portal"} text={"포탈"} 
                            checked={portal} setChecked={setPortal} />

                    <Checkbox id={"warp"} text={"워프 포인트"} 
                            checked={warp} setChecked={setWarp} />

                    <Checkbox id={"shop"} text={"상점"} 
                            checked={shop} setChecked={setShop} />

                    <MonsterCheckboxes itemCheckFlags={itemCheckFlags} setItemCheckFlags={setItemCheckFlags} items={items} />

                    <Checkbox id={"cube"} text={"데뀨"} 
                            checked={cube} setChecked={setCube} />
                </div>;
    }, [portal, warp, shop, itemCheckFlags, items, cube]);

    return filter;
}