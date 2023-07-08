export const authorizeLogin = async (params) => {
    
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( params )
    };

    const res = await fetch('https://ec2-3-134-103-222.us-east-2.compute.amazonaws.com/login', req)
    if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
    }
    let data = await res.json();
    return data;

}