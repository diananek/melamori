import {Layout} from "../../../components/reboot/Layout";
import {priceResult, Ssr} from "../../../lib/ssr";
import fp from "lodash/fp";
import clsx from "clsx";
import {actions} from "../../../lib/store/main/actions";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {priceDelimiter} from "../../../components/reboot/ProductCard";
import {mainState} from "../../../lib/store/main";
import {Image} from "antd";
import 'antd/dist/antd.css'
import {BackIcon} from "../../../components/reboot/icons";


const minPrice = fp.minBy((item) => {
    const {price, sale_percentage} = fp.get('bed_prices_id', item);
    return priceResult({price, sale_percentage})
})


const BedItem = (props) => {

    const [submitted, setSubmitted] = useState(false)

    const [calcPrice] = useState(minPrice(props.price_list).bed_prices_id)
    const [pricing, setPricing] = useState(calcPrice.price)
    const [sale, setSale] = useState(calcPrice.price * (1 - calcPrice.sale_percentage / 100))


    const {watch, getValues, handleSubmit, setValue} = useForm({
        defaultValues: {
            additional_options: {},
            size: calcPrice.bed_size_relation.id,
            category: calcPrice.bed_cloth_category_relation.id,
            price: calcPrice.id
        }
    });

    const filterOpts = useMemo(() => ({
        size: props.price_list.map(i => {
            return {
                id: i.bed_prices_id.id,
                relation: i.bed_prices_id.bed_size_relation.id,
                other: i.bed_prices_id.bed_cloth_category_relation.id,
                name: i.bed_prices_id.bed_size_relation.sleep_size
            }
        }), category: props.price_list.map(i => {
            return {
                id: i.bed_prices_id.id,
                relation: i.bed_prices_id.bed_cloth_category_relation.id,
                other: i.bed_prices_id.bed_size_relation.id,
                name: i.bed_prices_id.bed_cloth_category_relation.category
            }
        })

    }), [props])

    const [options, setOptions] = useState(filterOpts)

    useEffect(() => {
        const sub = watch((data) => {
            // console.log(data.price)
            data.size ? setOptions({
                ...filterOpts, category: fp.filter(['other', data.size], filterOpts.category)
            }) : setOptions({...options, category: filterOpts.category})
            data.category ? setOptions({
                ...filterOpts, size: fp.filter(['other', data.category], filterOpts.size)
            }) : setOptions({...options, size: filterOpts.size})
        })
        return () => {
            sub.unsubscribe();
        }
    }, [filterOpts, options, watch])


    const dp = useDispatch();

    const favList = useSelector('main.favorites');

    const isFavorite = fp.findIndex(fp.isEqual(`${props.__typename}/${props.id}`), favList) > -1

    useEffect(() => {
        const sub = watch(({additional_options, size, category}) => {

            // console.log(size, category, price)
            const addToPrice = (num) => {
                let addition = {
                    raw: 0, percent: 0,
                }
                fp.mapKeys(i => {
                    if (additional_options[i]) {
                        const opt = fp.find(['additional_options_id.id', i], props.additional_options).additional_options_id
                        addition.raw += opt.price
                        addition.percent += opt.percentage
                    }
                }, additional_options)

                return num + num * (addition.percent / 100) + addition.raw
            }

            const priceId = fp.find({
                bed_prices_id: {
                    bed_cloth_category_relation: {
                        id: category
                    },
                    bed_size_relation: {
                        id: size
                    }
                },
            }, props.price_list).bed_prices_id

            console.log(priceId.price * (1 - priceId.sale_percentage / 100), priceId)

            setSale(addToPrice(priceId.price * (1 - priceId.sale_percentage / 100)))
            setPricing(addToPrice(priceId.price))

        })
        return () => {
            sub.unsubscribe()
        }
    }, [getValues, props.additional_options, props.price_list, watch])


    const onAdd = (data) => {
        setSubmitted(true)
        const priceId = fp.find({
            bed_prices_id: {
                bed_cloth_category_relation: {
                    id: data.category
                },
                bed_size_relation: {
                    id: data.size
                }
            },
        }, props.price_list).bed_prices_id
        dp(mainState.actions.addToCart({
            ...data, price: priceId.id || calcPrice.id, id: props.id, type: props.__typename
        }))
    }


    const decorator = fp.filter(['additional_options_id.option_type', 'decoration'], props.additional_options)
    const currentSize = fp.find(['bed_prices_id.id', getValues('price')], props.price_list).bed_prices_id.bed_size_relation


    return (<Layout hideSlider>
        <form onSubmit={handleSubmit(onAdd)} className="product">
            <div className={'back'}>
                <BackIcon />
            </div>
            <div className="container product__grid">
                <div className="product__img" style={{position: 'relative', width: '100%', height: '100%'}}>
                    <Image
                        // layout='fill'
                        // objectFit='contain'
                        src={`${process.env.serverUrl}${fp.get('image.id', props)}`}
                        alt={fp.get('image.title', props)}/>
                </div>
                <div className="product__dscr dscr">
                    <div className="dscr__grid">
                        <h2 className="product__title title">
                            {props.title}
                        </h2>
                        <div className="product__category">
                            Кровать
                        </div>
                        <div className="product__prices">
                            <div className="product__price price price_cur">
                                {priceDelimiter(sale)}
                                <span>
                                        ₽
                                    </span>
                            </div>
                            {(calcPrice.sale_percentage > 0 && calcPrice.status === 'active') && <>
                                <div className="product__price price price_old">
                                    {priceDelimiter(pricing)}
                                </div>
                                <div className="product__discount">
                                    -{calcPrice.sale_percentage}%
                                </div>
                            </>}
                        </div>
                        <div className={'product__prices'} style={{ marginTop: '80px'}}>
                            {props.sale_remaining > 0 && `Осталось по акции: ${props.sale_remaining}`}
                        </div>
                        <div className="product__actions">
                            <button className="product__btn">
                                {submitted ? 'В корзине' : 'Добавить в заказ'}
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
                </div>
                <div className="product__caution" data-da=".product__grid, 1920, 2">
                    <div className="container">
                        Вы оплачиваете товар только после разговора с менеджером. Оформляя заказ на сайте, вы
                        оставляете заявку на звонок
                    </div>
                </div>
                <div className="product__info info">
                    <div className="info__container ">
                        <p>18 месяцев гарантия</p>
                        <p>Срок изготовления: от 2 недель </p>
                        <p className="product__offer link" onClick={() => dp(actions.openModal())}>
                            Бесплатная консультация с менеджером
                        </p>
                    </div>
                </div>
                <form className="product__features features">
                    <div className="features__item ">
                        <div className="features__name name">Размер спального места</div>
                        <div className="features__options">
                            {fp.uniqBy('relation', options.size).map(i => {
                                const current = getValues('size')
                                return (<button
                                    key={i.id}
                                    type={'button'}
                                    className={clsx("features__option", current === i.relation ? 'features__option_selected' : '')}
                                    onClick={() => {
                                        // setValue('price', i.id)
                                        setValue('size', i.relation)
                                    }}
                                >
                                    {i.name}
                                </button>)
                            })}
                        </div>
                    </div>
                    <div className="features__item ">
                        <div className="features__name name">Категория ткани</div>
                        <div className="features__options ">
                            {fp.uniqBy('relation', options.category).map(i => {
                                const current = getValues('category')
                                return (<button
                                    key={i.id}
                                    type={'button'}
                                    className={clsx("features__option", current === i.relation ? 'features__option_selected' : '')}
                                    onClick={() => {
                                        setValue('category', i.relation)
                                    }}
                                >
                                    {i.name}
                                </button>)
                            })}
                        </div>
                    </div>

                    {decorator.length > 1 &&
                        (<div className="features__item ">
                            <div className="features__name name">
                                Украшения
                            </div>
                            <div className="features__options ">
                                {decorator
                                    .map(({additional_options_id: opt}) => {
                                        const opts = getValues('additional_options');
                                        return (<button
                                            key={opt.id}
                                            type={'button'}
                                            className={clsx("features__option", opts[opt.id] ? 'features__option_selected' : '')}
                                            onClick={() => {
                                                setValue(`additional_options.${opt.id}`, !opts[opt.id])
                                                // setValue('category', i.relation)
                                            }}
                                        >
                                            {opt.title}
                                        </button>)
                                    })}
                            </div>
                        </div>)}
                </form>
                <div className="product__props props">
                    <div className="props__item ">
                        <div className="props__item ">
                            <div className="props__name ">
                                Ширина
                            </div>
                            <div className="props__val props__bed_val">{currentSize.width}</div>
                        </div>
                        <div className="props__item ">
                            <div className="props__name ">Высота</div>
                            <div className="props__val props__bed_val">{currentSize.height}</div>
                        </div>
                        <div className="props__item ">
                            <div className="props__name ">Длина</div>
                            <div className="props__val props__bed_val">{currentSize.length}</div>
                        </div>
                        <div className="props__item ">
                            <div className="props__name ">Матрац</div>
                            <div className="props__val props__bed_val">Не входит в комплектацию</div>
                        </div>
                        {props.description &&
                            <>
                                <div className="props__name ">
                                    Описание
                                </div>
                                <div
                                    className="props__val"
                                    dangerouslySetInnerHTML={{__html: props.description}}
                                />
                            </>
                        }
                    </div>
                </div>
                {/*<div className="product__extra features">*/}
                {/*    <div className="features__item">*/}
                {/*        <div className="features__name name">*/}
                {/*            Доп. услуги*/}
                {/*        </div>*/}
                {/*        <label className="features__checkbox checkbox">*/}
                {/*            <input className="checkbox__input" type="checkbox"/>*/}
                {/*            <span className="checkbox__box"/>*/}
                {/*            Подъёмный механизм*/}
                {/*        </label>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </form>
    </Layout>)
}

export const getServerSideProps = async (ctx) => Ssr('bed_by_id', ctx)


export default BedItem;
