import React, { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maps from "./components/maps/Maps";
import CombinationSearcher from "./components/combination/Combination";
import Digidex from "./components/digidex/Digidex";
import LeftFitAd from "./components/ads/LeftFitAd";
import RightFitAd from "./components/ads/RightFitAd";
import EvolutionSearcher from "./components/evolution/EvolutionSearcher";
import Overflows from "./components/overflows/Overflows";
import Detectors from "./components/detector/Detector";
import Adjustments from "./components/adjustment/Adjustments";
import Potentials from "./components/potential/Potentials";

export default function App(): React.ReactElement {
    return (
        <StrictMode>
            <BrowserRouter>
                <div id="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/evolutions" element={<EvolutionSearcher />} />
                        <Route path="/maps" element={<Maps />} />
                        <Route path="/overflows" element={<Overflows />} />
                        {/* <Route path="/detectors" element={<Detectors />} /> */}
                        <Route path="/adjustments" element={<Adjustments />} />
                        <Route path="/potentials" element={<Potentials />} />
                        <Route path="/combinations" element={<CombinationSearcher />} />
                        <Route path="/digidex" element={<Digidex />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </StrictMode>
    );
}