import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import fp from "lodash/fp";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import {actions} from "../../../lib/store/main/actions";
import clsx from "clsx";


// TODO: add route for redirect

export const ProductCard = ({
                                item = {},
                            }) => {
    const dp = useDispatch();
    const favList = useSelector('main.favorites')
    // const isFavorite = fp.findIndex(fp.isEqual(`bed_collection/4bc81945-145a-4203-b3b1-da55a1426f86`), favList)
    const isFavorite = fp.findIndex(fp.isEqual(`${item.__typename}/${item.id}`), favList) > -1


    // debugger
    return (
        <article className="catalog__item product-card">
            <div className="product-card__img">
                <Link href={`/${item.id}`}>
                    <a href={`/${item.id}`}>
                        <Image
                            layout={'fill'}
                            src={`${process.env.serverUrl}/${fp.get('image.id', item)}`}
                            alt={fp.get('image.title', item)}
                        />
                    </a>
                </Link>
                <button className={"product-card__fav"}/>
                <div className="product-card__discount">
                    -10%
                </div>
            </div>
            <div className="product-card__prices">
                <div className="product-card__price product-card__price_cur">
                    125 550
                    <span>
                        ₽
                    </span>
                </div>
                <div className="product-card__price product-card__price_old">
                    238 990
                </div>
                <div className="product-card__discount">
                    -10%
                </div>
                <div className="product-card__size">
                    140 x 200
                </div>
            </div>
            <div className="product-card__dscr">
                <div className="product-card__name">
                    {item.title}
                </div>
                <div className="product-card__size">
                    140 x 200
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
