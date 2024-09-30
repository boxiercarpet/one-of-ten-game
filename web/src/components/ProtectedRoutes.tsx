import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectToken } from "../store/auth";

function ProtectedRoutes() {
    const token = useSelector(selectToken);
    const location = useLocation();

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
    );
}

export default ProtectedRoutes;
