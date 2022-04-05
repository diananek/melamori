import {Layout} from "../../../components/reboot/Layout";
import {priceResult, Ssr} from "../../../lib/ssr";
import fp from "lodash/fp";
import clsx from "clsx";
import {actions} from "../../../lib/store/main/actions";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {priceDelimiter} from "../../../components/reboot/ProductCard";
import {mainState} from "../../../lib/store/main";


// TODO: удалить 106 видов тканей

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
                name: `${i.bed_prices_id.bed_size_relation.width} x ${i.bed_prices_id.bed_size_relation.length}`
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
            console.log(data.price)
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
        const sub = watch(({additional_options, price}) => {
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

            const priceId = fp.find(['bed_prices_id.id', price], props.price_list).bed_prices_id
            setPricing(addToPrice(priceId.price))
            setSale(addToPrice(priceId.price * (priceId.sale_percentage / 100 + 1)))

        })
        return () => {
            sub.unsubscribe()
        }
    }, [getValues, props.additional_options, props.price_list, watch])


    const onAdd = (data) => {
        setSubmitted(true)
        dp(mainState.actions.addToCart({
            ...data, price: data.price || calcPrice.id, id: props.id, type: props.__typename
        }))
    }

    // console.log(props)
    return (<Layout hideSlider>
        <form onSubmit={handleSubmit(onAdd)} className="product">
            <div className="container product__grid">
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
                            Кровать
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
                        <a href="#" className="product__offer link">
                            Бесплатная консультация с менеджером
                        </a>
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
                                        const newVal = current === i.id ? null : i.id
                                        setValue('price', newVal)
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
                                        const newVal = current === i.id ? null : i.id
                                        setValue('price', newVal)
                                        setValue('category', i.relation)
                                    }}
                                >
                                    {i.name}
                                </button>)
                            })}
                        </div>
                    </div>

                    <div className="features__item ">
                        <div className="features__name name">
                            Украшения
                        </div>
                        <div className="features__options ">
                            {fp.filter(['additional_options_id.option_type', 'decoration'], props.additional_options)
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
                    </div>
                </form>
                <div className="product__props props">
                    <div className="props__item ">
                        <div className="props__name ">
                            Дополнительно
                        </div>
                        <div
                            className="props__val"
                            dangerouslySetInnerHTML={{__html: props.description}}
                        />
                    </div>
                </div>
                <div className="product__extra features">
                    <div className="features__item">
                        <div className="features__name name">
                            Доп. услуги
                        </div>
                        <label className="features__checkbox checkbox">
                            <input className="checkbox__input" type="checkbox"/>
                            <span className="checkbox__box"/>
                            Подъёмный механизм
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </Layout>)
}

export const getServerSideProps = async (ctx) => Ssr('bed_by_id', ctx)


export default BedItem;
