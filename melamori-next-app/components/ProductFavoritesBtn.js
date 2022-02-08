import {useState} from "react";

export default function ProductFavoritesBtn(props) {
    let [isPressed, setPressed] = useState(false);

    let classNames = require('classnames');
    let btnClass = classNames("product__favorites", props.className, {
        "product__favorites_active": isPressed
    })
    return(
        <button className={btnClass} onClick={()=>{setPressed(!isPressed)}}> <span> </span> </button>
    )
}