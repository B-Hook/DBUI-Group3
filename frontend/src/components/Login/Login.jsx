import { LoginContainer } from "./LoginContainer"
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const Login = () => {
    return (
        <div>
            <header className="m-3 text-dark fs-1">
                <h1>Hosptial Scheduler</h1>
            </header>
            <HelmetProvider>
                <Helmet>
                    <style>{'body { background-color: var(--bs-info); }'}</style>
                </Helmet>
            </HelmetProvider>
            <div className="row w-100 m-0">
                <div className="col m-3 p-0">
                    <LoginContainer type="Surgeon"/>
                </div>
                <div className="col m-3 p-0">
                    <LoginContainer type="Admin"/>
                </div>
            </div>
        </div>
    )
}