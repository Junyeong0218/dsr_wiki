import React, { useEffect, useMemo, useRef, useState } from "react";
import { Elements, Grades, DigimonTypes, DigimonTypesEng, IMG_URL_BASE, FieldTypes } from "../../enums";
import { getUUID } from "../../functions/commons";
import { Digimon } from "../../classes";
import { getSearchedDigimons } from "../../functions/searchFunctions";
import { getAllFieldTypes } from "../../functions/getFieldTypes";

type Filter = {
    type: string,
    method: string
}

type DigidexFilterProps = { 
    all: Array<Digimon>,
    sortFilters: Array<Filter>,
    setFiltered: React.Dispatch<React.SetStateAction<Digimon[]>>
}

type Conditions = {
    [key:string]: Array<string>
}

export default function DigidexFilter({ all, sortFilters, setFiltered }: DigidexFilterProps): React.ReactElement {
    const grades = Object.values(Grades).filter(each => each !== "유년기1" && each !== "유년기2");
    const digimonTypes = Object.values(DigimonTypes);
    const digimonTypesEng = Object.values(DigimonTypesEng);
    const elements = Object.values(Elements);
    const fieldTypes = Object.keys(FieldTypes);

    const fieldTypeOptions = useMemo(() => getAllFieldTypes(), []);

    const defaultCondition: Conditions = {
        grades: [...grades], 
        digimonTypes: [...digimonTypes], 
        elements: [...elements],
        strengths: [...elements],
        weaknesses: [...elements],
        fieldTypes: [...fieldTypes]
    }

    const prevConditions = localStorage.getItem("digidex_conditions");
    const [conditions, setConditions] = useState<Conditions>(!prevConditions ? defaultCondition : JSON.parse(prevConditions));
    if(!conditions["fieldTypes"]) conditions["fieldTypes"] = [...fieldTypes];
    if(!conditions["strengths"]) conditions["strengths"] = [...elements];
    if(!conditions["weaknesses"]) conditions["weaknesses"] = [...elements];

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

        filtered = filtered.filter(each => each.strength && conditions.strengths.includes(each.strength));
        filtered = filtered.filter(each => each.weakness && conditions.weaknesses.includes(each.weakness));
        filtered = filtered.filter(each => {
            for(let i = 0; i < each.fieldTypes.length; i++) {
                if(conditions.fieldTypes.includes(each.fieldTypes[i])) return true;
            }
            return false;
        });

        filtered = filtered.sort((a, b) => {
            let result: number = 0;

            for(let i = 0; i < sortFilters.length; i++) {
                let innerResult: number = 0;
                const filter = sortFilters[i];
                let aValue: number | string;
                let bValue: number | string;

                if(filter.type.includes("skill")) {
                    const index = Number(filter.type.substring(0, 1)) - 1
                    const aSkill = a.skills[index];
                    const bSkill = b.skills[index];

                    if(aSkill) aValue = aSkill.attackCount * aSkill.coefficients[9];
                    else       aValue = 0;

                    if(bSkill) bValue = bSkill.attackCount * bSkill.coefficients[9];
                    else       bValue = 0;
                } else {
                    aValue = a[filter.type];
                    bValue = b[filter.type];
                    // if(filter.method === "asc") {
                    //     result = a.name.localeCompare(b.name);
                    // } else {
                    //     result = b.name.localeCompare(a.name);
                    // }
                }
                
                if(typeof aValue === "number" && typeof bValue === "number") {
                    if(filter.method === "asc") innerResult = aValue - bValue;
                    else                        innerResult = bValue - aValue;
                } else if(typeof aValue === "string" && typeof bValue === "string") {
                    if(filter.method === "asc") innerResult = aValue.localeCompare(bValue);
                    else                        innerResult = bValue.localeCompare(aValue);
                }

                if(innerResult !== 0) {
                    result = innerResult;
                    break;
                }
            }
            
            return result;
        });

        setFiltered([...filtered]);
    }, [conditions, sortFilters]);

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
        console.log(flag);

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

            // setConditions({...defaultCondition});

            if(typed === "") {
                localStorage.removeItem("digidex_search");

                setText(typed);
                setConditions({ ...conditions });
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
            <div className="digidex-filter2">
                <div className="title">진화 단계</div>
                <div className="checkboxes">
                    <label htmlFor="evo-all" className={conditions.grades.length === grades.length ? "checked" : ""}>
                        <input type="checkbox" id="evo-all" checked={conditions.grades.length === grades.length}
                                                            onChange={(event) => toggleAll(event, "grades")}/>
                        <img src={`${IMG_URL_BASE}/filter_all.png`} />
                        <span>전체</span>
                    </label>
                    { grades.map(grade => (
                        <label htmlFor={grade} key={getUUID()} className={conditions.grades.includes(grade) ? "checked" : ""}>
                            <input type="checkbox" id={grade} checked={conditions.grades.includes(grade)}
                                                              onChange={(event) => toggleCheckbox(event, "grades", grade)} />
                            <img src={`${IMG_URL_BASE}/무배경_${grade === "성장기" ? "길몬" : grade === "성숙기" ? "그라우몬" : grade === "완전체" ? "메가로그라우몬" : "듀크몬"}.png`} />
                            <span>{grade}</span>
                        </label>
                    )) }
                </div>
            </div>
            {/* 타입 */}
            <div className="digidex-filter2">
                <div className="title">타입</div>
                <div className="checkboxes">
                    <label htmlFor="type-all" className={conditions.digimonTypes.length === digimonTypes.length ? "checked" : ""}>
                        <input type="checkbox" id="type-all" checked={conditions.digimonTypes.length === digimonTypes.length}
                                                             onChange={(event) => toggleAll(event, "digimonTypes")}/>
                        <img src={`${IMG_URL_BASE}/filter_all.png`} />
                        <span>전체</span>
                    </label>
                    { digimonTypes.map((type, index) => (
                        <label htmlFor={type} key={getUUID()} className={conditions.digimonTypes.includes(type) ? "checked" : ""}>
                            <input type="checkbox" id={type} checked={conditions.digimonTypes.includes(type)}
                                                             onChange={(event) => toggleCheckbox(event, "digimonTypes", type)} />
                            <img src={`${IMG_URL_BASE}/${Object.values(DigimonTypesEng)[index]}.png`} />
                            <span>{type}</span>
                        </label>
                    )) }
                </div>
            </div>
            {/* 스킬속성 */}
            <div className="digidex-filter2">
                <div className="title">스킬속성</div>
                <div className="checkboxes">
                    <label htmlFor="element-all" className={conditions.elements.length === elements.length ? "checked" : ""}>
                        <input type="checkbox" id="element-all" checked={conditions.elements.length === elements.length}
                                                                onChange={(event) => toggleAll(event, "elements")}/>
                        <img src={`${IMG_URL_BASE}/filter_all.png`} />
                        <span>전체</span>
                    </label>
                    { elements.map(element => (
                        <label htmlFor={element} key={getUUID()} className={conditions.elements.includes(element) ? "checked" : ""}>
                            <input type="checkbox" id={element} checked={conditions.elements.includes(element)}
                                                                onChange={(event) => toggleCheckbox(event, "elements", element)} />
                            <img src={`${IMG_URL_BASE}/스킬_${element}.png`} />
                            <span>{element}</span>
                        </label>
                    )) }
                </div>
            </div>
            {/* 강점 */}
            <div className="digidex-filter2">
                <div className="title">강점</div>
                <div className="checkboxes">
                    <label htmlFor="strength-all" className={conditions.strengths.length === elements.length ? "checked" : ""}>
                        <input type="checkbox" id="strength-all" checked={conditions.strengths.length === elements.length}
                                                                onChange={(event) => toggleAll(event, "strengths")}/>
                        <img src={`${IMG_URL_BASE}/filter_all.png`} />
                        <span>전체</span>
                    </label>
                    { elements.map(element => (
                        <label htmlFor={`강점_${element}`} key={getUUID()} className={conditions.strengths.includes(element) ? "checked" : ""}>
                            <input type="checkbox" id={`강점_${element}`} checked={conditions.strengths.includes(element)}
                                                                onChange={(event) => toggleCheckbox(event, "strengths", element)} />
                            <img src={`${IMG_URL_BASE}/스킬_${element}.png`} />
                            <span>{element}</span>
                        </label>
                    )) }
                </div>
            </div>
            {/* 약점 */}
            <div className="digidex-filter2">
                <div className="title">약점</div>
                <div className="checkboxes">
                    <label htmlFor="weakness-all" className={conditions.weaknesses.length === elements.length ? "checked" : ""}>
                        <input type="checkbox" id="weakness-all" checked={conditions.weaknesses.length === elements.length}
                                                                 onChange={(event) => toggleAll(event, "weaknesses")}/>
                        <img src={`${IMG_URL_BASE}/filter_all.png`} />
                        <span>전체</span>
                    </label>
                    { elements.map(element => (
                        <label htmlFor={`약점_${element}`} key={getUUID()} className={conditions.weaknesses.includes(element) ? "checked" : ""}>
                            <input type="checkbox" id={`약점_${element}`} checked={conditions.weaknesses.includes(element)}
                                                                          onChange={(event) => toggleCheckbox(event, "weaknesses", element)} />
                            <img src={`${IMG_URL_BASE}/스킬_${element}.png`} />
                            <span>{element}</span>
                        </label>
                    )) }
                </div>
            </div>
            {/* 필드 타입 */}
            <div className="digidex-filter2">
                <div className="title">필드 타입</div>
                <div className="checkboxes">
                    <label htmlFor="fieldTypes-all" className={conditions.fieldTypes.length === fieldTypes.length ? "checked" : ""}>
                        <input type="checkbox" id="fieldTypes-all" checked={conditions.fieldTypes.length === fieldTypes.length}
                                                                   onChange={(event) => toggleAll(event, "fieldTypes")}/>
                        <img src={`${IMG_URL_BASE}/filter_all.png`} />
                        <span>전체</span>
                    </label>
                    { fieldTypes.map(fieldType => (
                        <label htmlFor={`field_${fieldType}`} key={getUUID()} className={conditions.fieldTypes.includes(fieldType) ? "checked" : ""} title={`${fieldTypeOptions.find(o => o.type === fieldType)!.stat} 증가`}>
                            <input type="checkbox" id={`field_${fieldType}`} checked={conditions.fieldTypes.includes(fieldType)}
                                                                onChange={(event) => toggleCheckbox(event, "fieldTypes", fieldType)} />
                            <img src={`${IMG_URL_BASE}/field_${fieldType}.png`} />
                            <span>{fieldType}</span>
                        </label>
                    )) }
                </div>
            </div>

            { textInput }
        </div>
    );
}