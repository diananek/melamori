import {useEffect} from "react";
import {useDispatch} from "../../../lib/hooks/useState";
import {actions} from "../../../lib/store/main/actions";

export const Middleware = () => {

    const dp = useDispatch();

    useEffect(() => {
        dp(actions.initialLoader({
            favorites: JSON.parse(localStorage.getItem('favorites')) || [],
            cart: JSON.parse(localStorage.getItem('cartItems')) || []
        }))

        // dp(actions.addToCart({key: '0'}))
        // dp(actions.deleteFromCart(0))
    }, [dp])

    return (<></>);
};
