import {actions} from "./actions";
import fp from "lodash/fp";


export const initState = {
    favorites: [],
};


export const reducer = {
    [`${actions.initialLoaderFavorites}`]: (state, payload) => {
        return {
            ...state,
            favorites: JSON.parse(payload) || []
        }
    },
    [`${actions.addToFavorites}`]: (state, payload) => {

        const favorites = fp.xor(state.favorites, [`${payload.__typename}/${payload.id}`])

        localStorage.setItem('favorites', JSON.stringify(favorites))

        return {
            ...state,
            favorites
        }
    }
}
