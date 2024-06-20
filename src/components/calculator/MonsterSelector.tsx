import React, { useMemo, useState } from "react";
import { Monster } from "../../classes";
import { getMaps } from "../../functions";
import { getUUID } from "../../functions/commons";

type props = {
    monster: Monster | undefined,
    setMonster: React.Dispatch<React.SetStateAction<Monster | undefined>>
}

export default function MonsterSelector({ monster, setMonster }: props): React.ReactElement {
    const maps = useMemo(() => getMaps(), []);
    // const mapNames = useMemo(() => maps.map(m => {
    //     return { id: m.id, name: m.name };
    // }), []);
    const [selectedMap, setSelectedMap] = useState<number>(monster?.mapId ?? 22);
    const monsters = maps.find(e => e.id === selectedMap)!.monsters;
    const filtered = monsters !== null ? [ {id: 0, name: "", level: 0}, ...monsters ] : [ {id: 0, name: "", level: 0} ];

    const mapSelector = useMemo(() => {
        return <select className="map-selector" defaultValue={selectedMap} onChange={(e) => setSelectedMap(Number(e.target.value))}>
                    { maps.map(map => {
                    return <option value={map.id} key={getUUID()}>{map.name}</option>
                    }) }
                </select>
    }, []);

    return (
        <div className="monster-selector-container">
            { mapSelector }
            <select className="digimon-selector" defaultValue={monster?.id} onChange={(e) => setMonster(monsters?.find(m => m.id === Number(e.target.value)))}>
                { filtered.map(monster => {
                   return <option value={monster.id} key={getUUID()}>{monster.name}{monster.name !== "" && `(${monster.level})`}</option>
                }) }
            </select>
        </div>
    );
}