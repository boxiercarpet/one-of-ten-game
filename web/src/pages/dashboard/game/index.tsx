import { Route, Routes } from "react-router-dom";
import GamePanelPage from "./panel";
import GameEditPage from "./edit";

function GamePage() {
    return (
        <Routes>
            <Route path="/" element={<GamePanelPage />} />
            <Route path="/edit/*" element={<GameEditPage />} />
        </Routes>
    );
}

export default GamePage;
