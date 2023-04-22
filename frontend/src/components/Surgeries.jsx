import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSurgeries, getSurgeriesBySurgeonId, getSurgeons, deleteSurgery, editSurgery } from '../Api'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AppContext } from "../AppContext";
import { SelectField } from "./common"


export const Surgeries = () => {

    const [surgeries, setSurgeries] = useState([]);
    const [surgeons, setSurgeons] = useState([]);
    const [activeSurgeries, setActiveSurgeries] = useState([]);
    const [currentTab, setCurrentTab] = useState("all");

    const appContext = useContext(AppContext);

    const statusTypes = [
        "accepted",
        "completed",
        "pending",
        "rejected"
    ]

    useEffect(() =>{
        ((appContext.userType === "admin")?getSurgeries():getSurgeriesBySurgeonId(appContext.id)).then(data => {  
            const newData = data.map((surgery) => {return { ...surgery, timeInt: (surgery.time === "Morning")?1:(surgery.time === "Afternoon")?2:3}});          
            newData.sort((a,b) => (a.month > b.month) ? 1 : (b.month > a.month) ? -1 : 
                                  (a.day > b.day) ? 1 : (b.day > a.day) ? -1 : 
                                  (a.timeInt > b.timeInt) ? 1 : (b.timeInt > a.timeInt)? -1 : 0);
            setSurgeries(newData)
            //setActiveSurgeries(newData.filter(surgery => surgery.status.includes("pending") && surgery.surgeon_id !== null));
        })
        .catch(error => console.error('Sugeries do not exist!', error));

        getSurgeons().then(data => setSurgeons(data)).catch(error => console.error('Surgeons do not exist!', error));

        document.getElementById("0").style.backgroundColor = "var(--bs-dark)";
        
    }, []);

    const getSurgeonName = id => surgeons.filter(surgeon => surgeon.id === id).map(surgeon => `${surgeon.first_name} ${surgeon.last_name}`)
    

    const filterSurgeries = by => {
        if (by === "no surgeon"){
            setActiveSurgeries(surgeries.filter(surgery => surgery.surgeon_id === null && surgery.status !== "completed"));
        }
        else if (by === "all"){
            setActiveSurgeries(surgeries.filter(surgery => surgery.status !== "completed"));
        }
        else {
            setActiveSurgeries(surgeries.filter(surgery => surgery.status.includes(by) && surgery.surgeon_id !== null));
        }
        setCurrentTab(by);
    }

    useEffect(() => {

        filterSurgeries(currentTab);

    }, [surgeries])

    const updateColors = id => {
        var tabsNum = 5

        if (appContext.userType === "surgeon")
            tabsNum = 4;

        for (let i = 0; i <= tabsNum; ++i) {
            // change the active button to dark
            if (i.toString() === id) {
                document.getElementById(id).style.backgroundColor = "var(--bs-dark)";
            }
            // reset all other buttons
            else {
                document.getElementById(i.toString()).style.backgroundColor = "var(--bs-info)";
            }
        }
    }

    const handleDelete = (s) => {
        console.log(s.id)
        if (window.confirm(`Are you sure you want to delete ${s.id}?`)) {
            deleteSurgery(s.id).then(() => {
                setSurgeries(surgeries.filter(x => x.id !== s.id));
                // setActiveSurgeries(surgeries.filter(x => x.id !== s.id).filter(surgery => (currentTab === "no surgeon"? surgery.surgeon_id === null:surgery.status.includes(currentTab) && surgery.surgeon_id !== null)));
            });
        }
    };

    const changeStatus = (id, status) => {

        let curr_surgery = surgeries.find(s => s.id === id);
        
        editSurgery({ ...curr_surgery, status }, id).then(data => {let updated_surgeries = Object.values({...surgeries, [surgeries.findIndex(x => x.id === id)]:data});
                                                                       setSurgeries(updated_surgeries);})
                                                                       //setActiveSurgeries(updated_surgeries.filter(x => x.id !== id).filter(surgery => (currentTab === "no surgeon"? surgery.surgeon_id === null:surgery.status.includes(currentTab) && surgery.surgeon_id !== null)));})
                                                                       .catch(error => console.error('Could not save surgery', error));
    }

    const navigate = useNavigate();

    return <>
        <HelmetProvider>
            <Helmet>
                <style>{'body { background-color: var(--bs-dark); }'}</style>
            </Helmet>
        </HelmetProvider>
        <br/>
        <div className="container">
            {appContext.userType === "admin"?
                <h1 className="text-info">All Surgeries</h1>
            :
                <h1 className="text-info">{getSurgeonName(appContext.id)} - Surgeries </h1>
            }
            <div className="btn-group flex-wrap">
                <button type={"button"}
                        id={"0"}
                        className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                        onClick={() => {
                            updateColors("0");
                            filterSurgeries("all");
                        }}
                >All Scheduled</button>
                <button type={"button"}
                        id={"1"}
                        className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                        onClick={() => {
                            updateColors("1");
                            filterSurgeries("pending");
                        }}
                >Pending</button>

                <button type={"button"}
                        id={"2"}
                        className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                        onClick={() => {
                            updateColors("2");
                            filterSurgeries("accepted");
                        }}
                >Accepted</button>

                <button type={"button"}
                        id={"3"}
                        className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                        onClick={() => {
                            updateColors("3");
                            filterSurgeries("rejected");
                        }}
                >Rejected</button>

                {appContext.userType === "surgeon"?<></>:
                    <button type={"button"}
                            id={"5"}
                            className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                            onClick={() => {
                                updateColors("5");
                                filterSurgeries("no surgeon");
                            }}
                    >No Surgeon</button>
                }

                <button type={"button"}
                        id={"4"}
                        className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                        onClick={() => {
                            updateColors("4");
                            filterSurgeries("completed");
                        }}
                >Complete</button>
            </div>

            <ul className={"ps-0"}>
                {
                    activeSurgeries.map((surgery) =>
                        <li className="list-group-item" key={surgery.id}>
                            <div className="card bg-info text-dark mb-2">
                                <div className="card-header bg-dark d-flex">
                                    <h3 class="d-inline bg-dark text-info flex-grow-1">{surgery.month}/{surgery.day} - Patient: {surgery.patient_name}</h3>
                                    {surgery.status === "completed"?
                                        <h3 class="d-inline bg-dark text-light s-100">Complete</h3>
                                    :surgery.surgeon_id === null?
                                        <h3 class="d-inline bg-dark text-secondary s-100">No Surgeon</h3>
                                    :surgery.status === "pending"?
                                        <h3 class="d-inline bg-dark text-warning s-100">Pending</h3>
                                    :surgery.status === "accepted"?
                                        <h3 class="d-inline bg-dark text-success s-100">Accepted</h3>
                                    :surgery.status === "rejected"?
                                        <h3 class="d-inline bg-dark text-danger s-100">Rejected</h3>
                                    :<></>
                                    }
                                </div>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h5>Assigned Surgeon: {getSurgeonName(surgery.surgeon_id)}</h5>
                                            <h5>Surgery Type: {surgery.specialty}</h5>
                                            <h5>Time: {surgery.time}</h5>
                                            <h5>Duration: {surgery.duration} Minutes</h5>
                                            <h5>Operating Room: {surgery.room_num}</h5>
                                        </div>
                                        <div className="col">
                                            {appContext.userType === "surgeon" && surgery.status === "pending"?
                                            <>
                                                <button type={"button"}
                                                    className={"d-block btn btn-lg btn-dark col-12 mb-3"}
                                                    onClick={() => navigate(`${surgery.id}`)}>View & Edit</button>
                                                <button type={"button"}
                                                    className={"d-block btn btn-lg btn-success col-12 mb-3"}
                                                    onClick={() => changeStatus(surgery.id, "accepted")}>Accept</button>
                                                <button type={"button"}
                                                    className={"d-block btn btn-lg btn-danger col-12"}
                                                    onClick={() => changeStatus(surgery.id, "rejected")}>Reject</button>
                                            </>:
                                            appContext.userType === "surgeon" && surgery.status === "accepted"?
                                            <>
                                                <button type={"button"}
                                                    className={"d-block btn btn-lg btn-dark col-12 mb-3"}
                                                    onClick={() => navigate(`${surgery.id}`)}>View & Edit</button>
                                                <button type={"button"}
                                                    className={"d-block btn btn-lg btn-secondary col-12"}
                                                    onClick={() => changeStatus(surgery.id, "completed")}>Completed</button>
                                            </>
                                            :appContext.userType === "admin" && surgery.status !== "completed"?
                                            <>
                                                <button type={"button"}
                                                    className={"d-block btn btn-lg btn-dark col-12 mb-3"}
                                                    onClick={() => navigate(`${surgery.id}`)}>View & Edit</button>
                                                <button type={"button"}
                                                    className={"d-block btn btn-lg btn-danger col-12 mb-3"}
                                                    onClick={() => handleDelete(surgery)}>Delete</button>
                                                <div className="d-block">
                                                <SelectField id="status"
                                                    label="Status"
                                                    value={surgery.status}
                                                    setValue={status => changeStatus(surgery.id, status)}
                                                    options={statusTypes}
                                                    hideBlankOption={true}
                                                    inline={true}/></div>
                                            </>:<></>
                                        }
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
