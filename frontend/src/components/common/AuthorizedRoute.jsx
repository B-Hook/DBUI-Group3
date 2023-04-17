import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header/Header";

export const AuthorizedRoute = () => {
    const appContext = useContext(AppContext);
    const location = useLocation();

    if (!appContext.userName) {
        return <Navigate to="/login" state={{ from: location.pathname }} />
    } else {
        return <div>
            <main>
                {/* <Header /> */}
                <Outlet />
            </main>
        </div>
    }

};