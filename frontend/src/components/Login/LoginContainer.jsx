import { useContext, useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function LoginContainer({type}) {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState();
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [valid, setValid] = useState(true);

    useEffect(()=>{
        if(appContext.userName){
            navigate("/");
        }},[]);

    const handleSubmit = async e => {
        e.preventDefault();

        const req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { username:userName, password:password, userType } )
        };

        try{

            const data = await fetch('http://localhost:8080/login', req)

            if (!data.ok) {
                throw new Error(`This is an HTTP error: The status is ${data.status}`);
            }

            let actualData = await data.json();
            appContext.setUserName(actualData.username);
            appContext.setUserType(actualData.userType);
            navigate("/");
        } catch (err) {
            console.log(err.message);
            setValid(false);
            document.getElementById("inputPassword"+type).classList.add("is-invalid");
            document.getElementById("inputPassword"+type).classList.remove("mb-3");
            document.getElementById("inputPassword"+type).classList.add("mb-2");
            document.getElementById("button"+type).classList.remove("mt-4");

        }
        
    }

    // document.body.style = 'background: red;';

    return (
        <div>
            <div className="card mt-5 text-start bg-dark text-info p-5">
                <div className="card-header"> 
                    <h2>{type} Login</h2>
                </div>
                <div className="card-body align-items-center">
                    <form onSubmit={handleSubmit}>
                        <label className=" form-label fs-4" htmlFor="inputUserName">
                            Username
                        </label>
                        <input id={"inputUserName"+type}className="form-control col-auto mb-4"type="text" onChange={e => setUserName(e.target.value)} />
                        <label className="col-auto form-label fs-4" htmlFor="inputPassword">
                            Password
                        </label>
                        <input id={"inputPassword"+type} className="form-control col-auto mb-3" type="password" onChange={e => setPassword(e.target.value)} />
                        {valid?<></>:
                        <div id={"inputPasswordFeedback"+type} className="text-danger mb-2">
                                Incorrect Username or Password
                        </div>
                        }
                        <button id={"button"+type} type="submit" className="btn bg-info text-dark btn-lg mt-4" onClick={e => setUserType(type)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginContainer;

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// };