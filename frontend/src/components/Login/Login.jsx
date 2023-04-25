import { LoginContainer } from "./LoginContainer"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useContext, useEffect } from 'react';
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(appContext.username){
            navigate("/surgeries");
    }},[]);

    return (
        <div>
            <header className="m-3 text-dark fs-1">
                <h1>Hospital Scheduler</h1>
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