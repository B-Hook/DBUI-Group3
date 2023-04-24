import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams} from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { getSurgeons, deleteSurgeon, createSurgeon } from '../Api';
import { AppContext } from "../AppContext";
import { TextField, SelectField } from "./common"


export const Surgeons = () => {

    const blankSurgeon = {first_name:'',
                              last_name:'',
                              specialty:'',
                              username:'',
                              password:''
                        }; 

    const [surgeons, setSurgeons] = useState([]);
    const [newSurgeon, setNewSurgeon] = useState(blankSurgeon);
    const [valid, setValid] = useState(true);

    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    const specializations = [
        "Neurological",
        "Obstetrics and Gynecology",
        "Oncology",
        "Ophthalmic",
        "Trauma Surgery",
        "Spine"
    ];

    useEffect(()=>{
        if(appContext.userType === "surgeon"){
            navigate("/surgeries");
    }},[]);

    useEffect(() =>{

        getSurgeons().then(data => {
            data.sort((a,b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase()) ? 1 : ((b.last_name.toUpperCase() > a.last_name.toUpperCase()) ? -1 : 0));
            setSurgeons(data);
        })
        .catch(error => console.error('Surgeons do not exist!', error));
        
    }, []);

    const handleSave = () =>{
        
        createSurgeon(newSurgeon).then(data => mergeSurgeons(data))
                                 .then(()=>{setNewSurgeon(blankSurgeon);
                                            setValid(true);})
                                 .catch(error => {console.error('Could not save Surgeon', error);
                                 setValid(false);
                                 document.getElementById("textfieldusername").classList.remove("mb-3");
                                 mergeNewSurgeon({username:''});
                                });

    };

    const handleDelete = (s) => {
        console.log(s.id)
        if (window.confirm(`Are you sure you want to delete ${s.id}?`)) {
            deleteSurgeon(s.id).then(() => {
                setSurgeons(surgeons.filter(x => x.id !== s.id));
            });
        }
    };

    const mergeSurgeons = delta => {const _surgeons = [...surgeons];
                                    console.log(_surgeons);
                                    _surgeons.push(delta);
                                    _surgeons.sort((a,b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase()) ? 1 : ((b.last_name.toUpperCase() > a.last_name.toUpperCase()) ? -1 : 0));
                                    setSurgeons(_surgeons);}

    const mergeNewSurgeon = delta => setNewSurgeon({ ...newSurgeon, ...delta });

    const checkFields = () => newSurgeon.first_name && newSurgeon.last_name && newSurgeon.specialty && newSurgeon.username && newSurgeon.password;

    return <>
        <HelmetProvider>
            <Helmet>
                <style>{'body { background-color: var(--bs-dark); }'}</style>
            </Helmet>
        </HelmetProvider>
        <br/>
        <div className="container">
            <h1 className="text-info">Create Surgeon</h1>

            <div className="card border-info bg-dark text-info mb-2">
                <div className="card-body was-validated">
                    <div className="row">
                        <div className="col">
                            <TextField id="firstName"
                                    label="First Name"
                                    value={newSurgeon.first_name}
                                    setValue={ first_name => mergeNewSurgeon({ first_name })}
                                    isRequired={true}/>
                        </div>
                        <div className="col">
                            <TextField id="lastName"
                                    label="Last Name"
                                    value={newSurgeon.last_name}
                                    setValue={ last_name => mergeNewSurgeon({ last_name })}
                                    isRequired={true}/>
                        </div>
                        <div className="col">   
                            <SelectField id="specialization"
                                        label="Specialization"
                                        value={newSurgeon.specialty}
                                        setValue={specialty => mergeNewSurgeon({ specialty })}
                                        options={specializations}
                                        isRequired={true} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TextField id="username"
                                    label="Username"
                                    value={newSurgeon.username}
                                    setValue={ username => mergeNewSurgeon({ username })}
                                    isRequired={true}/>
                        {valid?<></>:
                        <div id="inputUsernameFeedback" className="text-danger mt-0 mb-0">
                                Username Exists
                        </div>
                        }
                        </div>
                        <div className="col">
                            <TextField id="password"
                                    label="Password"
                                    value={newSurgeon.password}
                                    setValue={ password => mergeNewSurgeon({ password })}
                                    isRequired={true}
                                    type="password"/>
                        </div>
                    </div>
                    <button type="button"
                                className="btn btn-info btn-lg col-12 mt-4"
                                onClick={() => {if (checkFields()){
                                                handleSave();}}}>Create Surgeon</button>
                </div>
            </div>

            
            <h1 className="text-info">All Surgeons</h1>
            <ul className={"ps-0"}>
                {
                    surgeons.map((surgeon) =>
                        <li className="list-group-item" key={surgeon.id}>
                            <div className="card bg-info text-dark mb-2">
                            <h3 className="card-header bg-dark text-info">{surgeon.first_name} {surgeon.last_name}</h3>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="p-1">
                                            <h5 className="fw-bold d-inline">Username: </h5>
                                            <h5 className="d-inline">@{surgeon.username}</h5>
                                        </div>
                                        <div className="p-1">
                                            <h5 className="fw-bold d-inline">Specialty: </h5>
                                            <h5 className="d-inline">{surgeon.specialty}</h5>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <button type={"button"}
                                                className="d-block btn btn-lg btn-dark col-12 mb-3" 
                                                onClick={()=>navigate(`${surgeon.id}/surgeries`)}>View {surgeon.first_name}'s Calendar</button>
                                        <button type={"button"}
                                                    className={"d-block btn btn-lg btn-danger col-12"}
                                                    onClick={() => handleDelete(surgeon)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    </>
}