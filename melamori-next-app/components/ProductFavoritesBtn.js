import {useState} from "react";
import {useAppContext} from "../context/state";
import classNames from "classnames";

export default function ProductFavoritesBtn({className, id, data}) {
    let classNames = require('classnames');

    const ctx = useAppContext();
    if(ctx.cookieFavId) {
        let [isPressed, setPressed] = useState(ctx.cookieFavId.includes(id) );

        let btnClass = classNames("product__favorites", className, {
            "product__favorites_active": isPressed
        })

        const removeId = ()=> {
            const index = ctx.cookieFavId.indexOf(id, 0)
            ctx.setCookieFavId(ctx.cookieFavId.slice(0, index).concat(ctx.cookieFavId.slice(index+1)))
        }

        return(
            <button className={btnClass} onClick={()=>{
                const isActive = !isPressed
                setPressed(isActive)
                console.log(ctx.cookieFavId)
                if(isActive) {
                    if(!ctx.cookieFavId.includes(id)){
                        ctx.setCookieFavId(ctx.cookieFavId.concat(id))
                        ctx.setCookieFav(ctx.cookieFav.concat([data]))
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