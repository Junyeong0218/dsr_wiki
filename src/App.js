import React from "react";
import { BrowserRouter, Link, Route, Router, Routes, useLocation } from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    return (
        <BrowserRouter>
            <div id="container">
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}