import {initializeApollo} from "./apollo";

import GET_BEDS from '../../graphql/schemas/getBeds.graphql'
import fp from "lodash/fp";

const client = initializeApollo();


const bedMapper = fp.pipe(
    fp.getOr([], 'data.bed_collection'),
    fp.map((item) => ({...item, price_list: fp.minBy('bed_prices_id.price', item.price_list) || null}))
)



// TODO: watch for show count pages.
// https://service.melamori-mebel.ru/items/bed_collection?meta=*&limit=0 url with meta example


const dataGetter = {
    home: async (params = {}) => {

        const remapped = fp.mapValues(fp.toInteger, params)
        let response = await client.query({
            query: GET_BEDS,
            variables: remapped
        })

        response = {
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
