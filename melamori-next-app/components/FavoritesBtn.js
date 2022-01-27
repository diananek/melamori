import {useState} from "react";

export default function FavoritesBtn(props) {
    let [isPressed, setPressed] = useState(false);

    let classNames = require('classnames');
    let btnClass = classNames("product-card__fav", props.className, {
        "product-card__fav_active": isPressed
    })
    return(
        <button className={btnClass} onClick={()=>{setPressed(!isPressed)}}> </button>
    )
}