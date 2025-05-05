import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MainState from "./Context/MainState.jsx";

createRoot(document.getElementById("root")).render(
    <MainState>
      <App />
    </MainState>
);
