import {useEffect} from "react";
import {useDispatch} from "../../../lib/hooks/useState";
import {actions} from "../../../lib/store/main/actions";

export const Middleware = () => {

    const dp = useDispatch();

    useEffect(() => {
        dp(actions.initialLoaderFavorites(localStorage.getItem('favorites')))
    }, [dp])

    return (<></>);
};
