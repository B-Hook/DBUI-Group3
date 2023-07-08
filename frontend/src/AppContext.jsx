import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ username, setUsername ] = useState(localStorage.username);
    const [ userType, setUserType ] = useState(localStorage.userType);
    const [ id, setId ] = useState(localStorage.id);


    useEffect(() => {
        if(username) {
            localStorage.username = username;
        } else {
            delete localStorage.username; 
        }
    }, [ username ]);

    useEffect(() => {
        if(userType) {
            localStorage.userType = userType;
        } else {
            delete localStorage.userType; 
        }
    }, [ userType ]);

    useEffect(() => {
        if(id) {
            localStorage.id = id;
        } else {
            delete localStorage.id; 
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