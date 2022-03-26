import React, {useReducer} from "react";

import {GenCtx} from '../../../lib/utils/state'
import {fromStateGetter, reducer} from "../../../lib/store";
import {Middleware} from "../Middleware";

export const GeneralCtx = ({
                               children,
                           }) => {

    const [state, dp] = useReducer(reducer, fromStateGetter('initState'));

    return (
        <GenCtx.Provider value={{state, dp}}>
            <Middleware/>
            {children}
        </GenCtx.Provider>
    )
}
