import React, {useEffect} from 'react';
import {Layout} from "../../components/reboot/Layout";
import {useSelector} from "../../lib/hooks/useState";
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


export const cartMapper = (collection, price_collection, cart, name) => fp.pipe(
    fp.getOr([], `data.${collection}`),
    fp.map((item) => (
            {
                ...item,
                price_list: fp.find(
                    [`${price_collection}.id`, fp.find(['id', item.id], cart)[name]],
                    item.price_list)
            }
        )
    )
)

const types = {
    mattresses: 'size',
    soft_furniture: 'category',
    bed_collection: 'price',
}

const toPrices = {
    mattresses: "mattresses_prices",
    soft_furniture: "soft_furniture_prices",
    bed_collection: "bed_prices",
}

const validator = yup.object({
    sign: yup.bool().test('sign', 'Требуется согласие', fp.eq(true)),
    phone: yup.string().required('Заполните номер телефона')
})

const Cart = () => {

    const {push} = useRouter()

    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(validator)
    })

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
    ('s', 'bed_prices_id', cartItems, 'price')
    ({data: {s: data?.bed_collection}})

    const mattresses = cartMapper
    ('s', 'mattresses_prices_id', cartItems, 'size')
    ({data: {s: data?.mattresses}})

    const soft_furniture = cartMapper
    ('s', 'soft_furniture_prices_id', cartItems, 'category')
    ({data: {s: data?.soft_furniture}})


    const items = {
        bed_collection,
        mattresses,
        soft_furniture,
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


    const [orderReq] = useMutation(CREATE_ORDER)

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
        orderReq({
            variables: {
                ...data,
                prices: sendPrices,
            }
        }).then(async (r) => {
            console.log(r)
            await push('/success')
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
                        {cartItems.length} товара
                    </div>
                </div>
                <div className={styles.cart}>
                    <section className={clsx("basket__catalog catalog", styles.cartGrid)}>
                        <div className="catalog__container container">
                            <div className="catalog__grid">
                                {(!called || loading)
                                    || cartItems?.map((i, key) => <ProductCard
                                        style={styles.item}
                                        item={fp.find(['id', i.id], items[i.type])}
                                        key={key}
                                    />)}
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
                            <div className="basket__order-form">
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
                            <div className="basket__extra-form">
                                <label className="basket__checkbox checkbox">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                    />
                                    {/*{...register('opts.e')}*/}
                                    <span className="basket__checkbox-box checkbox__box"/>
                                    Сборка и установка
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
