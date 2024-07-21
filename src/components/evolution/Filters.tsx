import React, { useEffect, useMemo, useState } from "react";
import { Grades, IMG_URL_BASE } from "../../enums";
import { getAllEvolutions, getEvolutions } from "../../functions";
import { Evolution } from "../../classes";
import { getUUID } from "../../functions/commons";
import { getSearchedEvolutions } from "../../functions/searchFunctions";
import { getDigimonFileName } from "../../functions/getDigimonFileName";

type FiltersProps = { 
    selectedDigimon: Evolution|null, 
    setSelectedDigimon: React.Dispatch<React.SetStateAction<Evolution | null>>
}

export default function Filters({ selectedDigimon, setSelectedDigimon }: FiltersProps): React.ReactElement {
    const [selectedGrade, setSelectedGrade] = useState<string>("전체");
    const [text, setText] = useState("");
    const [filtered, setFiltered] = useState<Array<Evolution>>([]);
    const [isFold, setIsFold] = useState(true);
    
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
            <div className="digidex-filter2">
                <div className="title">진화 단계</div>
                <div className="checkboxes">
                    <label htmlFor="evo-all" className={selectedGrade === "전체" ? "checked" : ""}>
                        <input type="radio" id="evo-all" checked={selectedGrade === "전체"}
                                                         onChange={(event) => setSelectedGrade("전체")}/>
                        <img src={`${IMG_URL_BASE}/filter_all.png`} />
                        <span>전체</span>
                    </label>
                    { grades.map(grade => (
                        <label htmlFor={grade} key={getUUID()} className={selectedGrade === grade ? "checked" : ""}>
                            <input type="radio" id={grade} checked={selectedGrade === grade}
                                                           onChange={(event) => setSelectedGrade(grade)} />
                            <img src={`${IMG_URL_BASE}/무배경_${grade === "유년기1" ? "쟈리몬" : grade === "유년기2" ? "기기몬" : grade === "성장기" ? "길몬" : grade === "성숙기" ? "그라우몬" : grade === "완전체" ? "메가로그라우몬" : "듀크몬"}.png`} />
                            <span>{grade}</span>
                        </label>
                    )) }
                </div>
            </div>
            <div className="search-bar">
                { textInput }
            </div>
            <div className="filtered-list-container">
                <div className={`filtered-list ${isFold ? "fold" : ""}`}>
                    { filtered.map(each => (
                        <button type="button" className="filtered-evolution" key={getUUID()} onClick={() => selectDigimon(each)}>
                            <img src={`${IMG_URL_BASE}/${getDigimonFileName(each.name)}.png`} />
                            { each.tag ? <span dangerouslySetInnerHTML={{ __html: each.tag }}></span> :
                                        <span>{each.name}</span>
                            }
                        </button>
                    ))}
                </div>
                <button type="button" className="spread" onClick={() => setIsFold(!isFold)}>{isFold ? "▼" : "▲"}</button>
            </div>
            
        </div>
    );
}