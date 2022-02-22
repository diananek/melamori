import {createContext, useContext, useEffect, useState} from 'react';
import Cookie from "js-cookie";

const AppContext = createContext();

export function AppWrapper({ children}) {
    let [cookieFav, setCookieFav] = useState(undefined)

    useEffect(()=> {
        console.log(cookieFav)
        if (cookieFav !== undefined) {
            Cookie.set('favorites', JSON.stringify(cookieFav),{
                expires: 30
            })
        } else {
            setCookieFav(JSON.parse(Cookie.get('favorites')))
        }
    }, [cookieFav])

    return (
        <AppContext.Provider value={{cookieFav, setCookieFav}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}