import {useState} from "react";
import {useAppContext} from "../context/state";
import "classnames";
import classNames from "classnames";

export default function AddBasketBtn({className, id}) {
    const ctx = useAppContext();
    if(ctx.cookieBasket) {
        const [text, setText] = useState(ctx.cookieBasket.includes(id) ? 'Убрать из заказа' : 'Добавить в заказ');
        let [isPressed, setPressed] = useState(ctx.cookieBasket.includes(id));
        let btnClass = classNames(className, {
            [`${className}_active`]: isPressed
        })


        const removeId = ()=> {
            const index = ctx.cookieBasket.indexOf(id, 0)
            ctx.setCookieBasket(ctx.cookieBasket.slice(0, index).concat(ctx.cookieBasket.slice(index+1)))
        }

        return(
            <button className={btnClass} onClick={()=>{
                const isActive = !isPressed
                setPressed(isActive)
                setText('Убрать из заказа')
                if(isActive) {
                    if (!ctx.cookieBasket.includes(id)) {
                        ctx.setCookieBasket(ctx.cookieBasket.concat(id))
                    }
                } else {
                    removeId()
                    setText('Добавить в заказ')
                }

            }}>{text}</button>
        )
    } else {
        let [isPressed, setPressed] = useState(false);
        const [text, setText] = useState( isPressed === true ? 'Убрать из заказа' : 'Добавить в заказ');

        let btnClass = classNames( className, {
            "product__favorites_active": isPressed
        })

        return(
            <button className={btnClass} onClick={()=>{
                setPressed(!isPressed)
                if(isPressed) {
                    setText('Убрать из заказа')
                } else {
                    setText('Добавить в заказ')
                }

            }}>{text}</button>
        )
    }

}

