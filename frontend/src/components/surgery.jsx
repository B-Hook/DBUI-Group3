import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TextField, SelectField, TextAreaField } from "./common";

export const Surgery = () => {

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const times = [
        "Morning",
        "Afternoon",
        "Evening"
    ];

    const specializations = [
        "Bone",
        "Brain",
        "Ear",
        "Eye",
        "Heart",
        "Lungs",
        "Muscle"
    ];

    const [ surgery, setSurgery ] = useState(undefined);

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    // console.log(location.pathname);

    const mergeSurgery = delta => setSurgery({ ...surgery, ...delta });

    const handleSave = () => { /*addSurgery(surgery).then(x => navigate('/'));*/};

    useEffect(() => {
        if (location.pathname === "/surgery" || location.pathname ===  "/surgery/edit") {
            //getSurgeryById(params.suergeryId).then(x => setSurgery(x));
            console.log("Hiiiiii")
            setSurgery({
                patientName:"Bob",
                specialization:"Bone",
                staffNum:"5",
                roomNum:"B8",
                weekNum:"1",
                day:"Tuesday",
                time:"Afternoon",
                surgeon:"Braiden",
                notes:"Bob broke his leg"
            })
            //setSurgery({ });
        } else {
            setSurgery({ });
        }
    }, []);

    if (!surgery) {
        return <>Loading...</>;
    }

    const buttonSetup = () => {

        if (location.pathname === "/new-surgery"){
            return <button type="button"
                    className="btn btn-info btn-lg col-12 mt-4"
                    onClick={() => {handleSave();
                                    navigate('/')}}>Create Surgery</button>
        }
        else if (location.pathname === "/surgery") {
            return <div className="row align-items-start">
                        <div className="col">
                            <button type="button"
                                className="btn btn-secondary btn-lg col-12 mt-4"
                                onClick={() => {handleSave();
                                                navigate('/')}}>Return To Home</button>
                        </div>
                        <div className="col">
                            <button type="button"
                                className="btn btn-info btn-lg col-12 mt-4"
                                onClick={() => {handleSave();
                                                navigate('edit')}}>Edit</button>
                        </div>
                    </div>
        }
        else if (location.pathname === "/surgery/edit"){
            return <div className="row align-items-start">
                        <div className="col">
                            <button type="button"
                                className="btn btn-danger btn-lg col-12 mt-4"
                                onClick="window.history.back()">Cancel</button>
                        </div>
                        <div className="col">
                            <button type="button"
                                className="btn btn-info btn-lg col-12 mt-4"
                                onClick={() => {handleSave();}}>Save</button>
                        </div>
                    </div>
        }
    }

    return <div class="card bg-dark text-info rounded-0" style={{height: "100vh"}}>
        <div class="card-header"> 
            <h1>Surgery</h1>
        </div>
        <div class="card-body">
            <fieldset disabled={location.pathname === "/surgery"}>
                <div className="row align-items-start">
                    <div className="col">
                    <TextField id="patientName"
                                label="Patient Name"
                                value={surgery.patientName}
                                setValue={ patientName => mergeSurgery({ patientName })} />
                    </div>
                    <div className="col">
                    <SelectField id="specialization"
                                label="Specialization"
                                value={surgery.specialization}
                                setValue={specialization => mergeSurgery({ specialization })}
                                options={specializations} />
                    </div>
                    <div className="col">
                        <TextField id="staffNum"
                                    label="Number of Staff Members"
                                    value={surgery.staffNum}
                                    setValue={staffNum => mergeSurgery({ staffNum })} />
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col">
                        <TextField id="roomNum"
                                    label="Room"
                                    value={surgery.roomNum}
                                    setValue={roomNum => mergeSurgery({ roomNum })} />
                    </div>
                    <div className="col">
                        <TextField id="weekNum"
                                    label="Week"
                                    value={surgery.weekNum}
                                    setValue={weekNum => mergeSurgery({ weekNum })} />
                    </div>
                    <div className="col">
                        <SelectField id="day"
                                    label="Day"
                                    value={surgery.day}
                                    setValue={day => mergeSurgery({ day })}
                                    options={days} />
                    </div>
                    <div className="col">
                        <SelectField id="time"
                                    label="Time"
                                    value={surgery.time}
                                    setValue={time => mergeSurgery({ time })}
                                    options={times} />
                    </div>
                </div>
                {surgery.patientName && surgery.specialization && surgery.staffNum && surgery.roomNum && surgery.weekNum && surgery.day && surgery.time?
                    <div className="col-2">
                        <SelectField id="surgeon"
                                    label="Surgeon"
                                    value={surgery.surgeon}
                                    setValue={surgeon => mergeSurgery({ surgeon })}
                                    options={["Braiden"]} />
                    </div>
                    :<div className="p-3 mb-3 fs-6 bg-info text-dark rounded">
                        Enter the information above to select a surgeon!
                    </div> 
                }
                <TextAreaField id="notes"
                            label="Notes"
                            value={surgery.notes}
                            setValue={notes => mergeSurgery({ notes })} />
            </fieldset>
            {buttonSetup()}
        </div>
    </div>;
}