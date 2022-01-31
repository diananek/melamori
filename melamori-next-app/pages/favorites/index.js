import MainLayout from "../../components/MainLayout";

export default function FavoritesPage() {
    return(
        <MainLayout title={"Избранное"}>
                <div className="container">
                    <div className="page__name page__name_actions">
                        <h1 className="page__title">Избранное</h1>
                        <div className="page__goods-count">5 товаров</div>
                    </div>
                    <section className="catalog">
                        <div className="catalog__container container">
                            <div className="catalog__grid catalog__grid_actions">
                                <article className="catalog__item product-card">
                                    <div className="product-card__img">
                                        <a href="bed-item.html">
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
                                        <a href="mattress-item.html">
                                            <img
                                                src="img/product/product_similar/matr-braun.png"
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
                                        <a href="sofa-item.html">
                                            <img
                                                src="/img/product/product_similar/sofa-Afina.png"
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
                                        <a href="pillow-item.html">
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
                                <article className="catalog__item product-card">
                                    <div className="product-card__img">
                                        <a href="sofa-item.html">
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
                            </div>
                        </div>
                    </section>
                </div>
        </MainLayout>
    )
}