import React, { useMemo } from "react";
import { getUUID } from "../../functions/commons";

type TamerEquipmentFilterProps = {
    title: string,
    local: string,
    originList: Array<string>,
    selectedList: Array<string>,
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
}

export default function TamerEquipmentFilter({ title, local, originList, selectedList, setSelectedList }: TamerEquipmentFilterProps) : React.ReactElement {
    const filter = useMemo(() => {
        return <div className="digidex-filter2">
            <div className="title">{title}</div>
            <div className="checkboxes">
                <label htmlFor={`${title}_전체`} key={getUUID()} className={originList.length === selectedList.length ? "checked" : ""}>
                    <input type="checkbox" id={`${title}_전체`} checked={originList.length === selectedList.length}
                                                                onChange={(event) => {
                                                                    let list = [];
                                                                    if(event.target.checked) list.push(...originList);

                                                                    localStorage.setItem(local, JSON.stringify(list));
                                                                    setSelectedList([...list]);
                                                                }}/>
                    <span>전체</span>
                </label>
            { originList.map(each => (
                <label htmlFor={each} key={getUUID()} className={selectedList.includes(each) ? "checked" : ""}>
                    <input type="checkbox" id={each} checked={selectedList.includes(each)}
                                                          onChange={(event) => {
                                                            let list = [];
                                                            
                                                            if(event.target.checked) {
                                                                selectedList.push(each);
                                                                
                                                                list.push(...selectedList);
                                                            } else {
                                                                list.push(...selectedList.filter(e => e !== each));
                                                            }

                                                            localStorage.setItem(local, JSON.stringify(list));
                                                            setSelectedList(list);
                                                          }}/>
                    <span>{each}</span>
                </label>
            ))}
            </div>
        </div>
    }, [selectedList]);
    
    return filter;
}