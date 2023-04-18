export const getSurgeons = async () => {
    const res = await fetch('http://localhost:8080/surgeons');
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;
}