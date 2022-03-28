import {initializeApollo} from "./apollo";

import GET_BEDS from '../../graphql/schemas/getBeds.graphql'
import GET_SOFA from '../../graphql/schemas/getSofa.graphql'
import GET_MATTRESSES from '../../graphql/schemas/getMattresses.graphql'
import fp from "lodash/fp";
import axios from 'axios'

const client = initializeApollo();


export const priceResult = ({sale_percentage, price}) => fp.isNumber(sale_percentage)
    ? fp.multiply(price, fp.divide(fp.subtract(100, sale_percentage), 100))
    : price

export const bedMapper = (collection, price_collection) => fp.pipe(
    fp.getOr([], `data.${collection}`),
    fp.map((item) => (
        {
            ...item,
            price_list: fp.minBy(
                (item) => {
                    const {price, sale_percentage} = fp.get(price_collection, item);

                    return priceResult({price, sale_percentage})
                },
                item.price_list) || null
        }))
)


// TODO: add request for generate other props (mattresses, soft_furniture).
// https://service.melamori-mebel.ru/items/bed_collection?meta=*&limit=0 url with meta example


const dataGetter = {
    home: async (params = {}) => {

        const remapped = fp.mapValues(fp.toInteger, params)
        let response = await client.query({
            query: GET_BEDS,
            variables: remapped
        })
        return {
            items: bedMapper('bed_collection', 'bed_prices_id')(response),
        }
    },
    bed_collection: async (params = {}) => {

        const remapped = fp.mapValues(fp.toInteger, params)
        let response = client.query({
            query: GET_BEDS,
            variables: remapped
        })
        let meta = axios.get('https://service.melamori-mebel.ru/items/bed_collection?meta=*&limit=0')

        response = {
            items: bedMapper('bed_collection', 'bed_prices_id')(await response),
            meta: (await meta).data.meta,
        }
        return response
    },
    mattresses: async (params = {}) => {

        const remapped = fp.mapValues(fp.toInteger, params)
        let response = client.query({
            query: GET_MATTRESSES,
            variables: remapped
        })

        let meta = axios.get('https://service.melamori-mebel.ru/items/mattresses?meta=*&limit=0')

        response = {
            items: bedMapper('mattresses', 'mattresses_prices_id')(await response),
            meta: (await meta).data.meta,
        }
        return response
    },
    soft_furniture: async (params = {}) => {

        const remapped = fp.mapValues(fp.toInteger, params)
        let response = client.query({
            query: GET_SOFA,
            variables: remapped
        })
        let meta = axios.get('https://service.melamori-mebel.ru/items/soft_furniture?meta=*&limit=0')

        response = {
            items: bedMapper('soft_furniture', 'soft_furniture_prices_id')(await response),
            meta: (await meta).data.meta,
        }
        return response
    },
}


export const Ssr = async (page, {query}) => {
    return {
        props: dataGetter[page](query)
    }
}
