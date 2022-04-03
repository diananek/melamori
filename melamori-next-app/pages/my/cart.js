import React, {useEffect} from 'react';
import {Layout} from "../../components/reboot/Layout";
import {useSelector} from "../../lib/hooks/useState";
import {useLazyQuery} from "@apollo/client";

import styles from '../../styles/pages/style.module.scss'
import GET_CART_ITEMS from '../../graphql/schemas/getCart.graphql'
import fp from "lodash/fp";
import {ProductCard} from "../../components/reboot/ProductCard";
import clsx from "clsx";


export const cartMapper = (collection, price_collection, cart) => fp.pipe(
    fp.getOr([], `data.${collection}`),
    fp.map((item) => (
            {
                ...item,
                price_list: fp.find(
                    [`${price_collection}.id`, fp.find(['id', item.id], cart)?.size],
                    item.price_list)
            }
        )
    )
)


const Cart = () => {

    const cartItems = useSelector('main.cart');

    const [loadCartItems, {data, loading, called}] = useLazyQuery(GET_CART_ITEMS)

    useEffect(() => {
        if (cartItems.length > 0 && !loading) {
            const remappedItems = {
                ids: [],
                prices: [],
                options: []
            }
            cartItems.forEach((item) => {
                fp.mapKeys((key) => {
                    item.additional_options[key] && remappedItems.options.push(key);
                }, item.additional_options)

                remappedItems.prices.push(item.size)
                remappedItems.ids.push(item.id)
            })
            // console.log(remappedItems)
            if (!data) {
                (async () => await loadCartItems({
                    variables: remappedItems
                }))()
            }
        }
    }, [cartItems, data, loadCartItems, loading])


    const bed_collection = cartMapper
    ('s', 'bed_prices_id', cartItems)
    ({data: {s: data?.bed_collection}})
    const mattresses = cartMapper
    ('s', 'mattresses_prices_id', cartItems)
    ({data: {s: data?.mattresses}})

    const items = {
        bed_collection,
        mattresses,
    }

    console.log(items)

    return (
        <Layout hideSlider>
            <div className="container">
                <div className="page__name page__name_actions">
                    <h1 className="page__title">
                        Корзина
                    </h1>
                    <div className="page__goods-count">
                        {cartItems.length} товара
                    </div>
                </div>
                <div className={styles.cart}>
                    <section className={clsx("basket__catalog catalog", styles.cartGrid)}>
                        <div className="catalog__container container">
                            <div className="catalog__grid">
                                {(!called || loading)
                                    || cartItems?.map(i => <ProductCard
                                        style={styles.item}
                                        item={fp.find(['id', i.id], items[i.type])}
                                        key={i.id}
                                    />)}
                            </div>
                        </div>
                    </section>
                    <section className={clsx('basket__order-section', styles.cartSidebar)}>
                        <div className="basket__block">
                            <div className="basket__dscr">
                                <div className="basket__total-price">
                                    114 190
                                    <span>
                                        ₽
                                    </span>
                                </div>
                                <ul className="basket__discount discount">
                                    <li className="discount__item">
                                        <span className="discount__title">
                                            Без скидки
                                        </span>
                                        <span className="discount__value">
                                            200 000 ₽
                                        </span>
                                    </li>
                                    <li className="discount__item">
                                        <span className="discount__title">
                                            Без скидки
                                        </span>
                                        <span className="discount__value">
                                            200 000 ₽
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <form action="#" className="basket__order-form">
                                <label className="basket__form-label" htmlFor="user-tel">
                                    Ваш телефон
                                </label>
                                <input
                                    id="user-tel"
                                    className="basket__input"
                                    type="tel"
                                    placeholder="8 (123) 456–78–90"
                                />
                                <button className="basket__btn">
                                    Подтвердить заказ
                                </button>
                                <label className="basket__checkbox checkbox">
                                    <input className="checkbox__input" type="checkbox"/>
                                    <span className="basket__checkbox-box checkbox__box"/>
                                    Я согласен на обработку моих персональных данных
                                </label>
                            </form>
                        </div>
                        <div className="basket__block">
                            <div className="basket__block-name">
                                Бонусы
                            </div>
                            <div className="basket__block-text">
                                5% скидка на матрац при покупке кровати
                            </div>
                            <div className="basket__block-text">
                                18 месяцев гарантия на всё
                            </div>
                        </div>
                        <div className="basket__block">
                            <div className="basket__block-name">
                                Доп. услуги
                            </div>
                            <form className="basket__extra-form">
                                <label className="basket__checkbox checkbox">
                                    <input className="checkbox__input" type="checkbox"/>
                                    <span className="basket__checkbox-box checkbox__box"/>
                                    Сборка и установка
                                </label>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
