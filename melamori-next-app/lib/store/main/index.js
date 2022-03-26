import {initState, reducer} from "./reducer";
import {actions, main} from "./actions";


export const mainState = {
    initState,
    reducer,
    actions,
    namespace: main('').namespace()
}
