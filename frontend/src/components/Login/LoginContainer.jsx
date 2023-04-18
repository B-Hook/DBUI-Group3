import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { authorizeLogin } from '../../Api';

export const LoginContainer = ({type}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState();
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [valid, setValid] = useState(true);

    useEffect(()=>{
        if(appContext.username){
            navigate("/");
        }},[]);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            let data = await authorizeLogin({ username, password, userType });
            appContext.setUsername(data.username);
            appContext.setUserType(data.userType);
            navigate("/");
        }
        catch (error) {
            console.log(error);
            setValid(false);
            document.getElementById("inputPassword"+type).classList.add("is-invalid");
            document.getElementById("inputPassword"+type).classList.remove("mb-3");
            document.getElementById("inputPassword"+type).classList.add("mb-2");
            document.getElementById("button"+type).classList.remove("mt-4");
        }
        
    }

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
                        <input id={"inputUserName"+type}className="form-control col-auto mb-4"type="text" onChange={e => setUsername(e.target.value)} />
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