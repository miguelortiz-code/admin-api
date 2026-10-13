import { createContext, useState } from "react";

const CRMContext =  createContext([{}, () => {}]);

const CRMProvider = props =>{
    
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        return {
            token: token || '',
            auth: token ? true : false
        };
    });

    return(
        <CRMContext.Provider value={[auth, setAuth]}>
            {props.children}
        </CRMContext.Provider>
    )
}

export {CRMContext, CRMProvider};