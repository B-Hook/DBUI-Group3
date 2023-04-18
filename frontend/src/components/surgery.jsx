import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { TextField, SelectField, TextAreaField } from "./common";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import _, { filter } from 'underscore';
import {Header} from './Header/Header';
import { getSurgeons, getSurgeries, getSurgeryById, createSurgery, editSurgery } from '../Api';

export const Surgery = () => {

    const times = [
        "Morning",
        "Afternoon",
        "Evening"
    ];

    const specializations = [
        "Neurological",
        "Obstetrics and Gynecology",
        "Oncology",
        "Ophthalmic",
        "Thoracic",
        "Trauma",
    ];

    const [ surgery, setSurgery ] = useState([]);
    const [ allSurgeries, setAllSurgeries] = useState([]);
    const [ allSurgeons, setAllSurgeons ] = useState([]);
    const [ filteredSurgeons, setfilteredSurgeons ] = useState([]);


    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() =>{

        getSurgeons().then(data => {
            const newData = data.map((surgeon) => {return { ...surgeon, full_name: `${surgeon.first_name} ${surgeon.last_name} - ${surgeon.specialty}`}});
            newData.sort((a,b) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))
            setAllSurgeons(newData);
        })
        .catch(error => console.error('Surgeons do not exist!', error));

        getSurgeries().then(data => setAllSurgeries(data))
                      .catch(error => console.error('Surgeries do not exist!', error))

        if (location.pathname === `/surgeries/${params.id}` || location.pathname ===  `/surgeries/${params.id}/edit`) {

            getSurgeryById(params.id).then(data => setSurgery(data))
                                        .catch(error => console.error('Surgery ID does not exist!', error));
        
        } 
        else {
            setSurgery({ });
        }

    },[]);

    useEffect(() =>{

        if (surgery.month !== undefined && surgery.day !== undefined && surgery.time !== undefined && surgery.specialty !== undefined){

            const filteredSurgeries = allSurgeries.filter(x => x.month === surgery.month && x.day === surgery.day && x.time === surgery.time && x.id !== surgery?.id);

            setfilteredSurgeons(allSurgeons.filter(x => {
                if (x.specialty !== surgery.specialty){
                    return false;
                }
                for (let y in filteredSurgeries) {
                    if (x.id === undefined || x.id === filteredSurgeries[y].surgeon_id)
                        return false;
                    }
                    return true;
            }))
        }

    },[surgery.month, surgery.day, surgery.time, surgery.specialty]);

    const mergeSurgery = delta => setSurgery({ ...surgery, ...delta });

    const handleSave = () =>{

        createSurgery(surgery).then(data => setSurgery(data))
                              .catch(error => console.error('Could not save surgery', error));

    };

    const handleEdit = async () => { 

        editSurgery(surgery, params.id).then(data => setSurgery(data))
                                       .catch(error => console.error('Could not save surgery', error));
        
    };

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
            return <div className="row align-items-start">
                        <div className="col">
                            <button type="button"
                                className="btn btn-secondary btn-lg col-12 mt-4"
                                onClick={() => {navigate('/')}}>Return To Home</button>
                        </div>
                        <div className="col">
                            <button type="button"
                                className="btn btn-info btn-lg col-12 mt-4"
                                onClick={() => {handleSave();
                                                navigate('/');}}>Create Surgery</button>
                        </div>
                    </div>
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
                                onClick={() => {handleEdit();
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
        <div className="collapse navbar-collapse" id="navbarText"> 
            <Header />
        </div>
        <div className="card-header row"> 
            <div className="col-10">{header()}</div>
            <button className="col navbar-toggler text-info" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-expanded="false">
                Toggle Nav
            </button>
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