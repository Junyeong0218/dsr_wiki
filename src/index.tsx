import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

const container = document.querySelector("#app");
const root = createRoot(container!);

interface Adfit {
    display: (unit: string) => void;
    destroy: (unit: string) => void;
    refresh: (unit: string) => void;
}

declare global {
    interface Window {
        adfit?: Adfit;
    }
}

root.render(<App />);