import React, { useMemo } from "react";
import Checkbox from "./Checkbox";
import MonsterCheckboxes from "./MonsterCheckboxes";
import { IFlags } from "../../functions/getDropItemFilteringFlags";
import { Item } from "../../classes";

type ObjectFilterProps = { 
        portal: boolean, 
        setPortal: React.Dispatch<React.SetStateAction<boolean>>,
        warp: boolean, 
        setWarp: React.Dispatch<React.SetStateAction<boolean>>,
        shop: boolean, 
        setShop: React.Dispatch<React.SetStateAction<boolean>>,
        itemCheckFlags: IFlags, 
        setItemCheckFlags: React.Dispatch<React.SetStateAction<IFlags>>, 
        items: Array<Item>,
        cube: boolean, 
        setCube: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ObjectFilter({ portal, setPortal,
                                       warp, setWarp,
                                       shop, setShop,
                                       itemCheckFlags, setItemCheckFlags, items,
                                       cube, setCube }: ObjectFilterProps): React.ReactElement {
    
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