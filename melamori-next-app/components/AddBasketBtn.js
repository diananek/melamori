import {useState} from "react";
import {useAppContext} from "../context/state";
import "classnames";
import classNames from "classnames";
import {removeData} from "../lib/removeData";

export default function AddBasketBtn({className, id, data, price, size, sale, saleStatus}) {
    const ctx = useAppContext();
    if(ctx.cookieBasketId) {
        const [text, setText] = useState(ctx.cookieBasketId.includes(id) ? 'Убрать из заказа' : 'Добавить в заказ');
        let [isPressed, setPressed] = useState(ctx.cookieBasketId.includes(id));

        let btnClass = classNames(className, {
            [`${className}_active`]: isPressed
        })
        const removeId = ()=> {
            const index = ctx.cookieBasketId.indexOf(id, 0)
            ctx.setCookieBasketId(ctx.cookieBasketId.slice(0, index).concat(ctx.cookieBasketId.slice(index+1)))
        }

        return(
            <button className={btnClass} onClick={()=>{
                const isActive = !isPressed
                setPressed(isActive)
                setText('Убрать из заказа')
                if(isActive) {
                    if (!ctx.cookieBasketId.includes(id)) {
                        const BasketData = {
                            id : id,
                            imageId : data.image.id,
                            imageTitle : data.image.title,
                            title : data.title,
                            price : price,
                            sale : sale,
                            saleStatus : saleStatus,
                            size : size,
                        }
                        ctx.setCookieBasketId(ctx.cookieBasketId.concat(id))
                        ctx.setCookieBasket(ctx.cookieBasket.concat(
                            [BasketData]
                        ))
                    }
                } else {
                    removeId()
                    removeData(ctx.cookieBasket, id)
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
                const isActive = !isPressed
                setPressed(isActive)
                if(isActive) {
                    setText('Убрать из заказа')
                } else {
                    setText('Добавить в заказ')
                }

            }}>{text}</button>
        )
    }

}

