import React, { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maps from "./components/maps/Maps";
import Combination from "./components/combination/Combination";
import Digidex from "./components/digidex/Digidex";

export default function App() {
    return (
        <StrictMode>
            <BrowserRouter>
                <div id="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/maps" element={<Maps />} />
                        <Route path="/combinations" element={<Combination />} />
                        <Route path="/digidex" element={<Digidex />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </StrictMode>
    );
}