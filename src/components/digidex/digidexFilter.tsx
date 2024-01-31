import React, { useEffect, useMemo, useRef, useState } from "react";
import { Elements, Grades, DigimonTypes, DigimonTypesEng } from "../../enums";
import { getUUID } from "../../functions/commons";
import { Digimon } from "../../classes";
import { getSearchedDigimons } from "../../functions/searchFunctions";

type DigidexFilterProps = { 
    all: Array<Digimon>,
    setFiltered: React.Dispatch<React.SetStateAction<Digimon[]>>
}

type Conditions = {
    [key:string]: Array<string>
}

export default function DigidexFilter({ all, setFiltered }: DigidexFilterProps): React.ReactElement {
    const grades = Object.values(Grades).filter(each => each !== "유년기1" && each !== "유년기2");
    const digimonTypes = Object.values(DigimonTypes);
    const digimonTypesEng = Object.values(DigimonTypesEng);
    const elements = Object.values(Elements);

    const defaultCondition: Conditions = {
        grades: [...grades], 
        digimonTypes: [...digimonTypes], 
        elements: [...elements]
    }

    const prevConditions = localStorage.getItem("digidex_conditions");
    const [conditions, setConditions] = useState<Conditions>(!prevConditions ? defaultCondition : JSON.parse(prevConditions));

    const prevText = localStorage.getItem("digidex_search");
    const [text, setText] = useState(prevText ? prevText : "");

    const textRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        localStorage.setItem("digidex_conditions", JSON.stringify(conditions));

        let filtered = [...all].filter(each => {
            return conditions["grades"].includes(Grades[each.grade]) &&
                    conditions["digimonTypes"].includes(digimonTypes[digimonTypesEng.indexOf(each.digimonType)]);
        });

        filtered = filtered.filter(each => {
            for(let i = 0; i < each.skills.length; i++) {
                if(conditions["elements"].includes(each.skills[i].element))
                    return true;
            }
            return false;
        });

        setFiltered([...filtered]);
    }, [conditions]);

    const toggleAll = (event: React.ChangeEvent, flag: string) => {
        const target = event.target as HTMLInputElement;
        
        if(target.checked) {
            localStorage.removeItem("digidex_conditions");
            
            defaultCondition[`${flag}`].forEach(e => {
                if(!conditions[`${flag}`].includes(e)) 
                    conditions[`${flag}`].push(e)
            });
        } else {
            conditions[`${flag}`] = [];
        }

        setConditions({...conditions});
    }

    const toggleCheckbox = (event: React.ChangeEvent, flag: string, value: string) => {
        const target = event.target as HTMLInputElement;

        if(target.checked) {
            conditions[`${flag}`].push(value);
        } else {
            conditions[`${flag}`].splice(conditions[`${flag}`].findIndex(e => e === value), 1);
        }

        setConditions({...conditions});
    }

    const updateText = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if(event.target.tagName === "INPUT") {
            const regex = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            const typed = event.target.value;

            setConditions({...defaultCondition});

            if(typed === "") {
                localStorage.removeItem("digidex_search");

                setText(typed);
                setFiltered(all);
            } else if(!regex.test(typed) && typed !== "") {
                localStorage.setItem("digidex_search", typed);

                setText(typed);
                const searched = getSearchedDigimons(event.target.value.trim());
                setFiltered(searched);
            }
        }
    }

    const textInput = useMemo(() => {
        return <input ref={textRef} type="text" className="digidex-search-input" value={text} onChange={updateText} placeholder="디지몬 이름 혹은 초성을 입력하세요" />
    }, [text]);

    return (
        <div className="digidex-filters">
            {/* 진화도 */}
            <div className="digidex-filter">
                <div className="title">진화 단계</div>
                <div className="checkboxes">
                    <label htmlFor="evo-all">
                        <input type="checkbox" id="evo-all" checked={conditions.grades.length === grades.length}
                                                            onChange={(event) => toggleAll(event, "grades")}/>
                        <span>전체</span>
                    </label>
                    { grades.map(grade => (
                        <label htmlFor={grade} key={getUUID()}>
                            <input type="checkbox" id={grade} checked={conditions.grades.includes(grade)}
                                                              onChange={(event) => toggleCheckbox(event, "grades", grade)} />
                            <span>{grade}</span>
                        </label>
                    )) }
                </div>
            </div>
            {/* 타입 */}
            <div className="digidex-filter">
                <div className="title">타입</div>
                <div className="checkboxes">
                    <label htmlFor="type-all">
                        <input type="checkbox" id="type-all" checked={conditions.digimonTypes.length === digimonTypes.length}
                                                             onChange={(event) => toggleAll(event, "digimonTypes")}/>
                        <span>전체</span>
                    </label>
                    { digimonTypes.map(type => (
                        <label htmlFor={type} key={getUUID()}>
                            <input type="checkbox" id={type} checked={conditions.digimonTypes.includes(type)}
                                                             onChange={(event) => toggleCheckbox(event, "digimonTypes", type)} />
                            <span>{type}</span>
                        </label>
                    )) }
                </div>
            </div>
            {/* 스킬속성 */}
            <div className="digidex-filter">
                <div className="title">스킬속성</div>
                <div className="checkboxes">
                    <label htmlFor="element-all">
                        <input type="checkbox" id="element-all" checked={conditions.elements.length === elements.length}
                                                                onChange={(event) => toggleAll(event, "elements")}/>
                        <span>전체</span>
                    </label>
                    { elements.map(element => (
                        <label htmlFor={element} key={getUUID()}>
                            <input type="checkbox" id={element} checked={conditions.elements.includes(element)}
                                                                onChange={(event) => toggleCheckbox(event, "elements", element)} />
                            <span>{element}</span>
                        </label>
                    )) }
                </div>
            </div>

            { textInput }
        </div>
    );
}