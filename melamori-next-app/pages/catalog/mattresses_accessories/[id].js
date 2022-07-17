import {priceResult, Ssr} from "../../../lib/ssr";
import {Layout} from "../../../components/reboot/Layout";
import {BackIcon} from "../../../components/reboot/icons";
import {Image} from "antd";
import fp from "lodash/fp";
import {priceDelimiter} from "../../../components/reboot/ProductCard";
import clsx from "clsx";
import {actions} from "../../../lib/store/main/actions";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import {useState} from "react";
import 'antd/dist/antd.css'
import {useForm} from "react-hook-form";
import {mainState} from "../../../lib/store/main";


const minPrice = fp.minBy((item) => {
    const {price, sale_percentage} = fp.get('accessories_prices_id', item);
    return priceResult({price, sale_percentage})
})


const accessoriesTypes = {
    pillow: 'Подушка',
    blanket: 'Одеяло',
    mattress_pad: 'Наматрасник',
    covering: 'Настил',
}


const MattressesAccessories = (props) => {

    const [submitted, setSubmitted] = useState(false)

    const [calcPrice] = useState(minPrice(props.price_list).accessories_prices_id)
    const [pricing] = useState(calcPrice.price)
    const [sale] = useState(calcPrice.price * (1 - calcPrice.sale_percentage / 100))

    const dp = useDispatch()


    const {handleSubmit} = useForm()

    const favList = useSelector('main.favorites');

    const isFavorite = fp.findIndex(fp.isEqual(`${props.__typename}/${props.id}`), favList) > -1

    const onAdd = () => {
        setSubmitted(true)
        dp(mainState.actions.addToCart({
            price: calcPrice.id,
            id: props.id,
            type: props.__typename
        }))
    }

    return (
        <Layout hideSlider>
            <form className="product" onSubmit={handleSubmit(onAdd)}>
                <div className={'back'}>
                    <BackIcon/>
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
                                {accessoriesTypes[props.accessory_type]}
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
                    <div className="props">
                        <div className="props__item ">
                            <div className="props__item ">
                                <div className="props__name ">
                                    Ширина
                                </div>
                                <div
                                    className="props__val props__bed_val">{calcPrice?.accessory_size_relation?.width} см
                                </div>
                            </div>
                            <div className="props__item ">
                                <div className="props__name ">Длина</div>
                                <div
                                    className="props__val props__bed_val">{calcPrice?.accessory_size_relation?.length} см
                                </div>
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
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => Ssr('mattresses_accessories_by_id', ctx)


export default MattressesAccessories
