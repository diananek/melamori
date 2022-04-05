import React, {useReducer} from "react";

import {GenCtx} from '../../../lib/utils/state'
import {fromStateGetter, reducer} from "../../../lib/store";
import {Middleware} from "../Middleware";
import fp from "lodash/fp";

export const GeneralCtx = ({
                               children,
                               props = {}
                           }) => {

    const [state, dp] = useReducer(reducer, fp.merge(props, fromStateGetter('initState')));

    return (
        <GenCtx.Provider value={{state, dp}}>
            <Middleware/>
            {children}
        </GenCtx.Provider>
    )
}
