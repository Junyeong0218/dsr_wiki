import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maps from "./components/maps/Maps";

export default function App() {
    return (
        <BrowserRouter>
            <div id="container">
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    {/* <Route path="/maps" element={<Maps />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}