import {useState} from "react";
import {useAppContext} from "../context/state";
import classNames from "classnames";

export default function ProductCardFavoritesBtn({className, id}) {
    const ctx = useAppContext();
    let classNames = require('classnames');
    if(ctx.cookieFav) {
        let [isPressed, setPressed] = useState(ctx.cookieFav.includes(id) );

        let btnClass = classNames("product-card__fav", className, {
            "product-card__fav_active": isPressed
        })

        ctx.cookieFav.includes(id) ?? setPressed(true)

        const removeId = ()=> {
            const index = ctx.cookieFav.indexOf(id, 0)
            ctx.setCookieFav(ctx.cookieFav.slice(0, index).concat(ctx.cookieFav.slice(index+1)))
        }

        return(
            <button className={btnClass} onClick={()=>{
                const isActive = !isPressed
                setPressed(isActive)
                if(isActive) {
                    if(!ctx.cookieFav.includes(id)){
                        ctx.setCookieFav(ctx.cookieFav.concat(id))
                    }
                } else {
                    removeId()
                }

            }}> </button>
        )
    } else {
        let [isPressed, setPressed] = useState(false);

        let btnClass = classNames("product-card__fav", className, {
            "product-card__fav_active": isPressed
        })
        return(
            <button className={btnClass} onClick={()=>{
                setPressed(!isPressed)
            }}> </button>
        )
    }

}

