import React, { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maps from "./components/maps/Maps";
import CombinationSearcher from "./components/combination/Combination";
import Digidex from "./components/digidex/Digidex";
import EvolutionSearcher from "./components/evolution/EvolutionSearcher";
import Overflows from "./components/overflows/Overflows";
import Detectors from "./components/detector/Detector";
import Adjustments from "./components/adjustment/Adjustments";
import Potentials from "./components/potential/Potentials";
import Raids from "./components/raids/Raid";
import Guides from "./components/guides/Guides";
import Guide from "./components/guides/Guide";
import SkillSimulator from "./components/skillSimulator/SkillSimulator";
import BabySimulator from "./components/babySimulator/BabySimulator";
import TamerEquipmentSearcher from "./components/TamerEquipments/TamerEquipmentSearcher";
import dotenv from "dotenv";
import QuestViewer from "./components/quest/Quest";
import Calculator from "./components/calculator/Calculator";
import Experiences from "./components/experience/Experiences";
import RTDefense from "./components/randomTowerDefense/Defense";

export default function App(): React.ReactElement {
    return (
        <StrictMode>
            <BrowserRouter>
                <div id="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />

                        {/* <Route path="/guides" element={<Guides />} />
                        <Route path="/guides/:id" element={<Guide />} /> */}

                        <Route path="/digimons/digidex" element={<Digidex />} />
                        <Route path="/digimons/evolutions" element={<EvolutionSearcher />} />
                        <Route path="/digimons/experiences" element={<Experiences />} />

                        <Route path="/maps" element={<Maps />} />

                        <Route path="/dungeons/overflows" element={<Overflows />} />
                        <Route path="/dungeons/detectors" element={<Detectors />} />

                        <Route path="/tools/adjustments" element={<Adjustments />} />
                        <Route path="/tools/babies" element={<BabySimulator />} />
                        <Route path="/tools/potentials" element={<Potentials />} />
                        <Route path="/tools/skills" element={<SkillSimulator />} />
                        <Route path="/tools/quests" element={<QuestViewer />} />
                        <Route path="/tools/calculator" element={<Calculator />} />
                        {/* <Route path="/tools/minigame" element={<RTDefense />} /> */}

                        <Route path="/items/equipments/tamer" element={<TamerEquipmentSearcher />} />
                        <Route path="/items/combinations" element={<CombinationSearcher />} />
                        
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </StrictMode>
    );
}