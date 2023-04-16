import Home from "./components/Home/Home";
import { Surgery, Surgeons, Header } from "./components";

export const AuthorizedRoutes = () => [
    { path: '/', element: <Home />, exact: true },
    { path: '/surgeons', element: <Surgeons />},
    { path: '/new-surgery', element: <Surgery /> },
    { path: '/surgeries/:id', element: <Surgery /> },
    { path: '/surgeries/:id/edit', element: <Surgery /> },
];