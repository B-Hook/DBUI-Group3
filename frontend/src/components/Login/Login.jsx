import { useContext, useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

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

    return (
        <div>
            <div className="surgeon-login">
                <h2>Surgeon Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserNameS(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPasswordS(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit" onClick={e => setUserType("surgeon")}>Submit</button>
                    </div>
                </form>
            </div>
            <div className="admin-login">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserNameA(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPasswordA(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit" onClick={e => setUserType("admin")}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// };