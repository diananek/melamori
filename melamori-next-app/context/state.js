import {createContext, useContext, useEffect, useState} from 'react';
import Cookie from "js-cookie";

const AppContext = createContext();

export function AppWrapper({children}) {
    const [cookieFavId, setCookieFavId] = useState(undefined)
    const [cookieFav, setCookieFav] = useState([])
    const [cookieBasket, setCookieBasket] = useState(undefined)

    useEffect(() => {
        if (Cookie.get('site_consent')) {
            console.log(cookieFav)
            if (Cookie.get('favorites_id') === undefined) {
                Cookie.set('favorites_id', JSON.stringify([]), {
                    expires: 30
                })
                Cookie.set('favorites', JSON.stringify([]), {
                    expires: 30
                })
            }
            if (cookieFavId !== undefined) {
                Cookie.set('favorites_id', JSON.stringify(cookieFavId), {
                    expires: 30
                })
                Cookie.set('favorites', JSON.stringify(cookieFav), {
                    expires: 30
                })
            } else {
                setCookieFavId(JSON.parse(Cookie.get('favorites_id')))
                setCookieFav(JSON.parse(Cookie.get('favorites')))
            }
        }

    }, [cookieFavId, cookieFav])
    useEffect(() => {
        console.log(cookieBasket)
        if (Cookie.get('site_consent')) {
            if (Cookie.get('basket') === undefined) {
                Cookie.set('basket', JSON.stringify([]), {
                    expires: 30
                })
            }
            if (cookieBasket !== undefined) {
                Cookie.set('basket', JSON.stringify(cookieBasket), {
                    expires: 30
                })
            } else {
                setCookieBasket(JSON.parse(Cookie.get('basket')))
            }
        }

    }, [cookieBasket])

    return (
        <AppContext.Provider value={{cookieFavId, setCookieFavId, setCookieFav, cookieFav, cookieBasket, setCookieBasket}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}