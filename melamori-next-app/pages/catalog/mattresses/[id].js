import {Layout} from "../../../components/reboot/Layout";
import {Ssr} from "../../../lib/ssr";
import {actions} from "../../../lib/store/main/actions";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import fp from "lodash/fp";
import clsx from "clsx";
import {useState} from "react";


const uniqWidths = fp.uniqBy('mattresses_prices_id.mattress_size_relation.width')
const uniqLengths = fp.uniqBy('mattresses_prices_id.mattress_size_relation.length')


const sizeGetter = (id, type) => fp.pipe(
    fp.find(['mattresses_prices_id.id', id]),
    fp.get(`mattresses_prices_id.mattress_size_relation.${type}`)
)

const filterSizes = (select, key, uniq) => {
    console.log(select, key, uniq)
    return select
        ? fp.filter([`mattresses_prices_id.mattress_size_relation.${key}`, select], uniq)
        : uniq;
}


const MattressesId = (props) => {

    const [selectedWidth, setSelectedWidth] = useState(null)
    const [selectedLength, setSelectedLength] = useState(null)

    const dp = useDispatch();

    const favList = useSelector('main.favorites');


    const isFavorite = fp.findIndex(fp.isEqual(`${props.__typename}/${props.id}`), favList) > -1

    const selectW = sizeGetter(selectedWidth, 'width')(props.price_list)

    const selectL = sizeGetter(selectedLength, 'length')(props.price_list)


    return (
        <Layout hideSlider>
            <div className="product">
                <div className="container  product__grid_mattr product__grid">
                    <div className="product__img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`${process.env.serverUrl}${fp.get('image.id', props)}`} alt={fp.get('image.title', props)}/>
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
                                    120 200
                                    <span>
                                        ₽
                                    </span>
                                </div>
                                <div className="product__price price price_old">
                                    200 000
                                </div>
                                <div className="product__discount">
                                    -40%
                                </div>
                            </div>
                            <div className="product__actions">
                                <button className="product__btn">
                                    Добавить в заказ
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
                                Вы оплачиваете товар только после разговора с менеджером. Оформляя заказ на сайте, вы
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
                    <form className="product__features features">
                        <div className="features__item">
                            <div className="features__name name">
                                Ширина
                            </div>
                            <div className="features__options">
                                {
                                    filterSizes(selectL, 'length', uniqWidths(props.price_list)).map(({
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
                                                id === selectedWidth ? 'features__option_selected' : ''
                                            )}
                                            onClick={() => setSelectedWidth(selectedWidth === id ? null : id)}
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
                                {filterSizes(selectW, 'width', uniqLengths(props.price_list)).map(({
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
                                            id === selectedLength ? 'features__option_selected' : ''
                                        )}
                                        onClick={() => setSelectedLength(selectedLength === id ? null : id)}
                                    >
                                        {mattress_size_relation.length}
                                    </button>)}
                            </div>
                        </div>

                    </form>
                    <div className="product__extra features">
                        <div className="features__item">
                            <div className="features__name name">
                                Доп. услуги
                            </div>
                            {props.additional_options.map(({additional_options_id}) => (
                                <label className="features__checkbox checkbox" key={additional_options_id.id}>
                                    <input className="checkbox__input" type="checkbox"/>
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
            </div>
        </Layout>
    );
};


export const getServerSideProps = async (ctx) => Ssr('mattresses_by_id', ctx)


export default MattressesId
