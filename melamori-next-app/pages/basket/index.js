import MainLayout from "../../components/MainLayout";

export default function BasketPage() {
    return (
        <MainLayout title={"Корзина"}>
            <div className="container">
                <div className="page__name page__name_actions">
                    <h1 className="page__title">Корзина</h1>
                    <div className="page__goods-count">4 товара</div>
                </div>
                <div className="basket">
                    <section className="basket__catalog catalog">
                        <div className="catalog__container container">
                            <div className="catalog__grid catalog__grid_basket catalog__grid_actions">
                                <article className="catalog__item product-card">
                                    <div className="product-card__img">
                                        <a href="#">
                                            <img
                                                src="/img/product/product_similar/Bed-Afina.png"
                                                alt="Кровать Афина"/>
                                        </a>
                                        <div className="product-card__discount">-10%</div>
                                    </div>
                                    <div className="product-card__prices">
                                        <div className="product-card__price product-card__price_cur">125
                                            550 <span>₽</span></div>
                                        <div className="product-card__price product-card__price_old">238 990</div>
                                        <div className="product-card__discount">-10%</div>
                                        <div className="product-card__size">140 x 200</div>
                                    </div>
                                    <div className="product-card__dscr">
                                        <div className="product-card__name">Афина</div>
                                        <div className="product-card__size">140 x 200</div>
                                    </div>
                                </article>
                                <article className="catalog__item product-card">
                                    <div className="product-card__img">
                                        <a href="#">
                                            <img
                                                src="/img/product/product_similar/matr-braun.png"
                                                alt="Матрац Браун"/>
                                        </a>
                                        <div className="product-card__discount">-10%</div>
                                    </div>
                                    <div className="product-card__prices">
                                        <div className="product-card__price product-card__price_cur">125
                                            550 <span>₽</span></div>
                                        <div className="product-card__price product-card__price_old">238 990</div>
                                        <div className="product-card__discount">-10%</div>
                                        <div className="product-card__size">140 x 200</div>
                                    </div>
                                    <div className="product-card__dscr">
                                        <div className="product-card__name">Браун</div>
                                        <div className="product-card__size">140 x 200</div>
                                        <div className="product-card__hard matr-hard"> Средний / жёсткий</div>
                                    </div>
                                </article>
                                <article className="catalog__item product-card">
                                    <div className="product-card__img">
                                        <a href="#">
                                            <img
                                                src="img/product/product_similar/sofa-Afina.png"
                                                alt="Софа Афина"/>
                                        </a>
                                        <div className="product-card__discount">-10%</div>
                                    </div>
                                    <div className="product-card__prices">
                                        <div className="product-card__price product-card__price_cur">125
                                            550 <span>₽</span></div>
                                        <div className="product-card__price product-card__price_old">238 990</div>
                                        <div className="product-card__discount">-10%</div>
                                    </div>
                                    <div className="product-card__dscr">
                                        <div className="product-card__name">Афина</div>
                                    </div>
                                </article>
                                <article className="catalog__item product-card">
                                    <div className="product-card__img">
                                        <a href="#">
                                            <img
                                                src="/img/product/product_similar/pillow-wave.png "
                                                alt="Подушка Волна"/>
                                        </a>
                                        <div className="product-card__discount">-10%</div>
                                    </div>
                                    <div className="product-card__prices">
                                        <div className="product-card__price product-card__price_cur">125
                                            550 <span>₽</span></div>
                                        <div className="product-card__price product-card__price_old">238 990</div>
                                        <div className="product-card__discount">-10%</div>
                                    </div>
                                    <div className="product-card__dscr">
                                        <div className="product-card__name">Волна</div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                    <section className="basket__order-section">
                        <div className="basket__block">
                            <div className="basket__dscr">
                                <div className="basket__total-price">
                                    114 190 <span>₽</span>
                                </div>
                                <ul className="basket__discount discount">
                                    <li className="discount__item">
                                        <span className="discount__title">Без скидки</span>
                                        <span className="discount__value">200 000 ₽</span>
                                    </li>
                                    <li className="discount__item">
                                        <span className="discount__title">Без скидки</span>
                                        <span className="discount__value">200 000 ₽</span>
                                    </li>
                                </ul>
                            </div>
                            {/*// Написать значение action*/}
                            <form action="#" className="basket__order-form">
                                <label className="basket__form-label" htmlFor="user-tel">
                                    Ваш телефон
                                </label>
                                <input className="basket__input" type="tel" placeholder="8 (123) 456–78–90"/>
                                    <button className="basket__btn">Подтвердить заказ</button>
                                    <label className="basket__checkbox checkbox">
                                        <input className="checkbox__input" type="checkbox"/>
                                            <span className="basket__checkbox-box checkbox__box"> </span>
                                            Я согласен на обработку моих персональных данных
                                    </label>
                            </form>
                        </div>
                        <div className="basket__block">
                            <div className="basket__block-name">Бонусы</div>
                            <div className="basket__block-text">
                                5% скидка на матрац при покупке кровати
                            </div>
                            <div className="basket__block-text">
                                18 месяцев гарантия на всё
                            </div>
                        </div>
                        <div className="basket__block">
                            <div className="basket__block-name">Доп. услуги</div>
                            <form className="basket__extra-form">
                                <label className="basket__checkbox checkbox">
                                    <input className="checkbox__input" type="checkbox"/>
                                        <span className="basket__checkbox-box checkbox__box"> </span>
                                        Сборка и установка
                                </label>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    )
}