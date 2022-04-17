import {initializeApollo} from "./apollo";

import GET_BEDS from '../../graphql/schemas/getBeds.graphql'
import GET_SOFA from '../../graphql/schemas/getSofa.graphql'
import GET_MATTRESSES from '../../graphql/schemas/getMattresses.graphql'
import GET_BY_MATTRESS_ID from '../../graphql/schemas/getMattressesById.graphql'
import GET_BED_BY_ID from '../../graphql/schemas/getBedById.graphql'
import GET_SOFA_BY_ID from '../../graphql/schemas/getSofaById.graphql'
import GET_META from '../../graphql/schemas/getMeta.graphql'
import GET_MAIN_ITEMS from '../../graphql/schemas/getMainItems.graphql'
import fp from "lodash/fp";
import axios from 'axios'

const client = initializeApollo();


export const priceResult = ({sale_percentage, price}) => fp.isNumber(fp.toInteger(sale_percentage))
    ? fp.multiply(price, fp.divide(fp.subtract(100, sale_percentage), 100))
    : price

export const bedMapper = (collection, price_collection) => fp.pipe(
    fp.getOr([], `data.${collection}`),
    fp.map((item) => (
        {
            ...item,
            price_list: fp.minBy(
                (item) => {
                    const {price, sale_percentage, status} = fp.get(price_collection, item);

                    return status === 'active' ? priceResult({price, sale_percentage}): price
                },
                item.price_list) || null
        }))
)


const colToPrice = {
    bed_collection: 'bed_prices_id',
    soft_furniture: 'soft_furniture_prices_id',
    mattresses: 'mattresses_prices_id',
}


export const pricer = fp.map((raw) => {
        const {item} = raw
        return (
            {
                ...item,
                price_list: fp.minBy(
                    (i) => {
                        const {price, sale_percentage} = fp.get(colToPrice[raw.collection], i);

                        return priceResult({price, sale_percentage})
                    },
                    item.price_list) || null
            });
    }
)


// https://service.melamori-mebel.ru/items/bed_collection?meta=*&limit=0 url with meta example


const itemsMultiMapper = (resp) => {
    const incomingArray = fp.getOr([], 'data.main_page.popular', resp)


    // fp.partialRight(fp.includes, Object.keys(colToPrice))

    // const sp = fp.includes('bed_collection')

    // console.log(sp(['bed_collection', 'mattresses', 'soft_furniture']))
    let pricer1 = fp.filter(fp.pipe(
        fp.get('collection'),
        fp.includes,
        (func) => func(Object.keys(colToPrice))
    ), incomingArray);
    return pricer(pricer1)
}


const dataGetter = {
    home: async (params = {}) => {

        const remapped = fp.mapValues(fp.toInteger, params)
        let response = await client.query({
            query: GET_MAIN_ITEMS,
            variables: remapped,
            fetchPolicy: 'network-only',
            ssrMode: true,
        })
        return {
            items: itemsMultiMapper(response),
        }
    },
    bed_collection: async (params = {}) => {

        const remapped = fp.mapValues(fp.toInteger, params)
        let response = client.query({
            query: GET_BEDS,
            variables: remapped,
            fetchPolicy: 'network-only',
            ssrMode: true,
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
            variables: remapped,
            fetchPolicy: 'network-only',
            ssrMode: true,
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
            fetchPolicy: 'network-only',
            ssrMode: true,
            variables: remapped
        })
        let meta = axios.get('https://service.melamori-mebel.ru/items/soft_furniture?meta=*&limit=0')

        response = {
            items: bedMapper('soft_furniture', 'soft_furniture_prices_id')(await response),
            meta: (await meta).data.meta,
        }
        return response
    },
    mattresses_by_id: async (param = {}) => {
        return (await client.query({
            query: GET_BY_MATTRESS_ID,
            variables: param,
            fetchPolicy: 'network-only',
            ssrMode: true,
        })).data.mattresses_by_id
    },
    bed_by_id: async (param = {}) => {
        return (await client.query({
            query: GET_BED_BY_ID,
            variables: param,
            fetchPolicy: 'network-only',
            ssrMode: true,
        })).data.bed_collection_by_id
    },
    sofa_by_id: async (param = {}) => {
        return (await client.query({
            query: GET_SOFA_BY_ID,
            variables: param,
            fetchPolicy: 'network-only',
            ssrMode: true,
        })).data.soft_furniture_by_id
    },
    get_meta: async () => {
        return (await client.query({
            query: GET_META,
            fetchPolicy: 'network-only',
            ssrMode: true,
        })).data
    },
}


export const Ssr = async (page, {query} = {query: {}}) => {
    // debugger
    return {
        props: dataGetter[page](query)
    }
}
