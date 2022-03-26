import fp from "lodash/fp";

import {mainState} from "./main";



export const stateBundle = {
    mainState
}


export const fromStateGetter = (type) => {
    const typeGetter = fp.get(type)
    switch (type) {
        case "initState":
            return fp.reduce((p, c) => ({...p, [`${c.namespace}`]: typeGetter(c)}), {}, stateBundle);
        case "namespace":
            return fp.reduce(
                (p, c) => ({...p, [typeGetter(c)]: Object.keys(p).length}),
                {},
                stateBundle);
        case "reducer":
            return fp.reduce((p, c) => ({...typeGetter(p), ...typeGetter(c)}), {}, stateBundle);
        default:
            throw 'Unused type!'
    }
}


export const reducer = (state, action) => {
    const namespace = action.type.split('/')[0];

    const r = fromStateGetter('reducer');

    console.log(state, action)
    return {
        ...state,
        [`${namespace}`]: r[`${action.type}`](state[namespace], action.$payload),
    };
};
