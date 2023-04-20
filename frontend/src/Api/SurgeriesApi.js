export const getSurgeries = async () => {
    const res = await fetch('http://localhost:8080/surgeries');
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;
}

export const getSurgeryById = async (id) => {
    const res = await fetch(`http://localhost:8080/surgeries/${id}`);
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;
}

export const getSurgeriesBySurgeonId = async (surgeon_id) => {
    console.log(surgeon_id);
    const res = await fetch(`http://localhost:8080/surgeries/surgeon/${surgeon_id}`);
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;
}

export const createSurgery = async (surgery) => {
    
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( surgery )
    };

    const res = await fetch('http://localhost:8080/surgeries', req)
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;

}

export const editSurgery = async (surgery, id) => {
    
    const req = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( surgery )
    };

    const res = await fetch(`http://localhost:8080/surgeries/${id}`, req)
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;

}

export const deleteSurgery = async (id) => {

    const res = await fetch(`http://localhost:8080/surgeries/${id}`, {method: 'DELETE'})
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;

}