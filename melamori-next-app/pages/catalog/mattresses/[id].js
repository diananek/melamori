import {Layout} from "../../../components/reboot/Layout";
import {priceResult, Ssr} from "../../../lib/ssr";
import {actions} from "../../../lib/store/main/actions";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import fp from "lodash/fp";
import clsx from "clsx";
import {useForm} from "react-hook-form";

import {useEffect, useState} from "react";
import {priceDelimiter} from "../../../components/reboot/ProductCard";
import {mainState} from "../../../lib/store/main";


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


    const [calcPrice, setCalcPrice] = useState(minPrice(props.price_list).mattresses_prices_id)
    const [pricing, setPricing] = useState(calcPrice.price)
    const [sale, setSale] = useState(calcPrice.price * (calcPrice.sale_percentage / 100 + 1))

    // console.log(calcPrice)
    const {register, handleSubmit, setValue, watch, getValues} = useForm({
        defaultValues: {
            additional_options: {},
            size: null,
        }
    });

    useEffect(() => {
        const sub = watch(({additional_options}) => {

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

            setPricing(addToPrice(calcPrice.price))
            setSale(addToPrice(calcPrice.price * (calcPrice.sale_percentage / 100 + 1)))

        })
        return () => {
            sub.unsubscribe()
        }
    }, [calcPrice.price, calcPrice.sale_percentage, getValues, props.additional_options, watch])


    const [selectedWidth, setSelectedWidth] = useState(null)

    const [selectedLength, setSelectedLength] = useState(null)

    const dp = useDispatch();

    const favList = useSelector('main.favorites');


    const isFavorite = fp.findIndex(fp.isEqual(`${props.__typename}/${props.id}`), favList) > -1

    const selectW = sizeGetter(selectedWidth, 'width')(props.price_list)

    const selectL = sizeGetter(selectedLength, 'length')(props.price_list)


    useEffect(() => {
        const sub = watch((data, change) => {

            if (change.name === 'size') {
                setCalcPrice(fp.getOr(calcPrice, 'mattresses_prices_id', fp.find(['mattresses_prices_id.id', data.size], props.price_list)))
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
                <div className="container  product__grid_mattr product__grid">
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
                                Матрац
                                <a href="#" className="matr-hard">
                                    {` ${props.hardness} ${props.other_hardness !== props.hardness ? `/ ${props.other_hardness}` : ''}`}
                                </a>
                            </div>
                            <div className="product__prices">
                                <div className="product__price price price_cur">
                                    {priceDelimiter(pricing)}
                                    <span>
                                        ₽
                                    </span>
                                </div>
                                {calcPrice.sale_percentage > 0 && <>
                                    <div className="product__price price price_old">
                                        {priceDelimiter(sale)}
                                    </div>
                                    <div className="product__discount">
                                        -{calcPrice.sale_percentage}%
                                    </div>
                                </>}
                            </div>
                            <div className="product__actions">
                                <button className="product__btn" type={'submit'}>
                                    {
                                        submitted ? 'В корзине' :'Добавить в заказ'
                                    }

                                </button>
                                <button
                                    className={clsx('product__favorites', isFavorite && 'product__favorites_active')}
                                    onClick={() => dp(actions.addToFavorites(props))}
                                >
                                    <span/>
                                </button>
                            </div>
                        </div>
                        <div className="product__caution" data-da=".product__grid, 1920, 2">
                            <div className="container">
                                Вы оплачиваете товар только после разговора с менеджером. Оформляя заказ на сайте,
                                вы
                                оставляете заявку на звонок
                            </div>
                        </div>
                    </div>

                    <div className="product__info info">
                        <div className="info__container">
                            <p>
                                18 месяцев гарантия
                            </p>
                            <p>
                                От 7-ми дней срок изготовления
                            </p>
                            <a href='' className="product__offer link">
                                Бесплатная консультация с менеджером
                            </a>
                        </div>
                    </div>
                    <div className="product__features features">
                        <div className="features__item">
                            <div className="features__name name">
                                Ширина
                            </div>
                            <div className="features__options">
                                {
                                    filterSizes(selectL, 'length', props.price_list).map(({
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
                                                mattress_size_relation.width === selectW ? 'features__option_selected' : ''
                                            )}
                                            onClick={() => {
                                                const newVal = selectedWidth === id ? null : id
                                                setValue('size', newVal)
                                                setSelectedWidth(newVal);
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
                                {filterSizes(selectW, 'width', props.price_list).map(({
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
                                            mattress_size_relation.length === selectL ? 'features__option_selected' : ''
                                        )}
                                        onClick={() => {
                                            const newVal = selectedLength === id ? null : id
                                            setValue('size', newVal)
                                            setSelectedLength(newVal);
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
                                    {additional_options_id.description}
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
                        <div className="props__item">
                            <div className="props__name">
                                Дополнительно
                            </div>
                            <div className="props__val">
                                {props.description}
                            </div>
                        </div>
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
