import React, { useEffect, useMemo, useState } from "react";
import { Grades } from "../../enums";
import { getAllEvolutions, getEvolutions } from "../../functions";
import { Evolution } from "../../classes";
import { getUUID } from "../../functions/commons";
import { getSearchedEvolutions } from "../../functions/searchFunctions";

type FiltersProps = { 
    selectedDigimon: Evolution|null, 
    setSelectedDigimon: React.Dispatch<React.SetStateAction<Evolution | null>>
}

export default function Filters({ selectedDigimon, setSelectedDigimon }: FiltersProps): React.ReactElement {
    const [selectedGrade, setSelectedGrade] = useState<string>("전체");
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState<Array<Evolution>>([]);
    
    const all = getAllEvolutions(false);
    const grades = Object.values(Grades);

    useEffect(() => {
        if(selectedGrade === "전체") {
            setFiltered([...all]);
            return;
        }

        const grade = grades.indexOf(selectedGrade) + 1;
        setFiltered([...all.filter(each => each.grade === grade)]);
    }, [selectedGrade]);

    const updateText = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        if(target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = target.value.trim();

            if(typed === "") {
                setText(typed);

                if(selectedGrade === "전체") {
                    setFiltered([...all]);
                    return;
                }
        
                const grade = grades.indexOf(selectedGrade) + 1;
                setFiltered([...all.filter(each => each.grade === grade)]);
            } else if(!regex.test(typed) && typed !== "") {
                setText(typed);
                const searched = getSearchedEvolutions(target.value.trim());
                setFiltered(searched);
            }
        }
    }

    const selectDigimon = (evolution: Evolution) => {
        if(selectedDigimon?.id !== evolution.id) {
            getEvolutions(evolution);
            setSelectedDigimon(evolution);
        }
    }

    const textInput = useMemo(() => {
        return <input type="text" value={text} onChange={updateText} placeholder="디지몬 초성 혹은 이름을 입력하세요." />;
    }, [text]);

    return (
        <div className="filters">
            <div className="digidex-filter">
                <div className="title">진화 단계</div>
                <div className="checkboxes">
                    <label htmlFor="evo-all">
                        <input type="radio" id="evo-all" checked={selectedGrade === "전체"}
                                                         onChange={(event) => setSelectedGrade("전체")}/>
                        <span>전체</span>
                    </label>
                    { grades.map(grade => (
                        <label htmlFor={grade} key={getUUID()}>
                            <input type="radio" id={grade} checked={selectedGrade === grade}
                                                           onChange={(event) => setSelectedGrade(grade)} />
                            <span>{grade}</span>
                        </label>
                    )) }
                </div>
            </div>
            <div className="search-bar">
                { textInput }
            </div>
            <div className="filtered-list">
                { filtered.map(each => (
                    <button type="button" className="filtered-evolution" key={getUUID()} onClick={() => selectDigimon(each)}>
                        <img src={`/images/${each.name}.png`} />
                        { each.tag ? <span dangerouslySetInnerHTML={{ __html: each.tag }}></span> :
                                     <span>{each.name}</span>
                        }
                    </button>
                ))}
            </div>
        </div>
    );
}