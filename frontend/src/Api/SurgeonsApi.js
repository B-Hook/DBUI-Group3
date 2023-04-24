export const getSurgeons = async () => {
    const res = await fetch('http://localhost:8080/surgeons');
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;
}

export const createSurgeon = async (surgeon) => {
    
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( surgeon )
    };

    const res = await fetch('http://localhost:8080/surgeons', req)
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;

}

export const deleteSurgeon = async (id) => {

    const res = await fetch(`http://localhost:8080/surgeons/${id}`, {method: 'DELETE'})
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;
}