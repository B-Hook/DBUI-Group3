import Home from "./components/Home/Home";
import { Surgery } from "./components/surgery";

export const AuthorizedRoutes = () => [
    { path: '/', element: <Home />, exact: true },
    { path: '/new-surgery', element: <Surgery /> },
    { path: '/surgeries/:id', element: <Surgery /> },
    { path: '/surgeries/:id/edit', element: <Surgery /> },
];