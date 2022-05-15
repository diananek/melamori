import React, {useEffect, useState} from 'react';
import {useSelector} from "../../lib/hooks/useState";
import {Layout} from "../../components/reboot/Layout";
import clsx from "clsx";
import styles from "../../styles/pages/catalog.module.scss";
import fp from "lodash/fp";
import {useLazyQuery} from "@apollo/client";
import GET_FAVORITES from '../../graphql/schemas/getFavorites.graphql'
import {ProductCard} from "../../components/reboot/ProductCard";
import {bedMapper} from "../../lib/ssr";


function Favorites() {

    const [params] = useState({})

    const links = useSelector('main.favorites')

    const [request, {loading, data: rawData}] = useLazyQuery(GET_FAVORITES)

    useEffect(() => {
        fp.mapValues(null, links);
        links.forEach((string) => {
            const [collection, id] = string.split('/')
            fp.isArray(params[collection])
                ? params[collection].push(id)
                : params[collection] = [id];
        })
        if (!loading && links['length'] > 0) {
            (async () => await request({variables: params}))()
        }
    }, [rawData, links, links.length, loading, params, request])


    const bed_collection = bedMapper
    ('s', 'bed_prices_id')
    ({data: {s: rawData?.bed_collection || []}})

    const soft_furniture = bedMapper
    ('s', 'soft_furniture_prices_id')
    ({data: {s: rawData?.soft_furniture || []}})

    const mattresses = bedMapper
    ('s', 'mattresses_prices_id')
    ({data: {s: rawData?.mattresses || []}})

    const mattresses_accessories = bedMapper
    ('s', 'accessories_prices_id')
    ({data: {s: rawData?.mattresses_accessories || []}})


    const items = {
        bed_collection,
        soft_furniture,
        mattresses,
        mattresses_accessories
    }


    return (
        <Layout hideSlider>
            <div className="catalog">
                <div className="catalog__container container">
                    <div className={clsx(styles.margin, "catalog__title")}>
                        Избранное
                        <span className={styles.inactive}>
                            {` ${links['length']} товаров`}
                        </span>
                    </div>
                    <div className="catalog__grid">
                        {
                            (loading || fp.isEmpty(rawData)) || <>
                                {links.map((item => {
                                    const position = item.split('/');
                                    return <ProductCard item={fp.find({id: position[1]}, items[position[0]])} key={item}/>
                                }))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Favorites;
