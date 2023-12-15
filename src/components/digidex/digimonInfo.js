import React from "react";
import { Digimon } from "../../classes";
import DigimonShortcut from "./digimonShortcut";
import DigimonStatus from "./digimonStatus";
import DigimonSkills from "./digimonSkills";

export default function DigimonInfo({ selected }) {
    const digimon = Digimon.getByName(selected);

    return (
        <div className="digimon-info">
            <DigimonShortcut digimon={digimon} />
            <DigimonStatus digimon={digimon} />
            <DigimonSkills digimon={digimon} />
        </div>
    );
}