import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(loginInfo) {

    const req =  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
    }

    return fetch('http://localhost:8080/', req).then(res => res.json())
}

function Login( { setToken } ) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password,
            userType
        });
        setToken(token);
    }

    return(
        <div className="login-wrapper">
            <div className="surgeon-login">
                <h2>Surgeon Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
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
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}