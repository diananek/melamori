import {Layout} from "../../../components/reboot/Layout";
import {priceResult, Ssr} from "../../../lib/ssr";
import {actions} from "../../../lib/store/main/actions";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import fp from "lodash/fp";
import clsx from "clsx";
import {useForm} from "react-hook-form";

import React, {useEffect, useState} from "react";
import {priceDelimiter} from "../../../components/reboot/ProductCard";
import {mainState} from "../../../lib/store/main";
// import Image from "next/image";
import {Image} from "antd";
import 'antd/dist/antd.css'
import {BackIcon} from "../../../components/reboot/icons";

const uniqWidths = fp.uniqBy('mattresses_prices_id.mattress_size_relation.width')
const uniqLengths = fp.uniqBy('mattresses_prices_id.mattress_size_relation.length')


const sizeGetter = (id, type) => fp.pipe(
    fp.find(['mattresses_prices_id.id', id]),
    fp.get(`mattresses_prices_id.mattress_size_relation.${type}`)
)

const filterSizes = (select, key, pl) => {

    let selected = select
        ? fp.filter([`mattresses_prices_id.mattress_size_relation.${key}`, select], pl)
        : pl;

    return key === 'length'
        ? uniqWidths(selected)
        : uniqLengths(selected)
}


const minPrice = fp.minBy(
    (item) => {
        const {price, sale_percentage} = fp.get('mattresses_prices_id', item);
        return priceResult({price, sale_percentage})
    }
)


const MattressesId = (props) => {

    const [submitted, setSubmitted] = useState(false)
    const [fClick, setFClick] = useState(false)


    const [calcPrice, setCalcPrice] = useState(minPrice(props.price_list).mattresses_prices_id)
    const [pricing, setPricing] = useState(calcPrice.price)
    const [sale, setSale] = useState(calcPrice.price * (1 - calcPrice.sale_percentage / 100))

    const {register, handleSubmit, setValue, watch, getValues} = useForm({
        defaultValues: {
            additional_options: {},
            size: null,
            width: calcPrice.mattress_size_relation.width,
            length: calcPrice.mattress_size_relation.length
        }
    });

    useEffect(() => {
        const sub = watch(({additional_options, width, length}) => {
            const cPrice = fp.getOr(
                calcPrice,
                'mattresses_prices_id',
                fp.find({
                        mattresses_prices_id: {
                            mattress_size_relation: {
                                width,
                                length,
                            }
                        },
                        // 'mattresses_prices_id': data.size,
                    },
                    props.price_list
                )
            )

            const addToPrice = (num) => {
                let addition = {
                    raw: 0,
                    percent: 0,
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

            setPricing(addToPrice(cPrice.price))
            setSale(addToPrice(cPrice.price * (1 - cPrice.sale_percentage / 100)))

        })
        return () => {
            sub.unsubscribe()
        }
    }, [calcPrice, calcPrice.price, calcPrice.sale_percentage, getValues, props.additional_options, props.price_list, watch])


    const [selectedWidth, setSelectedWidth] = useState(calcPrice.id)

    const [selectedLength, setSelectedLength] = useState(calcPrice.id)

    const dp = useDispatch();

    const favList = useSelector('main.favorites');


    const isFavorite = fp.findIndex(fp.isEqual(`${props.__typename}/${props.id}`), favList) > -1

    const selectW = sizeGetter(selectedWidth, 'width')(props.price_list)

    const selectL = sizeGetter(selectedLength, 'length')(props.price_list)


    useEffect(() => {
        const sub = watch((data, change) => {

            if (change.name === 'width' || change.name === 'length') {
                setCalcPrice(
                    fp.getOr(
                        calcPrice,
                        'mattresses_prices_id',
                        fp.find({
                                mattresses_prices_id: {
                                    mattress_size_relation: {
                                        width: data.width,
                                        length: data.length,

                                    }
                                },
                                // 'mattresses_prices_id': data.size,
                            },
                            props.price_list
                        )
                    )
                )
            }
        })
        return () => {
            sub.unsubscribe()
        }
    }, [calcPrice, props.price_list, watch])

    const onAdd = (data) => {
        setSubmitted(true)
        dp(mainState.actions.addToCart({
            ...data,
            size: data.size || calcPrice.id,
            id: props.id,
            type: props.__typename
        }))
    }

    return (
        <Layout hideSlider>
            <form
                className="product"
                onSubmit={handleSubmit(onAdd)}
            >
                <div className={'back'}>
                    <BackIcon/>
                </div>
                <div className="container  product__grid_mattr product__grid">
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
                                Матрац
                                <a href="#" className="matr-hard">
                                    {` ${props.hardness} ${props.other_hardness !== props.hardness ? `/ ${props.other_hardness}` : ''}`}
                                </a>
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
                            <div className={'product__prices'} style={{marginTop: '80px'}}>
                                {props.sale_remaining > 0 && `Осталось по акции: ${props.sale_remaining}`}
                            </div>
                            <div className="product__actions">
                                <button
                                    type='submit'
                                    className="product__btn"
                                    disabled={!fClick}
                                    title={fClick || 'Выберите фильтр'}>
                                    {
                                        submitted ? 'В корзине' : 'Добавить в заказ'
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
                    </div>
                    <div className="product__caution" data-da=".product__grid, 1920, 2">
                        <div className="container">
                            Вы оплачиваете товар только после разговора с менеджером. Оформляя заказ на сайте,
                            вы
                            оставляете заявку на звонок
                        </div>
                    </div>
                    <div className="product__info info">
                        <div className="info__container">
                            <p>
                                18 месяцев гарантия
                            </p>
                            <p>
                                Срок изготовления: от 2 недель
                            </p>
                            <p className="product__offer link" onClick={() => dp(actions.openModal())}>
                                Бесплатная консультация с менеджером
                            </p>
                        </div>
                    </div>
                    <div className="product__features features">
                        <div className="features__item">
                            <div className="features__name name">
                                Ширина
                            </div>
                            <div className="features__options">
                                {
                                    filterSizes(fClick && selectL, 'length', props.price_list).map(({
                                                                                              mattresses_prices_id: {
                                                                                                  id,
                                                                                                  mattress_size_relation
                                                                                              }
                                                                                          }) =>
                                        <button
                                            key={id}
                                            type={'button'}
                                            className={clsx(
                                                "features__option",
                                                mattress_size_relation.width === selectW && fClick  ? 'features__option_selected' : ''
                                            )}
                                            onClick={() => {
                                                // const newVal = selectedWidth === id
                                                setValue('width', mattress_size_relation.width)
                                                if (getValues('length') !== mattress_size_relation.length) {
                                                    setValue('length', mattress_size_relation.length)
                                                    setSelectedLength(id)
                                                }
                                                // setValue('size', id)
                                                setSelectedWidth(id);
                                                setFClick(true)
                                            }}
                                        >
                                            {mattress_size_relation.width}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        <div className="features__item">
                            <div className="features__name name">
                                Длина
                            </div>
                            <div className="features__options">
                                {filterSizes(fClick && selectW, 'width', props.price_list).map(({
                                                                                          mattresses_prices_id: {
                                                                                              id,
                                                                                              mattress_size_relation
                                                                                          }
                                                                                      }) =>
                                    <button
                                        key={id}
                                        type={'button'}
                                        className={clsx(
                                            "features__option",
                                            mattress_size_relation.length === selectL && fClick ? 'features__option_selected' : ''
                                        )}
                                        onClick={() => {
                                            setValue('length', mattress_size_relation.length)
                                            if (getValues('width') !== mattress_size_relation.width) {
                                                setValue('width', mattress_size_relation.width)
                                                setSelectedWidth(id)
                                            }
                                            setSelectedLength(id);
                                            setFClick(true)
                                        }}
                                    >
                                        {mattress_size_relation.length}
                                    </button>)}
                            </div>
                        </div>

                    </div>
                    <div className="product__extra features">
                        <div className="features__item">
                            <div className="features__name name">
                                Доп. услуги
                            </div>
                            {props.additional_options.map(({additional_options_id}) => (
                                <label className="features__checkbox checkbox" key={additional_options_id.id}>
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        {...register(`additional_options.${additional_options_id.id}`)}
                                    />
                                    <span className="checkbox__box"/>
                                    {additional_options_id.title}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="product__props props props_underlined">
                        <div className="props__item">
                            <div className="props__name">
                                Высота
                            </div>
                            <div className="props__val">
                                {props.height}
                            </div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">
                                Вес на спальное место
                            </div>
                            <div className="props__val">
                                {props.sleep_place_weight}
                            </div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">
                                Пружин на спальное место
                            </div>
                            <div className="props__val">
                                {props.bed_springs}
                            </div>
                        </div>
                        {props.description &&
                            <div className="props__item">
                                <div className="props__name">
                                    Описание
                                </div>
                                <div className="props__val">
                                    {props.description}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="product__materials materials">
                        <div className="materials__title name">
                            Материалы
                        </div>
                        {props.materials.map(({mattresses_materials_id}) => (
                                <div className="materials__item" key={mattresses_materials_id.id}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`${process.env.serverUrl}${mattresses_materials_id.image.id}`}
                                         alt={mattresses_materials_id.image.title}
                                         className="materials__img"
                                    />
                                    <div className="materials__dscr">
                                        <div className="materials__name">
                                            {mattresses_materials_id.title}
                                        </div>
                                        <div className="materials__props">
                                            {mattresses_materials_id.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </form>
        </Layout>
    );
};


export const getServerSideProps = async (ctx) => Ssr('mattresses_by_id', ctx)


export default MattressesId
