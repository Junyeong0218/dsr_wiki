import React, { StrictMode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
// import Raids from "./components/raids/Raid";
import Guides from "./components/guides/Guides";
import Guide from "./components/guides/Guide";
import SkillSimulator from "./components/skillSimulator/SkillSimulator";
import BabySimulator from "./components/babySimulator/BabySimulator";

export default function App(): React.ReactElement {
    return (
        <StrictMode>
            <BrowserRouter>
                <div id="container">
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/dsr" />} />
                    </Routes>
                    <Routes>
                        <Route path="/dsr/*" element={<Header />} />
                    </Routes>
                    <Routes>
                        <Route path="/dsr" element={<Main />} />

                        <Route path="/dsr/guides" element={<Guides />} />
                        <Route path="/dsr/guides/:id" element={<Guide />} />

                        <Route path="/dsr/digimons/digidex" element={<Digidex />} />
                        <Route path="/dsr/digimons/evolutions" element={<EvolutionSearcher />} />

                        <Route path="/dsr/maps" element={<Maps />} />

                        <Route path="/dsr/dungeons/overflows" element={<Overflows />} />
                        <Route path="/dsr/dungeons/detectors" element={<Detectors />} />

                        {/* <Route path="/raids" element={<Raids />} /> */}
                        
                        <Route path="/dsr/tools/adjustments" element={<Adjustments />} />
                        <Route path="/dsr/tools/babies" element={<BabySimulator />} />
                        <Route path="/dsr/tools/potentials" element={<Potentials />} />
                        <Route path="/dsr/tools/skills" element={<SkillSimulator />} />

                        <Route path="/dsr/items/combinations" element={<CombinationSearcher />} />

                        <Route path="/dsr/*" element={<NotFound />} />
                    </Routes>
                    <Routes>
                        <Route path="/dsr/*" element={<Footer />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </StrictMode>
    );
}