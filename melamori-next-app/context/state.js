import {createContext, useContext, useEffect, useState} from 'react';
import Cookie from "js-cookie";

const AppContext = createContext();

export function AppWrapper({children}) {
    const [cookieFavId, setCookieFavId] = useState(undefined)
    const [cookieBasketId, setCookieBasketId] = useState(undefined)

    const [cookieFav, setCookieFav] = useState([])
    const [cookieBasket, setCookieBasket] = useState([])

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
        if (Cookie.get('site_consent')) {
            if (Cookie.get('basket_id') === undefined) {
                Cookie.set('basket_id', JSON.stringify([]), {
                    expires: 30
                })
                Cookie.set('basket', JSON.stringify([]), {
                    expires: 30
                })
            }
            if (cookieBasketId !== undefined) {
                Cookie.set('basket_id', JSON.stringify(cookieBasketId), {
                    expires: 30
                })
                Cookie.set('basket', JSON.stringify(cookieBasket), {
                    expires: 30
                })
            } else {
                setCookieBasketId(JSON.parse(Cookie.get('basket_id')))
                setCookieBasket(JSON.parse(Cookie.get('basket')))
            }
        }

    }, [cookieBasketId, cookieBasket])

    return (
        <AppContext.Provider value={{cookieFavId, setCookieFavId, setCookieFav, cookieFav, cookieBasket,
            setCookieBasket,  cookieBasketId, setCookieBasketId}}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}