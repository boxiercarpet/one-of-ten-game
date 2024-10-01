import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardPage from "./pages/dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import GamePage from "./pages/dashboard/game";

const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/dashboard/:gameId/*"
                                element={<GamePage />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>
);
