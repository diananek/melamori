import {createActionNamespace} from "../../utils/actions";


export const main = createActionNamespace('main');


export const actions = {
    initialLoader: main('INITIAL_LOADER'),
    addToFavorites: main('ADD_TO_FAVORITES'),
    addToCart: main('ADD_TO_CART'),
    deleteFromCart: main('DELETE_FROM_CART'),
};
