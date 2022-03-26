import {createActionNamespace} from "../../utils/actions";


export const main = createActionNamespace('main');


export const actions = {
    initialLoaderFavorites: main('INITIAL_LOADER_FAVORITES'),
    addToFavorites: main('ADD_TO_FAVORITES'),
};
