import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ username, setUsername ] = useState(sessionStorage.username);
    const [ userType, setUserType ] = useState(sessionStorage.userType);
    const [ id, setId ] = useState(sessionStorage.id);


    useEffect(() => {
        if(username) {
            sessionStorage.username = username;
        } else {
            delete sessionStorage.username; 
        }
    }, [ username ]);

    useEffect(() => {
        if(userType) {
            sessionStorage.userType = userType;
        } else {
            delete sessionStorage.userType; 
        }
    }, [ userType ]);

    useEffect(() => {
        if(id) {
            sessionStorage.id = id;
        } else {
            delete sessionStorage.id; 
        }
    }, [ id ]);

    // const appContext = useMemo(() => ({
    //     userName,
    //     setUserName
    // },
    // {   userType,
    //     setUserType
    // }), [ userType ]);

    return <AppContext.Provider value={{username, setUsername, userType, setUserType, id, setId}}>
        {children}
    </AppContext.Provider>

};