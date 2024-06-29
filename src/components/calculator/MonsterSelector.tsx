import React, { useEffect, useMemo, useRef, useState } from "react";
import { Map, Monster } from "../../classes";
import { getMaps } from "../../functions";
import { getUUID } from "../../functions/commons";
import ReactSelect, { ActionMeta, SingleValue } from "react-select";

type props = {
    monster: Monster | undefined,
    setMonster: React.Dispatch<React.SetStateAction<Monster | undefined>>
}

type MapShotcut = {
    [key:string]: Array<Map>
}

type Option = {
    label: string
    value: string | number
}

export default function MonsterSelector({ monster, setMonster }: props): React.ReactElement {
    const maps = useMemo(() => getMaps(), []);
    const categories = useMemo(() => {
        const shortcuts: MapShotcut = {};
        maps.forEach((map) => {
            let shortcut = shortcuts[`${map.category}`];
            if(!shortcut) {
                shortcuts[`${map.category}`] = [];
            }

            shortcuts[`${map.category}`].push(map);
        });
        
        return shortcuts;
    }, []);
    
    const categoryOptions = Object.keys(categories).map(c => {
        return { label: c, value: c };
    });

    const originMap = monster ? maps.find(m => m.id === monster.mapId)! : maps.find(m => m.id === 1)!;
    const [selectedCategory, setSelectedCategory] = useState<Option>(categoryOptions.find(c => c.label === originMap.category)!);
    const [selectedMap, setSelectedMap] = useState<Option>({ label: originMap.name, value: originMap.id});

    const baseMonster = categories[selectedCategory.value][0].monsters![0];
    const basicMonster = !monster ? { label: `${baseMonster.name}(${baseMonster.level})`, value: baseMonster.id } : { label: `${monster.name}(${monster.level})`, value: baseMonster.id };
    const [selectedMonster, setSelectedMonster] = useState<Option>(basicMonster);

    const onChangeCategory = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        if(!newValue) return;

        setSelectedCategory(newValue);
    }

    console.log(selectedCategory);

    const categorySelector = <ReactSelect styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: 0,
          borderLeft: 0,
          borderRight: 0,
          textAlignLast: "center",
          backgroundColor: "transparent",
          fontSize: 14
        }),
    }} options={categoryOptions} value={selectedCategory} onChange={onChangeCategory} />
    
    const onChangeMap = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        if(!newValue) return;

        setSelectedMap(newValue);
    }
    const mapOptions = !selectedCategory ? categories["파일섬"].map(m => { return { label: m.name, value: m.id }}) : 
                                           categories[selectedCategory.value].map(m => { return { label: m.name, value: m.id }});
    const mapSelector = <ReactSelect styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: 0,
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          textAlignLast: "center",
          backgroundColor: "transparent",
          fontSize: 14
        }),
    }} options={mapOptions} value={selectedMap} onChange={onChangeMap} />

    const onChangeMonster = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        if(!newValue) return;

        setSelectedMonster(newValue);

        const monster = maps.find(m => m.id === selectedMap.value)!.monsters!.find(m => m.id === newValue.value);
        setMonster(monster);
    }

    const originMonsters = !selectedCategory ? categories["파일섬"][0].monsters!.sort((a, b) => a.level - b.level) : 
                                               maps.find(m => m.id === selectedMap.value)!.monsters!.sort((a, b) => a.level - b.level);
    const monsters = new Set<Monster>();
    originMonsters.forEach(m => {
        const array = [ ...monsters ];
        const found = array.find(e => e.name === m.name && e.level === m.level);
        if(!found)
            monsters.add(m);
    });
    const monsterOptions = [ ...monsters ].map(m => { return { label: `${m.name}(${m.level})`, value: m.id }});
    const monsterSelector = <ReactSelect styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: 0,
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          textAlignLast: "center",
          backgroundColor: "transparent",
          fontSize: 14
        }),
    }} options={monsterOptions} value={selectedMonster} onChange={onChangeMonster} />

    return (
        <div className="monster-selector-container">
            { categorySelector }
            { mapSelector }
            { monsterSelector }
        </div>
    );
}