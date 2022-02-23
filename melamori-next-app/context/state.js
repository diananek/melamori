import {createContext, useContext, useEffect, useState} from 'react';
import Cookie from "js-cookie";

const AppContext = createContext();

export function AppWrapper({ children}) {
    let [cookieFav, setCookieFav] = useState(undefined)
    let [cookieBasket, setCookieBasket] = useState(undefined)

    useEffect(()=> {
        if(Cookie.get('site_consent')) {
            if(Cookie.get('favorites') === undefined) {
                Cookie.set('favorites', JSON.stringify([]),{
                    expires: 30
                })
            }
            if (cookieFav !== undefined) {
                Cookie.set('favorites', JSON.stringify(cookieFav),{
                    expires: 30
                })
            } else {
                setCookieFav(JSON.parse(Cookie.get('favorites')))
            }
        }

    }, [cookieFav])
    useEffect(()=> {
        console.log(cookieBasket)
        if(Cookie.get('site_consent')) {
            if(Cookie.get('basket') === undefined) {
                Cookie.set('basket', JSON.stringify([]),{
                    expires: 30
                })
            }
            if (cookieBasket !== undefined) {
                Cookie.set('basket', JSON.stringify(cookieBasket),{
                    expires: 30
                })
            } else {
                setCookieBasket(JSON.parse(Cookie.get('basket')))
            }
        }

    }, [cookieBasket])

    return (
        <AppContext.Provider value={{cookieFav, setCookieFav, cookieBasket, setCookieBasket}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}