import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { TextField, SelectField, TextAreaField } from "./common";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import _, { filter } from 'underscore';

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
        "Muscle",
        "Rheumatology",
        "Dermatology",
        "Cardiology"
    ];

    const [ surgery, setSurgery ] = useState([]);
    const [ allSurgeries, setAllSurgeries] = useState([]);
    const [ allSurgeons, setAllSurgeons ] = useState([]);
    const [ filteredSurgeons, setfilteredSurgeons ] = useState([]);

    useEffect(() =>{


        fetch('http://localhost:8080/surgeons').then(async res => {
    
        if (!res.ok) {
            throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }

        const data = await res.json();

        const newData = data.map((surgeon) => {return { ...surgeon, full_name: `${surgeon.first_name} ${surgeon.last_name} - ${surgeon.specialty}`}});
        newData.sort((a,b) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))

        setAllSurgeons(newData);

        })
        .catch(error => {
            console.error('Surgeons do not exist!', error);
        });

        fetch('http://localhost:8080/surgeries').then(async res => {
    
        if (!res.ok) {
            throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }

        const data = await res.json();
        setAllSurgeries(data);
        })
        .catch(error => {
            console.error('Surgeries do not exist!', error);
        });

    },[]);

    // console.log(surgery);

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    // console.log(allSurgeons);

    // console.log(location.pathname);

    useEffect(() =>{

        // console.log("HIIIIIIII");

        if (surgery.month !== undefined && surgery.day !== undefined && surgery.time !== undefined){

            const filteredSurgeries = allSurgeries.filter(x => x.month === surgery.month && x.day === surgery.day && x.time === surgery.time && x.id !== surgery?.id);

            setfilteredSurgeons(allSurgeons.filter(x => {
                for (let y in filteredSurgeries) {
                    if (x.id === undefined || x.id === filteredSurgeries[y].surgeon_id)
                        return false;
                    }
                    return true;
            }))

            // console.log(filteredSurgeons);

        }

    },[surgery.month, surgery.day, surgery.time]);

    const mergeSurgery = delta => setSurgery({ ...surgery, ...delta });

    const handleSave = () =>{

        const req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(surgery)
        };

        console.log(req.body);

        fetch('http://localhost:8080/surgeries', req).then(async res => {
    
        if (!res.ok) {
            throw new Error(`The status is ${res.status}`);
        }

        const data = await res.json();

        setSurgery(data)

        })
        .catch(error => {
            console.error('Could not save surgery', error);
            navigate('/');
        });

    };

    const handleEdit = async () => { 

        // need put route for surgery in back end to do.

        const req = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {  } )
        };
        
        
        
        
        /*addSurgery(surgery).then(x => navigate('/'));*/};

    useEffect(() => {
        if (location.pathname === `/surgeries/${params.id}` || location.pathname ===  `/surgeries/${params.id}/edit`) {
            //getSurgeryById(params.suergeryId).then(x => setSurgery(x));

            // console.log("HIIIII")
            
            fetch(`http://localhost:8080/surgeries/${params.id}`)
            .then(async res => {
    
                if (!res.ok) {
                    throw new Error(`The status is ${res.status}`);
                }

                const data = await res.json();

                setSurgery(data)

            })
            .catch(error => {
                console.error('Surgery ID does not exist!', error);
                navigate('/');
            });
            //setSurgery({ });
        } else {
            setSurgery({ });
        }
    }, []);

    if (!surgery) {
        return <>Loading...</>;
    }

    const header = () => {
        if (location.pathname === "/new-surgery"){
            return <h1>Surgery - New </h1>
        }
        else if (location.pathname === `/surgeries/${params.id}`){
            return <h1>Surgery - View </h1>
        }
        else if (location.pathname === `/surgeries/${params.id}/edit`){
            return <h1>Surgery - Edit </h1>
        }
    }

    const buttonSetup = () => {

        if (location.pathname === "/new-surgery"){
            return <button type="button"
                    className="btn btn-info btn-lg col-12 mt-4"
                    onClick={() => {handleSave();
                                    navigate('/')}}>Create Surgery</button>
        }
        else if (location.pathname === `/surgeries/${params.id}`) {
            return <div className="row align-items-start">
                        <div className="col">
                            <button type="button"
                                className="btn btn-secondary btn-lg col-12 mt-4"
                                onClick={() => {navigate('/')}}>Return To Home</button>
                        </div>
                        <div className="col">
                            <button type="button"
                                className="btn btn-info btn-lg col-12 mt-4"
                                onClick={() => {navigate('edit')}}>Edit</button>
                        </div>
                    </div>
        }
        else if (location.pathname === `/surgeries/${params.id}/edit`){
            return <div className="row align-items-start">
                        <div className="col">
                            <button type="button"
                                className="btn btn-danger btn-lg col-12 mt-4"
                                onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                        <div className="col">
                            <button type="button"
                                className="btn btn-info btn-lg col-12 mt-4"
                                onClick={() => {console.log(surgery);
                                                handleSave();
                                                navigate(-1);}}>Save</button>
                        </div>
                    </div>
        }
    }

    return <div className="card bg-dark text-info rounded-0">
        <HelmetProvider>
            <Helmet>
                <style>{'body { background-color: var(--bs-dark); }'}</style>
            </Helmet>
        </HelmetProvider>
        <div class="card-header"> 
            {header()}
        </div>
        <div className="card-body">
            <fieldset disabled={location.pathname === `/surgeries/${params.id}`}>
                <div className="row align-items-start">
                    <div className="col">
                    <TextField id="patientName"
                                label="Patient Name"
                                value={surgery.patient_name}
                                setValue={ patient_name => mergeSurgery({ patient_name })} />
                    </div>
                    <div className="col">
                    <SelectField id="specialization"
                                label="Specialization"
                                value={surgery.specialty}
                                setValue={specialty => mergeSurgery({ specialty })}
                                options={specializations} />
                    </div>
                    <div className="col">
                        <TextField id="staffNum"
                                    label="Number of Staff Members"
                                    type="number"
                                    value={surgery.staff_num}
                                    setValue={staff_num => mergeSurgery({ staff_num })} />
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col">
                        <TextField id="roomNum"
                                    label="Room"
                                    value={surgery.room_num}
                                    setValue={room_num => mergeSurgery({ room_num })} />
                    </div>
                    <div className="col">
                        <TextField id="month"
                                    label="Month"
                                    type="number"
                                    value={surgery.month}
                                    setValue={month => mergeSurgery({ month })} />
                    </div>
                    <div className="col">
                        <TextField id="day"
                                    label="Day"
                                    type="number"
                                    value={surgery.day}
                                    setValue={day => mergeSurgery({ day })} />
                    </div>
                    <div className="col">
                        <SelectField id="time"
                                    label="Operation Time"
                                    type="number"
                                    value={surgery.time}
                                    setValue={time => mergeSurgery({ time })}
                                    options={times} />
                    </div>
                    <div className="col">
                        <TextField id="duration"
                                    label="Duration (in minutes)"
                                    type="number"
                                    value={surgery.duration}
                                    setValue={duration => mergeSurgery({ duration })}/>
                    </div>
                </div>
                {surgery.patient_name && surgery.specialty && surgery.staff_num && surgery.room_num && surgery.month && surgery.day && surgery.time && surgery.duration?
                    <div className="col-auto">
                        <SelectField id="surgeon"
                                    label="Surgeon"
                                    value={surgery.surgeon_id}
                                    setValue={surgeon_id => mergeSurgery({ surgeon_id })}
                                    options={filteredSurgeons}
                                    optionValueKey="id"
                                    optionLabelKey="full_name"/>
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
    </div>
}