import React, {useEffect, useState} from 'react';
import {Layout} from "../../../components/reboot/Layout";
import {priceResult, Ssr} from "../../../lib/ssr";
import fp from "lodash/fp";
import {priceDelimiter} from "../../../components/reboot/ProductCard";
import {useForm} from "react-hook-form";
import clsx from "clsx";
import {actions} from "../../../lib/store/main/actions";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import {mainState} from "../../../lib/store/main";


const minPrice = fp.minBy(
    (item) => {
        const {price, sale_percentage} = fp.get('soft_furniture_prices_id', item);
        return priceResult({price, sale_percentage})
    }
)


const SoftId = props => {

    const [submitted, setSubmitted] = useState(false)

    const [calcPrice, setCalcPrice] = useState(minPrice(props.price_list).soft_furniture_prices_id)
    const [pricing, setPricing] = useState(calcPrice.price)
    const [sale, setSale] = useState(calcPrice.price * (1 - calcPrice.sale_percentage / 100))

    const {handleSubmit, setValue, watch, getValues} = useForm({
        defaultValues: {
            additional_options: {},
            category: null,
        }
    });

    const dp = useDispatch();

    const favList = useSelector('main.favorites');

    const isFavorite = fp.findIndex(fp.isEqual(`${props.__typename}/${props.id}`), favList) > -1


    useEffect(() => {
        const sub = watch((data) => {
            const newPrice = fp.find(['soft_furniture_prices_id.id', data.category], props.price_list).soft_furniture_prices_id
            setCalcPrice(newPrice)
            setPricing(newPrice.price)
            setSale(newPrice.price * (1 - newPrice.sale_percentage / 100))

        });
        return () => {
            sub.unsubscribe()
        }
    }, [props.price_list, watch])


    const onAdd = (data) => {
        setSubmitted(true)
        dp(mainState.actions.addToCart({
            ...data,
            category: data.category || calcPrice.id,
            id: props.id,
            type: props.__typename
        }))
    }

    return (
        <Layout hideSlider>
            <form onSubmit={handleSubmit(onAdd)} className="product">
                <div className="container product__grid product__grid_sofa">
                    <div className="product__img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`${process.env.serverUrl}${fp.get('image.id', props)}`}
                             alt={fp.get('image.title', props)}/>
                    </div>
                    <div className="product__dscr dscr">
                        <div className="dscr__grid">
                            <h2 className="product__title title">
                                {props.title}
                            </h2>
                            <div className="product__category">
                                Диван
                            </div>
                            <div className="product__prices">
                                <div className="product__price price price_cur">
                                    {priceDelimiter(sale)}
                                    <span>
                                        ₽
                                    </span>
                                </div>
                                {calcPrice.sale_percentage > 0 && <>
                                    <div className="product__price price price_old">
                                        {priceDelimiter(pricing)}
                                    </div>
                                    <div className="product__discount">
                                        -{calcPrice.sale_percentage}%
                                    </div>
                                </>}
                            </div>
                            <div className="product__actions">
                                <button className="product__btn">
                                    {
                                        submitted ? 'В корзине' :'Добавить в заказ'
                                    }
                                </button>
                                <button
                                    type={'button'}
                                    className={clsx('product__favorites', isFavorite && 'product__favorites_active')}
                                    onClick={() => dp(actions.addToFavorites(props))}
                                >
                                    <span/>
                                </button>
                            </div>
                        </div>
                        <div className="product__caution" data-da=".product__grid, 1920, 2">
                            <div className="container">
                                Вы оплачиваете товар только после разговора с менеджером. Оформляя заказ на сайте, вы
                                оставляете заявку на звонок
                            </div>
                        </div>
                    </div>

                    <div className="product__info info">
                        <div className="info__container ">
                            <p>18 месяцев гарантия</p>
                            <p>От 7-ми дней срок изготовления </p>
                            <a href="#" className="product__offer link "> Бесплатная консультация с менеджером</a>
                        </div>
                    </div>
                    <div className="product__features features">
                        <div className="features__item ">
                            <div className="features__name name">Категория ткани</div>
                            <div className="features__options ">
                                {/*<button className="features__option features__option_selected ">Первая</button>*/}
                                {props.price_list.map((item) => {
                                    return (
                                        <button
                                            key={item.soft_furniture_prices_id.id}
                                            type={'button'}
                                            className={clsx(
                                                "features__option",
                                                item.soft_furniture_prices_id.id === getValues('category') ? 'features__option_selected' : ''
                                            )}
                                            onClick={() => {
                                                setValue('category', item.soft_furniture_prices_id.id)
                                            }}
                                        >
                                            {item.soft_furniture_prices_id.soft_furniture_cloth_category_relation.category}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="product__props props">
                        <div className="props__item">
                            <div className="props__name">Ширина</div>
                            <div className="props__val">{calcPrice.soft_furniture_size_relation.width}</div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">Высота</div>
                            <div className="props__val">{calcPrice.soft_furniture_size_relation.height}</div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">Длина</div>
                            <div className="props__val">{calcPrice.soft_furniture_size_relation.length}</div>
                        </div>
                        {calcPrice.soft_furniture_size_relation.additional_size && <div className="props__item">
                            <div className="props__name">Размер в разложеном виде</div>
                            <div className="props__val">{calcPrice.soft_furniture_size_relation.additional_size}</div>
                        </div>}
                        <div className="props__item">
                            <div className="props__name">Дополнительно</div>
                            <div className="props__val" dangerouslySetInnerHTML={{__html: props.description}}/>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
}


export const getServerSideProps = async (ctx) => Ssr('sofa_by_id', ctx)

export default SoftId;