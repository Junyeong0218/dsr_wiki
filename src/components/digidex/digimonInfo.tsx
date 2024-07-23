import React from "react";
import { Digimon } from "../../classes";
import DigimonShortcut from "./digimonShortcut";
import DigimonStatus from "./digimonStatus";
import DigimonSkills from "./digimonSkills";
import { useNavigate } from "react-router-dom";
import DigimonEvaluation from "./digimonEvaluation";

type DigimonInfoProps = { selected: string }

export default function DigimonInfo({ selected }: DigimonInfoProps): React.ReactElement {
    const digimon = Digimon.getByName(selected);
    const navigate = useNavigate();

    if(!digimon) {
        navigate("/digimons/digidex");
        return <></>;
    }

    return (
        <div className="digimon-info">
            <DigimonShortcut digimon={digimon} />
            <DigimonStatus digimon={digimon} />
            <DigimonSkills digimon={digimon} containModal={true} />
            {/* <DigimonEvaluation digimon={digimon} /> */}
        </div>
    );
}