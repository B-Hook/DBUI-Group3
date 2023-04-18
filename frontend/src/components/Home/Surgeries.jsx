import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Surgeries.css';

const updateColors = id => {
    for (let i = 1; i <= 5; ++i) {
        // change the active button to dark
        if (i.toString() === id) {
            document.getElementById(id).style.backgroundColor = "steelblue";
        }
        // reset all other buttons
        else {
            document.getElementById(i.toString()).style.backgroundColor = "#0dcaf0";
        }
    }
}

export const Surgeries = ({ list }) => {
    const [surgeries, setSurgeries] = useState(list.filter(surgery => surgery.state.includes("pending")));

    //TODO pending button not steelblue by default
    //document.getElementById("1").style.backgroundColor = "steelblue";

    const filterSurgeries = by => {
        setSurgeries(list.filter(surgery => surgery.state.includes(by)));
    }

    const navigate = useNavigate();

    return <>
        <br/>
        <div className={"mt-5 btn-group"}>
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

            <button type={"button"}
                    id={"4"}
                    className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                    onClick={() => {
                        updateColors("4");
                        filterSurgeries("no surgeon");
                    }}
            >No Surgeon</button>

            <button type={"button"}
                    id={"5"}
                    className={"btn btn-lg btn-info btn-outline-dark text-white fw-bold"}
                    onClick={() => {
                        updateColors("5");
                        filterSurgeries("completed");
                    }}
            >Complete</button>
        </div>

        <ul className={"list-group"}>
            {
                surgeries.map((surgery, index) =>
                    <li className={"list-group-item"} key={index}>
                        <span className={"fs-4"}>{surgery.date}</span>
                        <p className={"float-end"}>Time: {surgery.time}</p>
                        <p className={"clearfix"}></p>
                        <p className={"float-end"}>Duration: {surgery.duration}</p>
                        <p className={"clearfix"}></p>
                        <p className={"display-inline"}>{surgery.name}</p>
                        <button type={"button"}
                                className={"btn btn-primary badge"}
                                onClick={() => navigate(`app.com/surgeries/`${surgery.id})}
                        >Edit</button>
                    </li>
                )
            }
        </ul>
    </>
}
