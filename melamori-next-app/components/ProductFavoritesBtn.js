import {useState} from "react";
import {useAppContext} from "../context/state";
import classNames from "classnames";

export default function ProductFavoritesBtn({className, id}) {
    let classNames = require('classnames');

    const ctx = useAppContext();
    if(ctx.cookieFav) {
        let [isPressed, setPressed] = useState(ctx.cookieFav.includes(id) );

        let btnClass = classNames("product__favorites", className, {
            "product__favorites_active": isPressed
        })

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

            }}> <span> </span> </button>
        )
    } else {
        let [isPressed, setPressed] = useState(false);

        let btnClass = classNames("product__favorites", className, {
            "product__favorites_active": isPressed
        })
        return(
            <button className={btnClass} onClick={()=>{
                setPressed(!isPressed)
            }}> <span> </span> </button>
        )
    }
}