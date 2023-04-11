import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { AuthorizedRoutes } from "./AuthorizedRoutes";
import { AuthorizedRoute } from "./components/common/AuthorizedRoute";

export const Router = () => <BrowserRouter>
    <Routes>
        <Route path="login" element={ <Login /> } />
        <Route element={<AuthorizedRoute />}>
            {
                AuthorizedRoutes().map((route, index) => <Route key={index} {...route} />)
            }
        </Route>
    </Routes>
</BrowserRouter>;