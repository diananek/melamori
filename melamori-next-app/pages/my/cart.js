import React, {useEffect} from 'react';
import {Layout} from "../../components/reboot/Layout";
import {useDispatch, useSelector} from "../../lib/hooks/useState";
import {useLazyQuery, useMutation} from "@apollo/client";

import styles from '../../styles/pages/style.module.scss'
import GET_CART_ITEMS from '../../graphql/schemas/getCart.graphql'
import CREATE_ORDER from '../../graphql/schemas/createOrder.graphql'
import fp from "lodash/fp";
import {price_getter, priceDelimiter, ProductCard} from "../../components/reboot/ProductCard";
import clsx from "clsx";
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {mainState} from "../../lib/store/main";
import {actions} from "../../lib/store/main/actions";


export const cartMapper = (collection, price_collection, cart, name) => fp.pipe(
    fp.filter(['type', collection]),
    (arr) => arr.map((item, index) => {
        const newItem = fp.find(['id', item.id], cart)
        if (fp.isEmpty(newItem)) return null
        return {
            ...newItem,
            price_list: fp.find(
                [`${price_collection}.id`, item[name]],
                newItem.price_list
            ),
            key: {index, collection}
        }
    })
)


const types = {
    mattresses: 'size',
    soft_furniture: 'category',
    bed_collection: 'price',
    mattresses_accessories: 'price',
}

function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export const toPrices = {
    mattresses: "mattresses_prices",
    soft_furniture: "soft_furniture_prices",
    bed_collection: "bed_prices",
    mattresses_accessories: "accessories_prices",
}

const validator = yup.object({
    sign: yup.bool().test('sign', 'Требуется согласие', fp.eq(true)),
    phone: yup.string().required('Заполните номер телефона'),
    name: yup.string().required('Заполните имя'),
    city: yup.string().required('Заполните город')
})

const Cart = () => {

    const {push} = useRouter()

    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(validator)
    })

    const cartItems = useSelector('main.cart');
    const promo = useSelector('main.sub_data.promotion');

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

                remappedItems.ids.push(item.id)

                switch (item.type) {
                    case 'soft_furniture':
                        remappedItems.prices.push(item.category)
                        break;
                    case 'bed_collection':
                        remappedItems.prices.push(item.price)
                        break;
                    case 'mattresses':
                        remappedItems.prices.push(item.size)
                        break;
                    case 'mattresses_accessories':
                        remappedItems.prices.push(item.price)
                        break;

                }
            })
            if (!data) {
                (async () => await loadCartItems({
                    variables: remappedItems
                }))()
            }
        }
    }, [cartItems, data, loadCartItems, loading])


    const bed_collection = cartMapper
    ('bed_collection', 'bed_prices_id', data?.bed_collection, 'price')
    (cartItems)

    const mattresses = cartMapper
    ('mattresses', 'mattresses_prices_id', data?.mattresses, 'size')
    (cartItems)

    const soft_furniture = cartMapper
    ('soft_furniture', 'soft_furniture_prices_id', data?.soft_furniture, 'category')
    (cartItems)

    const mattresses_accessories = cartMapper
    ('mattresses_accessories', 'accessories_prices_id', data?.mattresses_accessories, 'price')
    (cartItems)


    const items = {
        bed_collection,
        mattresses,
        soft_furniture,
        mattresses_accessories
    }

    const calculatedResult = () => {
        let price = 0
        if (!loading && called) {
            cartItems.map(item => {

                let itemPrice = 0;

                const i = fp.find(['id', item.id], items[item.type]).price_list[price_getter[item.type].price]

                itemPrice += i.price - (i.price * i.sale_percentage / 100)
                const rawOpts = {
                    percent: 0,
                    add: 0
                }
                fp.find(['id', item.id], items[item.type]).additional_options.map(({additional_options_id}) => {
                    // console.log(additional_options_id)

                    rawOpts.percent += fp.isNumber(additional_options_id.percent) ? additional_options_id.percent : null
                    rawOpts.add += fp.isNumber(additional_options_id.price) ? additional_options_id.price : null
                })

                itemPrice += itemPrice * (rawOpts.percent / 100) - rawOpts.add
                price += itemPrice
            })
        }
        return price
    }

    const withoutSales = () => {
        let price = 0
        if (!loading && called) {
            cartItems.map(item => {

                let itemPrice = 0;

                const i = fp.find(['id', item.id], items[item.type]).price_list[price_getter[item.type].price]

                itemPrice += i.price

                const rawOpts = {
                    percent: 0,
                    add: 0
                }
                fp.find(['id', item.id], items[item.type]).additional_options.map(({additional_options_id}) => {
                    // console.log(additional_options_id)

                    rawOpts.percent += fp.isNumber(additional_options_id.percent) ? additional_options_id.percent : null
                    rawOpts.add += fp.isNumber(additional_options_id.price) ? additional_options_id.price : null
                })

                itemPrice += itemPrice * (rawOpts.percent / 100) - rawOpts.add
                price += itemPrice
            })
        }
        return price
    }


    const [orderReq] = useMutation(CREATE_ORDER)

    const dp = useDispatch();

    const createOrder = (data) => {
        const sendPrices = cartItems.map((i) => {
            const mapOpts = []
            fp.mapKeys((key) => {
                i.additional_options[key] && mapOpts.push({additional_options_id: key});
            }, i.additional_options)
            return {
                item_price_id: {
                    price: {
                        item: i[types[i.type]],
                        collection: toPrices[i.type]
                    },
                    choosen_additional_options: mapOpts
                }
            }
        })
        const promo = []
        fp.mapKeys((key) => {
            data.additional_options[key] && promo.push({promotion_id: key});
        }, data.additional_options)
        // debugger
        orderReq({
            variables: {
                ...data,
                promo,
                prices: sendPrices,
            }
        }).then(async (r) => {
            console.log(r)
            dp(mainState.actions.dropCart())
            await push('/my/success')
        })
    }

    const deleteItem = (index) => () => {
        let iterate = 0
        cartItems.forEach(({type}, i) => {
            if (type === index.collection) {
                if (index.index === iterate) {
                    dp(actions.deleteFromCart(i))
                } else
                    iterate += 1
            }
        })
    }

    return (
        <Layout hideSlider>
            <div className="container">
                <div className="page__name page__name_actions">
                    <h1 className="page__title">
                        Корзина
                    </h1>
                    <div className="page__goods-count">
                        {cartItems.length} {declOfNum(cartItems.length, ['товар', 'товара', 'товаров'])}
                    </div>
                </div>
                <div className={styles.cart}>
                    <section className={clsx("basket__catalog catalog", styles.cartGrid)}>
                        <div className="catalog__container container">
                            <div className="catalog__grid">
                                {(!called || loading)
                                    || (
                                        <>
                                            {cartMapper
                                            ('bed_collection', 'bed_prices_id', data?.bed_collection, 'price')
                                            (cartItems).map((card, key) => <ProductCard
                                                    style={styles.item}
                                                    item={card}
                                                    key={key}
                                                    deleteCallback={deleteItem(card.key)}
                                                />
                                            )}
                                            {cartMapper
                                            ('mattresses', 'mattresses_prices_id', data?.mattresses, 'size')
                                            (cartItems).map((card, key) => <ProductCard
                                                    style={styles.item}
                                                    item={card}
                                                    key={key}
                                                    deleteCallback={deleteItem(card.key)}
                                                />
                                            )}
                                            {cartMapper
                                            ('soft_furniture', 'soft_furniture_prices_id', data?.soft_furniture, 'category')
                                            (cartItems).map((card, key) => <ProductCard
                                                    style={styles.item}
                                                    item={card}
                                                    key={key}
                                                    deleteCallback={deleteItem(card.key)}
                                                />
                                            )}
                                            {cartMapper
                                            ('mattresses_accessories', 'accessories_prices_id', data?.mattresses_accessories, 'price')
                                            (cartItems).map((card, key) => <ProductCard
                                                    style={styles.item}
                                                    item={card}
                                                    key={key}
                                                    deleteCallback={deleteItem(card.key)}
                                                />
                                            )}
                                        </>
                                    )}
                            </div>
                        </div>
                    </section>
                    <form onSubmit={handleSubmit(createOrder)}
                          className={clsx('basket__order-section', styles.cartSidebar)}>
                        <div className="basket__block">
                            <div className="basket__dscr">
                                <div className="basket__total-price">
                                    {priceDelimiter(calculatedResult())}
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
                                            {withoutSales()}
                                        </span>
                                    </li>
                                    {/*<li className="discount__item">*/}
                                    {/*    <span className="discount__title">*/}
                                    {/*        Без скидки*/}
                                    {/*    </span>*/}
                                    {/*    <span className="discount__value">*/}
                                    {/*        200 000 ₽*/}
                                    {/*    </span>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                            <div className="basket__order-form">
                                <div>
                                    <label className="basket__form-label" htmlFor="user-tel">
                                        Ваш телефон
                                    </label>
                                    <input
                                        id="user-tel"
                                        className="basket__input"
                                        type="tel"
                                        placeholder="8 (123) 456–78–90"
                                        {...register('phone')}
                                    />
                                    <span style={{color: "red"}}>
                                        {errors?.phone?.message}
                                    </span>
                                </div>
                                <div>
                                    <label className="basket__form-label" htmlFor="user-tel">
                                        Имя
                                    </label>
                                    <input
                                        // id="user-tel"
                                        className="basket__input"
                                        type="text"
                                        placeholder="Иванов Иван"
                                        {...register('name')}
                                    />
                                    <span style={{color: "red"}}>
                                    {errors?.name?.message}
                                </span>
                                </div>
                                <div>
                                    <label className="basket__form-label" htmlFor="user-tel">
                                        Город
                                    </label>
                                    <input
                                        // id="user-tel"
                                        className="basket__input"
                                        type="text"
                                        placeholder="г. Пенза"
                                        {...register('city')}
                                    />
                                    <span style={{color: "red"}}>
                                    {errors?.city?.message}
                                </span>
                                </div>
                                <button className="basket__btn">
                                    Подтвердить заказ
                                </button>
                                <label className="basket__checkbox checkbox">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        {...register('sign')}
                                    />
                                    <span className="basket__checkbox-box checkbox__box"/>
                                    Я согласен на обработку моих персональных данных
                                </label>
                                <span style={{color: "red"}}>
                                        {errors?.sign?.message} <br/>
                                </span>
                            </div>
                        </div>
                        <div className={clsx('basket__block')}>
                            <div className="basket__block-name">
                                Бонусы
                            </div>
                            {promo.map((item) => (
                                    <label className="features__checkbox checkbox" key={item.id}>
                                        <input
                                            className="checkbox__input"
                                            type="checkbox"
                                            {...register(`additional_options.${item.id}`)}
                                        />
                                        <span className="checkbox__box"/>
                                        {item.description}
                                    </label>
                                )
                            )}

                        </div>
                        {/*<div className="basket__block">*/}
                        {/*    <div className="basket__block-name">*/}
                        {/*        Доп. услуги*/}
                        {/*    </div>*/}
                        {/*    <div className="basket__extra-form">*/}
                        {/*        <label className="basket__checkbox checkbox">*/}
                        {/*            <input*/}
                        {/*                className="checkbox__input"*/}
                        {/*                type="checkbox"*/}
                        {/*            />*/}
                        {/*            /!*{...register('opts.e')}*!/*/}
                        {/*            <span className="basket__checkbox-box checkbox__box"/>*/}
                        {/*            Сборка и установка*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
