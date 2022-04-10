import {actions} from "./actions";
import fp from "lodash/fp";


export const initState = {
    favorites: [],
    cart: [],
    sub_data: {},
};


export const reducer = {
    [`${actions.initialLoader}`]: (state, payload) => {
        return {
            ...state,
            ...payload,
        }
    },
    [`${actions.addToFavorites}`]: (state, payload) => {

        const favorites = fp.xor(state.favorites, [`${payload.__typename}/${payload.id}`])

        localStorage.setItem('favorites', JSON.stringify(favorites))

        return {
            ...state,
            favorites
        }
    },
    [`${actions.addToCart}`]: (state, payload) => {

        const cart = [...state.cart, payload]
        localStorage.setItem('cartItems', JSON.stringify(cart))

        return {
            ...state,
            cart: cart
        }
    },
    [`${actions.deleteFromCart}`]: (state, payload) => {
        // localStorage.setItem('cartItems', JSON.stringify(cart))

        const removed = [
            ...fp.slice(0, payload, state.cart),
            ...fp.slice(payload + 1, state.cart.length, state.cart),
        ]
        localStorage.setItem('cartItems', JSON.stringify(removed))
        return {
            ...state,
            cart: removed
        }
    },
    [`${actions.dropCart}`]: (state) => {
        localStorage.setItem('cartItems', JSON.stringify([]))
        return {
            ...state,
            cart: []
        }
    },

}
