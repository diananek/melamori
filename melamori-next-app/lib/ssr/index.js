import {initializeApollo} from "./apollo";

import GET_BEDS from '../../graphql/schemas/getBeds.graphql'
import fp from "lodash/fp";

const client = initializeApollo();


const bedMapper = fp.pipe(
    fp.getOr([], 'data.bed_collection'),
    fp.map((item) => ({...item, price_list: fp.minBy('bed_prices_id.price', item.price_list) || null}))
)


const dataGetter = {
    home: async (params = {}) => {

        let response = await client.query({
            query: GET_BEDS,
            variables: {...params}
        })

        response = {
            meta: 12,
            items: bedMapper(response)
        }

        return response
    }
}



export const Ssr = async (page, { query }) => {

    return {
        props: dataGetter[page](query)
    }
}
