import React from 'react';
import Link from 'next/link'
import Image from 'next/image'


export const ProductCard = ({
                          // item = {},
                      }) => {
    return (
        <article className="catalog__item product-card">
            <div className="product-card__img">
                <Link href={'/'}>
                    <a href={"/"}>
                        <Image
                            layout={'fill'}
                            src="/img/product/product_similar/Bed-Afina.png"
                            alt="Кровать Афина"/>
                    </a>
                </Link>
                <button className={"product-card__fav"}/>
                <div className="product-card__discount">-10%</div>
            </div>
            <div className="product-card__prices">
                <div className="product-card__price product-card__price_cur">125
                    550 <span>₽</span>
                </div>
                <div className="product-card__price product-card__price_old">238 990</div>
                <div className="product-card__discount">-10%</div>
                <div className="product-card__size">140 x 200</div>
            </div>
            <div className="product-card__dscr">
                <div className="product-card__name">Афина</div>
                <div className="product-card__size">140 x 200</div>
            </div>
            <div className="product-card__actions">
                <button className="product-card__add">Добавить в заказ</button>
                <button className="product-card__fav product-card__fav_grey"/>
            </div>
        </article>
    );
};
