import {useState} from "react";
import {useAppContext} from "../context/state";
import classNames from "classnames";

// кнопка добавления в избранное для карточки товара в каталоге
export default function ProductCardFavoritesBtn({className, id, data}) {
    const ctx = useAppContext();

    let classNames = require('classnames');

    if(ctx.cookieFavId) {
        let [isPressed, setPressed] = useState(ctx.cookieFavId.includes(id) );

        let btnClass = classNames("product-card__fav", className, {
            "product-card__fav_active": isPressed
        })

        ctx.cookieFavId.includes(id) ?? setPressed(true)

        const removeId = ()=> {
            const index = ctx.cookieFavId.indexOf(id, 0)
            ctx.setCookieFavId(ctx.cookieFavId.slice(0, index).concat(ctx.cookieFavId.slice(index+1)))
        }

        return(
            <button className={btnClass} onClick={()=>{
                const isActive = !isPressed
                setPressed(isActive)
                if(isActive) {
                    if(!ctx.cookieFavId.includes(id)){
                        ctx.setCookieFavId(ctx.cookieFavId.concat(id))
                        ctx.setCookieFav(ctx.cookieFav.concat([data]))
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

