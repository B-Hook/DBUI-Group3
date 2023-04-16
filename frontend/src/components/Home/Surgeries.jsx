import { useState } from 'react';
import './Surgeries.css';

export const Surgeries = ({ list }) => {
    const [surgeries, setSurgeries] = useState(list);

    return <>
        <button type={"button"} onClick={setSurgeries(surgeries.filter(surgery => surgery.state.includes("pending")))}>Pending</button>
        <button type={"button"} onClick={setSurgeries(surgeries.filter(surgery => surgery.state.includes("accepted")))}>Accepted</button>
        <button type={"button"} onClick={setSurgeries(surgeries.filter(surgery => surgery.state.includes("rejected")))}>Rejected</button>
        <button type={"button"} onClick={setSurgeries(surgeries.filter(surgery => surgery.state.includes("no surgeon")))}>No Surgeon</button>

        <ul className={"list-group"}>
            {
                surgeries.map((surgery, index) =>
                    <li className={"rounded"} key={index}>
                        {surgery.sid}
                    </li>
                )
            }
        </ul>
    </>
}
