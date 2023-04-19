import { useState, useEffect } from 'react';
import {Header} from './Header/Header';
import { getSurgeons } from '../Api';

export const Surgeons = () => {


    const [surgeons, setSurgeons] = useState([]);

    useEffect(() =>{

        getSurgeons().then(data => {
            data.sort((a,b) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0));
            setSurgeons(data);
        })
        .catch(error => console.error('Surgeons do not exist!', error));
        
    }, []);

    return <>
        <ul className={"list-group"}>
            {
                surgeons.map((surgeon) =>
                    <li className="" key={surgeon.id}>
                        <div className="card">
                        <h5 className="card-header">{surgeon.first_name} {surgeon.last_name}</h5>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                    </li>
                )
            }
        </ul>
    </>
}