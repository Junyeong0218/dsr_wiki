import React, { useMemo, useRef, useState } from "react";
import { getAllDigimons, getDigimonQualityText } from "../../functions";
import { Link, useLocation } from "react-router-dom";
import { getNameExceptColon, getUUID } from "../../functions/commons";
import DigimonInfo from "./digimonInfo";
import DigidexFilter from "./digidexFilter";
import { Grades, IStringKey } from "../../enums";
import getSortText from "../../functions/getSortText";

type Filter = {
    type: string,
    method: string
}

class FilterObj {
    type: string;
    method: string;

    constructor() {
        this.type = "";
        this.method = "";
    }
}

const FilterTypes: IStringKey = {
    "name": "이름",
    "grade": "진화단계",
    "hp": "HP",
    "sp": "SP",
    "str": "힘",
    "int": "지능",
    "spd": "속도",
    "def": "수비",
    "res": "저항",
    "1skill": "1스킬",
    "2skill": "2스킬",
    "3skill": "3스킬"
}

export default function Digidex(): React.ReactElement {
    const location = useLocation();
    const query = location.search;
    const selected = query.trim() === "" ? null : decodeURIComponent(query.replace("?digimon=", ""));

    // 지난 잔재 제거
    localStorage.removeItem("grade");
    localStorage.removeItem("type");
    localStorage.removeItem("element");
    
    if(selected) {
        return (
            <div className="main">
                <div className="digidex" style={{ flexWrap: "nowrap" }}>
                    <DigimonInfo selected={selected} />
                </div>
            </div>
        );
    }

    const createFilters = (includeList?: Array<FilterObj>) => {
        const list = [];
        if(includeList !== undefined) includeList.forEach(e => list.push(e));
        let length = includeList === undefined ? 0 : includeList.length;
        for(let i = 0; i < 12 - length; i++) list.push(new FilterObj());

        return list;
    }

    const localStorageFilterData = localStorage.getItem("sortFilters");
    const defaultFilters: Array<Filter> = [];
    const loadedFilterData = localStorageFilterData ? JSON.parse(localStorageFilterData) : null;

    const all = getAllDigimons(false);
    const [sortFilters, setSortFilters] = useState<Array<Filter>>(loadedFilterData ?? defaultFilters);
    const [filtered, setFiltered] = useState(all);
    const [isTable, setIsTable] = useState(false);
    const [isOpenSortModal, setIsOpenSortModal] = useState(false);
    const [tempSorts, setTempSorts] = useState<Array<Filter>>(createFilters(loadedFilterData));
    
    const filterOptionContainer = useRef<HTMLDivElement>(null);

    const pushToTemp = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        tempSorts[index].type = event.target.value;
        setTempSorts([...tempSorts]);
    }

    const pushMethodToTemp = (eng: string, index: number) => {
        tempSorts[index].method = eng;
        setTempSorts([...tempSorts]);
    }

    const applySort = () => {
        const selectedSorts:Array<Filter> = [];
        for(let i = 0; i < 12; i++) {
            const type = (filterOptionContainer.current?.querySelector(`#sort${i + 1}_type`)! as HTMLSelectElement).value;
            const method = (filterOptionContainer.current?.querySelector(`#sort${i + 1}_method`) as HTMLSelectElement).value;

            if(type !== "" && method !== "") {
                selectedSorts.push({
                    type, method
                })
            }
        }

        const temp = [...selectedSorts];
        for(let i = temp.length; i < 12; i++) {
            temp.push(new FilterObj());
        }

        localStorage.setItem("sortFilters", JSON.stringify(selectedSorts));
        setTempSorts(temp);
        setSortFilters(selectedSorts);
        setIsOpenSortModal(false);
    }

    const digidexTable = useMemo(() => {
        return <table className="digidex-table">
                    <thead>
                        <tr>
                            <td>이름</td>
                            <td>진화단계</td>
                            <td>타입</td>
                            <td>HP</td>
                            <td>SP</td>
                            <td>힘</td>
                            <td>지능</td>
                            <td>수비</td>
                            <td>저항</td>
                            <td>속도</td>
                            <td>강점</td>
                            <td>약점</td>
                            <td>1스킬</td>
                            <td>2스킬</td>
                            <td>3스킬</td>
                            {/* <td>필드타입</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        { filtered.map(each => (
                            <tr key={getUUID()}>
                                <td><img src={`/images/${each.name}.png`} />&nbsp;{each.name}</td>
                                <td>{Grades[each.grade]}</td>
                                <td><img src={`/images/${each.digimonType}.png`} /></td>
                                <td>{each.hp.toLocaleString("ko-KR")}</td>
                                <td>{each.sp.toLocaleString("ko-KR")}</td>
                                <td>{each.str.toLocaleString("ko-KR")}</td>
                                <td>{each.int.toLocaleString("ko-KR")}</td>
                                <td>{each.def.toLocaleString("ko-KR")}</td>
                                <td>{each.res.toLocaleString("ko-KR")}</td>
                                <td>{each.spd.toLocaleString("ko-KR")}</td>
                                <td title={getDigimonQualityText(each.strengthEffect, false)}>
                                    <img src={`/images/${each.strength} 강점.png`} />
                                    &nbsp;
                                    {each.strengthEffect}
                                </td>
                                <td title={getDigimonQualityText(each.weaknessEffect, false)}>
                                    <img src={`/images/${each.weakness} 약점.png`} />
                                    &nbsp;
                                    {each.weaknessEffect}
                                </td>
                                {/* 1안 - 내가한거 */}
                                {/* { each.skills.map(skill => (
                                    <td className={`${skill.additionalTurn ? "casting" : ""}`}>
                                        <img src={`/images/스킬_${skill.element}.png`} />
                                        <img src={`/images/스킬_${skill.targetCount}.png`} title={skill.targetCount} />
                                        <img src={`/images/스킬_${skill.range}.png`} title={skill.range} />
                                        { skill.effect && skill.effect !== "회복" && <img src={`/images/스킬_${skill.effect}.png`} title={skill.effect} /> }
                                        { skill.effect && skill.effect === "회복" && ` ${skill.effect}` }
                                        {skill.attackCount > 0 && ` ${skill.attackCount}타`}
                                        {skill.attackCount > 0 && ` ${skill.getPercentByIndex(9)}%`}
                                    </td>
                                ))} */}
                                { each.skills.map(skill => {
                                    let className = "";
                                    if(skill.targetCount === "전체") className += "global ";
                                    if(skill.additionalTurn) className += "casting ";
                                    if(skill.range === "근거리") className += "melee";
                                    if(skill.range === "원거리") className += "ranged";

                                    return <td className={className} key={getUUID()}>
                                        <img src={`/images/스킬_${skill.element}.png`} />
                                        {/* <img src={`/images/스킬_${skill.targetCount}.png`} title={skill.targetCount} />
                                        <img src={`/images/스킬_${skill.range}.png`} title={skill.range} /> */}
                                        { skill.effect ? " ": ""}
                                        { skill.effect && skill.effect !== "회복" && <img src={`/images/스킬_${skill.effect}.png`} title={skill.effect} /> }
                                        { skill.effect && skill.effect === "회복" && ` ${skill.effect}` }
                                        { skill.attackCount > 0 && ` ${skill.attackCount}타` }
                                        { skill.attackCount > 0 && ` ${skill.getPercentByIndex(9)}%` }
                                        {/* { skill.additionalTurn ? " ": "" }
                                        { skill.additionalTurn && <span className="bold">캐스팅</span> } */}
                                    </td>
                                })}
                                { each.skills.length < 3 && <td></td> }
                            </tr>
                        ))}
                    </tbody>
                </table>;
    }, [filtered]);

    const digimonButtons = useMemo(() => {
        return <div className="digimon-buttons">
            { filtered.map(each => {
                const style = each.name.length > 8 ? {fontSize: "12px"} : {};

                return <Link to={`/digimons/digidex?digimon=${each.name}`} key={getUUID()}>
                            <button type="button" className="digimon-button">
                                <img src={`/images/${each.name}.png`} loading="lazy" />
                                { each.tag ? <span style={style} dangerouslySetInnerHTML={{__html: each.tag}}></span> : <span style={style}>{each.name}</span>}
                            </button>
                        </Link>
            })}
        </div>
    }, [filtered]);
    
    return (
        <div className="main">
            <div className="digidex">
                <DigidexFilter all={all} sortFilters={sortFilters} setFiltered={setFiltered} />

                <div className="toggle-table-container">
                    <div className="sort-container">
                        <button type="button" className={sortFilters.length !== 0 ? "filtered" : ""} onClick={() => setIsOpenSortModal(!isOpenSortModal)}>
                            { sortFilters.length === 0 && "정렬 옵션" }
                            { sortFilters.length !== 0 && 
                                sortFilters.map(filter => {
                                    const arrow = filter.method === "desc" ? "↓" : "↑";
                                    const name = getSortText(filter.type);
                                    return `${name} ${arrow}`;
                                }).join("  ")
                            }
                        </button>
                        <div id="sort-modal" className={`modal ${isOpenSortModal ? "active": ""}`}>
                            <div className="window">
                                <div className="title">정렬 옵션 설정</div>
                                <div className="options" ref={filterOptionContainer}>
                                    { tempSorts.map((tempValue, index) => {
                                        return <div className="row" key={getUUID()}>
                                            <span>{index + 1}순위</span>
                                            <select name={`sort${index + 1}_type`} id={`sort${index + 1}_type`} 
                                                    onChange={(event) => pushToTemp(event, index)} defaultValue={tempValue.type}>
                                                <option value="">옵션</option>
                                                { Object.keys(FilterTypes).map(eng => (
                                                    <option key={getUUID()} value={eng}>{FilterTypes[eng]}</option>
                                                )) }
                                            </select>
                                            <select name={`sort${index + 1}_method`} id={`sort${index + 1}_method`}
                                                    onChange={(event) => pushMethodToTemp(event.target.value, index)} defaultValue={tempValue.method}>
                                                <option value="">정렬 방식</option>
                                                <option value="asc">오름차순</option>
                                                <option value="desc">내림차순</option>
                                            </select>
                                        </div>
                                    })}
                                </div>
                                <div className="buttons">
                                    <button type="button" onClick={applySort}>적용</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="toggle-container" onClick={() => setIsTable(!isTable)}>
                        <span className={`${isTable ? "" : "selected"}`}>초상화</span>
                        <div className={`circle-container ${isTable ? "right" : ""}`}>
                            <span className="circle"></span>
                        </div>
                        <span className={`${isTable ? "selected" : ""}`}>표</span>
                    </div>
                </div>

                { isTable && <div className="table-legend-container">
                    <div className="table-legend">
                        <span className="box casting"></span>
                        <span className="text">캐스팅</span>
                    </div>
                    <div className="table-legend">
                        <span className="box"></span>
                        <span className="text">단일 공격기</span>
                    </div>
                    <div className="table-legend">
                        <span className="box global"></span>
                        <span className="text">전체 공격기</span>
                    </div>
                    <div className="table-legend">
                        <span className="box melee"></span>
                        <span className="text">근거리 공격</span>
                    </div>
                    <div className="table-legend">
                        <span className="box ranged"></span>
                        <span className="text">원거리 공격</span>
                    </div>
                </div>}
                
                { isTable && digidexTable }

                { !isTable && digimonButtons }
            </div>
        </div>
    );
}