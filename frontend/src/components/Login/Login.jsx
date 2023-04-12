import { useContext, useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Login() {
    const [userNameS, setUserNameS] = useState();
    const [passwordS, setPasswordS] = useState();
    const [userNameA, setUserNameA] = useState();
    const [passwordA, setPasswordA] = useState();
    const [userType, setUserType] = useState();
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(appContext.userName){
            navigate("/");
        }},[]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (userType === "surgeon"){

            // console.log(userNameS);

            const req = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { username:userNameS, password:passwordS, userType } )
            };

            const data = await fetch('http://localhost:8080/login', req).then(res => res.json());
            
            appContext.setUserName(data.userName);
            appContext.setUserType(data.userType);

            // console.log(appContext.userName);
            // localStorage.setItem('token', JSON.stringify(token));
            // setToken(token.token);

            navigate('/');

        }
        else{

            const req = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { username:userNameA, password:passwordA, userType } )
            };

            const data = await fetch('http://localhost:8080/login', req).then(res => res.json());

            appContext.setUserName(data.userName);
            appContext.setUserType(data.userType);

            // localStorage.setItem('token', JSON.stringify(token));
            // setToken(token.token);

            navigate('/');

        }
        
    }

    // document.body.style = 'background: red;';

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
                    <div className="card mt-5 text-start bg-dark text-info p-5">
                        <div className="card-header"> 
                            <h2>Surgeon Login</h2>
                        </div>
                        <div className="card-body align-items-center">
                            <form onSubmit={handleSubmit}>
                                <label className=" form-label fs-4" htmlFor="inputUserNameS">
                                    Username
                                </label>
                                <input id="inputUserNameS"className="form-control col-auto mb-2"type="text" onChange={e => setUserNameS(e.target.value)} />
                                <label className="col-auto form-label fs-4" htmlFor="inputPasswordS">
                                    Password
                                </label>
                                <input id="inputPasswordS"className="form-control col-auto mb-3"type="password" onChange={e => setPasswordS(e.target.value)} />
                                <div>
                                    <button type="submit" className="btn bg-info text-dark btn-lg" onClick={e => setUserType("surgeon")}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col m-3 p-0">
                    <div className="card mt-5 text-start bg-dark text-info p-5">
                        <div className="card-header"> 
                            <h2>Admin Login</h2>
                        </div>
                        <div className="card-body align-items-center">
                            <form onSubmit={handleSubmit}>
                                <label className=" form-label fs-4" htmlFor="inputUserNameS">
                                    Username
                                </label>
                                <input id="inputUserNameS"className="form-control col-auto mb-2"type="text" onChange={e => setUserNameA(e.target.value)} />
                                <label className="col-auto form-label fs-4" htmlFor="inputPasswordS">
                                    Password
                                </label>
                                <input id="inputPasswordS"className="form-control col-auto mb-3"type="password" onChange={e => setPasswordA(e.target.value)} />
                                <div>
                                    <button type="submit" className="btn bg-info text-dark btn-lg" onClick={e => setUserType("surgeon")}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// };