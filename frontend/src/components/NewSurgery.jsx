import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { addAccount, getAccountById, updateAccount } from "../api";
// import { Department } from "../models";
import { TextField, SelectField, CheckboxField } from "./common";
// import { PhoneEditor } from "./PhoneEditor";
// import { PhoneList } from "./PhoneList";

export const NewSurgery = () => {
    // const departments = [
    //     new Department(1, "Marketing"),
    //     new Department(2, "HR"),
    //     new Department(3, "Accounting"),
    //     new Department(4, "IT")
    // ];

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

    const navigate = useNavigate();
    // const params = useParams();

    const mergeSurgery = delta => setSurgery({ ...surgery, ...delta });

    const handleSave = () => { /*addSurgery(surgery).then(x => navigate('/'));*/ };

    useEffect(() => {
            setSurgery({ });
    }, []);

    if (!surgery) {
        return <>Loading...</>;
    }

    return <>
        <div>
            <h1>New Surgery</h1>
            <TextField id="patientName"
                        label="Patient Name"
                        value={surgery.patientName}
                        setValue={ patientName => mergeSurgery({ patientName })} />
            <TextField id="staffNum"
                        label="Number of Staff Members Required"
                        value={surgery.staffNum}
                        setValue={staffNum => mergeSurgery({ staffNum })} />
            <TextField id="roomNum"
                        label="Room Number"
                        value={surgery.roomNum}
                        setValue={roomNum => mergeSurgery({ roomNum })} />
            <TextField id="weekNum"
                        label="Week Number"
                        value={surgery.weekNum}
                        setValue={weekNum => mergeSurgery({ weekNum })} />
            <SelectField id="specialization"
                        label="Specialization"
                        value={surgery.specialization}
                        setValue={specialization => mergeSurgery({ specialization })}
                        options={specializations} />
            <SelectField id="day"
                        label="Day"
                        value={surgery.day}
                        setValue={day => mergeSurgery({ day })}
                        options={days} />
            <SelectField id="time"
                        label="Time"
                        value={surgery.time}
                        setValue={time => mergeSurgery({ time })}
                        options={times} />
            <SelectField id="surgeon"
                        label="Surgeon"
                        value={surgery.surgeon}
                        setValue={surgeon => mergeSurgery({ surgeon })}
                        options={["getSurgeons"]} />
            <TextField id="notes"
                        label="Notes"
                        value={surgery.notes}
                        setValue={notes => mergeSurgery({ notes })} />
            <button type="button"
                className="btn btn-primary btn-lg col-12 mt-4"
                onClick={() => {handleSave();
                                navigate('/')}}>Create Surgery</button>
        </div>
    </>;
}