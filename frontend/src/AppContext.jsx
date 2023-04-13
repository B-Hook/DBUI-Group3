import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ userName, setUserName ] = useState(localStorage.userName);
    const [ userType, setUserType ] = useState(localStorage.userType);

    useEffect(() => {
        if(userName) {
            localStorage.userName = userName;
        } else {
            delete localStorage.userName; 
        }
    }, [ userName ]);

    useEffect(() => {
        if(userType) {
            localStorage.userType = userType;
        } else {
            delete localStorage.userType; 
        }
    }, [ userType ]);

    // const appContext = useMemo(() => ({
    //     userName,
    //     setUserName
    // },
    // {   userType,
    //     setUserType
    // }), [ userType ]);

    return <AppContext.Provider value={{userName, setUserName, userType, setUserType}}>
        {children}
    </AppContext.Provider>

};