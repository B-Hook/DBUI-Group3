import Home from "./components/Home/Home";
import { Surgery, Surgeons, Surgeries, Redirect} from "./components";

export const AuthorizedRoutes = () => [
    { path: '/', element: <Redirect />, exact: true },
    { path: '/surgeries', element: <Surgeries />, exact: true },
    { path: '/surgeons', element: <Surgeons />},
    { path: '/new-surgery', element: <Surgery /> },
    { path: '/surgeries/:id', element: <Surgery /> },
    { path: '/surgeries/:id/edit', element: <Surgery /> },
];