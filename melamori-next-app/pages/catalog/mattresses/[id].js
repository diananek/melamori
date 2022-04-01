import {Layout} from "../../../components/reboot/Layout";
import {Ssr} from "../../../lib/ssr";

const mattressesId = (props) => {
    console.log(props)
    return (
        <Layout hideSlider>
            <div className="product">
                <div className="container  product__grid_mattr product__grid">
                    <div className="product__img">
                        <img src="/img/mattress/Vega.jpg" alt="Матрац Браун"/>
                    </div>
                    <div className="product__dscr dscr">
                        <div className="dscr__grid">
                            <h2 className="product__title title">Браун</h2>
                            <div className="product__category">Матрац <a href="#" className="matr-hard">Средний /
                                жёсткий</a></div>
                            <div className="product__prices">
                                <div className="product__price price price_cur">120 200 <span>₽</span></div>
                                <div className="product__price price price_old">200 000</div>
                                <div className="product__discount">-40%</div>
                            </div>
                            <div className="product__actions">
                                <button className="product__btn">Добавить в заказ</button>
                                <button className="product__favorites"><span/></button>
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
                            <p>18 месяцев гарантия</p>
                            <p>От 7-ми дней срок изготовления </p>
                            <a href='' className="product__offer link"> Бесплатная консультация с менеджером</a>
                        </div>
                    </div>
                    <form className="product__features features">
                        <div className="features__item">
                            <div className="features__name name">Ширина</div>
                            <div className="features__options">
                                <button className="features__option features__option_selected">70</button>
                                <button className="features__option">80</button>
                                <button className="features__option">90</button>
                                <button className="features__option">100</button>
                                <button className="features__option">110</button>
                                <button className="features__option">120</button>
                                <button className="features__option">130</button>
                                <button className="features__option">140</button>
                                <button className="features__option">150</button>
                                <button className="features__option">160</button>
                                <button className="features__option">170</button>
                                <button className="features__option">180</button>
                                <button className="features__option">200</button>
                                <button className="features__option">Свой</button>
                            </div>
                        </div>
                        <div className="features__item">
                            <div className="features__name name">Длина</div>
                            <div className="features__options">
                                <button className="features__option features__option_selected">186</button>
                                <button className="features__option">200</button>
                                <button className="features__option">Своя</button>
                            </div>
                        </div>

                    </form>
                    <div className="product__extra features">
                        <div className="features__item">
                            <div className="features__name name">Доп. услуги</div>
                            <label className="features__checkbox checkbox">
                                <input className="checkbox__input" type="checkbox"/>
                                <span className="checkbox__box"/>
                                Подъёмный механизм
                            </label>
                        </div>
                    </div>
                    <div className="product__props props props_underlined">
                        <div className="props__item">
                            <div className="props__name">Высота</div>
                            <div className="props__val">24 см</div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">Вес на спальное место</div>
                            <div className="props__val">до 130 кг</div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">Пружин на спальное место</div>
                            <div className="props__val">1200</div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">Дополнительно</div>
                            <div className="props__val">Независимый пружинный блок,<br/>3D сетка, стороны разной
                                жёсткости
                            </div>
                        </div>
                    </div>
                    <div className="product__materials materials">
                        <div className="materials__title name">Материалы</div>
                        <div className="materials__item">
                            <img src="/img/mattress/materials/latex.png"
                                 alt="Перфорированный латекс" className="materials__img"/>
                            <div className="materials__dscr">
                                <div className="materials__name">Перфорированный латекс</div>
                                <div className="materials__props">Увеличивает мягкость спального места</div>
                            </div>
                        </div>
                        <div className="materials__item">
                            <img src="/img/mattress/materials/coconut.png"
                                 alt="Кокосовая койра" className="materials__img"/>
                            <div className="materials__dscr">
                                <div className="materials__name">Кокосовая койра</div>
                                <div className="materials__props">Придаёт жёсткость, прочность, долговечность</div>
                            </div>
                        </div>
                        <div className="materials__item">
                            <img src="/img/mattress/materials/spring.png"
                                 alt="Пружинный блокс" className="materials__img"/>
                            <div className="materials__dscr">
                                <div className="materials__name">Пружинный блок «Боннель»</div>
                                <div className="materials__props">Зависимый пружинный блок. 375 пружин на спальное
                                    место
                                </div>
                            </div>
                        </div>
                        <div className="materials__item">
                            <img src="/img/mattress/materials/coconut.png"
                                 alt="Кокосовая койра" className="materials__img"/>
                            <div className="materials__dscr">
                                <div className="materials__name">Кокосовая койра</div>
                                <div className="materials__props">Придаёт жёсткость, прочность, долговечность</div>
                            </div>
                        </div>
                        <div className="materials__item">
                            <img src="/img/mattress/materials/latex.png"
                                 alt="Перфорированный латекс" className="materials__img"/>
                            <div className="materials__dscr">
                                <div className="materials__name">Перфорированный латекс</div>
                                <div className="materials__props">Увеличивает мягкость спального места</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    );
};


export const getServerSideProps = async (ctx) => Ssr('mattresses_by_id', ctx)


export default mattressesId
