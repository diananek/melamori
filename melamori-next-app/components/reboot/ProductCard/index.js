import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import fp from "lodash/fp";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import {actions} from "../../../lib/store/main/actions";
import clsx from "clsx";
import {priceResult} from "../../../lib/ssr";


export const priceDelimiter = (price) => {
    let formatted = fp
        .toString((price.toFixed(2)))
        .split("")


    let counter = 3
    return fp.reduceRight(
        (curr, prev) => {
            if (counter / 3 === 1) {
                counter = 1
                return `${curr} ${prev}`;
            } else {
                counter += 1
                return `${curr}${prev}`;
            }
        },
        '',
        formatted
    )
}

const toStringSizes = fp.cond([
    [fp.getOr(false, 'diameter'), ({
                                       diameter,
                                   }) => `${diameter} x ${diameter}`],
    [fp.constant(true), (x) => `${(x?.length)} x ${(x?.width)}`]

])

const price_getter = {
    soft_furniture: {
        price: 'soft_furniture_prices_id',
        size: 'soft_furniture_size_relation'
    },
    mattresses: {
        price: 'mattresses_prices_id',
        size: 'mattress_size_relation'
    },
    bed_collection: {
        price: 'bed_prices_id',
        size: 'bed_size_relation'
    }
}


export const ProductCard = ({
                                item = {},
                                style = ''
                            }) => {

    const types = price_getter[item.__typename]
    const pl = item.price_list[types.price];

    const sale_percentage = fp.get('sale_percentage', pl)
    const price = fp.get('price', pl)

    const sizes = fp.get(`price_list.${types.price}.${types.size}`, item);

    const dp = useDispatch();
    const favList = useSelector('main.favorites')
    const isFavorite = fp.findIndex(fp.isEqual(`${item.__typename}/${item.id}`), favList) > -1

    return (
        <article className={clsx(style, "catalog__item product-card")}>
            <div className="product-card__img">
                <Link href={`/catalog/${item.__typename}/${item.id}`}>
                    <a href={`/catalog/${item.__typename}/${item.id}`}>
                        <Image
                            layout={'fill'}
                            src={`${process.env.serverUrl}/${fp.get('image.id', item)}`}
                            alt={fp.get('image.title', item)}
                        />
                    </a>
                </Link>
                <button className={"product-card__fav"}/>
                {sale_percentage && <div className="product-card__discount">
                    -{sale_percentage}%
                </div>}
            </div>
            <div className="product-card__prices">
                <div className="product-card__price product-card__price_cur">
                    {priceDelimiter(priceResult({sale_percentage, price}))}
                    {/*{delimiter(23234243224.23)}*/}
                    <span>
                        ₽
                    </span>
                </div>
                {sale_percentage && <div className="product-card__price product-card__price_old">
                    {priceDelimiter(price)}
                </div>}
                {sale_percentage && <div className="product-card__discount">
                    -{sale_percentage}%
                </div>}
                <div className="product-card__size">
                    {toStringSizes(sizes)}
                </div>
            </div>
            <div className="product-card__dscr">
                <div className="product-card__name">
                    {item.title}
                </div>
                <div className="product-card__size">
                    {toStringSizes(sizes)}
                </div>
            </div>
            <div className="product-card__actions">
                <button className="product-card__add">
                    Добавить в заказ
                </button>
                <button
                    className={clsx(
                        'product-card__fav product-card__fav_grey',
                        isFavorite && 'product-card__fav_active'
                    )}
                    onClick={() => dp(actions.addToFavorites(item))}
                />
            </div>
        </article>
    );
};
