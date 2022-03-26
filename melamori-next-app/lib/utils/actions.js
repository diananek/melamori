import fp from 'lodash/fp';



const createAction = (type) => Object.assign(
    ($payload) => {
        return ({type, $payload});
    },
    {
        toString: () => type,
        namespace: () => type.split('/')[0]
    }
);


export const createActionNamespace = namespace => (type) => createAction(`${namespace}/${type}`);


const unfoldReducer = fp.pipe(
    fp.mapValues(s => fp.isFunction(s) ? s : unfoldReducer(s)),
);
