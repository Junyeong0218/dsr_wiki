import React, { useMemo, useRef, useState } from "react";
import { ItemType } from "../../enums";
import { getSearchedCombinations } from "../../functions/searchFunctions";
import { getUUID } from "../../functions/commons";
import { Combination } from "../../classes";

type FilterProps = {
    all: Array<Combination>,
    setFiltered: React.Dispatch<React.SetStateAction<Combination[] | null>>
}

export default function CombinationFilters({ all, setFiltered }: FilterProps): React.ReactElement {
    const options = useMemo(() => ["전체", "포션", "소모 아이템", "탐지기", "스킬 강화석", "기타"], []);

    const selectRef = useRef<HTMLSelectElement>(null);
    const textRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState("");

    const updateText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if(event.target.tagName === "INPUT") {
            const regex = /[`~!@#$^&*_|+\-=?;'",.<>\{\}\[\]\\\/]/g;
            const typed = event.target.value;

            selectRef.current!.value = "전체";
            if(typed === "") {
                setText(typed);
                setFiltered(null);
            } else if(!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = getSearchedCombinations(event.target.value.trim());
                setFiltered(searched);
            }
        }
    }

    const filterByType = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setText("");

        const value = event.target.value;
        if(value === "전체") setFiltered(null);
        else {
            const typeId = Object.values(ItemType).findIndex(each => each === value) + 1;
            const filtered = all.filter(each => each.resultItem.type === typeId);
            
            setFiltered(filtered);
        }
    }

    const textInput = useMemo(() => {
        return <input ref={textRef} type="text" className="search-input" value={text} onChange={updateText} placeholder="제작할 아이템의 이름 혹은 초성을 입력하세요." />
    }, [text]);

    return (
        <div className="combination-filters">
            <select ref={selectRef} onChange={filterByType} value={selectRef.current?.value} key={getUUID()}>
                { options.map(option => (
                    <option value={option} key={getUUID()}>{option}</option>
                ))}
            </select>
            { textInput }
        </div>
    );
}