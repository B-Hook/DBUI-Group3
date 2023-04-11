import Home from "./components/Home/Home";
import { NewSurgery } from "./components/NewSurgery";

export const AuthorizedRoutes = () => [
    { path: '/', element: <Home />, exact: true },
    { path: '/new-surgery', element: <NewSurgery /> },
];