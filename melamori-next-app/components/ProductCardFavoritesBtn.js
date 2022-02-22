import {useState} from "react";
import Cookie from "js-cookie";
import {useAppContext} from "../context/state";

export default function ProductCardFavoritesBtn({className, id}) {
    const ctx = useAppContext();

    let [isPressed, setPressed] = useState(ctx.cookieFav.includes(id) );

    let classNames = require('classnames');
    let btnClass = classNames("product-card__fav", className, {
        "product-card__fav_active": isPressed
    })
    if(Cookie.get('site_consent')) {
        ctx.cookieFav.includes(id) ?? setPressed(true)
    }
    const removeId = ()=> {
        const index = ctx.cookieFav.indexOf(id, 0)
        ctx.setCookieFav(ctx.cookieFav.slice(0, index).concat(ctx.cookieFav.slice(index+1)))
    }

    return(
        <button className={btnClass} onClick={()=>{
            const isActive = !isPressed
            setPressed(isActive)
            console.log(ctx.cookieFav)
            if(isActive) {
                if(!ctx.cookieFav.includes(id)){
                    ctx.setCookieFav(ctx.cookieFav.concat(id))
                }
            } else {
                removeId()
            }

        }}> </button>
    )
}

