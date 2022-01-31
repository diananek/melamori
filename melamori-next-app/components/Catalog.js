import FavoritesBtn from "./FavoritesBtn";

export default function Catalog({title}) {
    return(
        <div className="catalog">
            <div className="catalog__container container">
                <div className="catalog__title">{title}</div>
                <div className="catalog__grid">
                    <article className="catalog__item product-card">
                        <div className="product-card__img">
                            <a href="#">
                                <img src="/img/product/product_similar/Bed-Afina.png"
                                     alt="Кровать Афина"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount">-10%</div>
                        </div>
                        <div className="product-card__prices">
                            <div className="product-card__price product-card__price_cur">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old">238 990</div>
                            <div className="product-card__discount">-10%</div>
                            <div className="product-card__size">140 x 200</div>
                        </div>
                        <div className="product-card__dscr">
                            <div className="product-card__name">Афина</div>
                            <div className="product-card__size">140 x 200</div>
                        </div>
                        <div className="product-card__actions">
                            <button className="product-card__add">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                    <article className="catalog__item product-card">
                        <div className="product-card__img">
                            <a href="#">
                                <img src="/img/product/product_similar/matr-braun.png"
                                     alt="Матрац Браун"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount">-10%</div>
                        </div>
                        <div className="product-card__prices">
                            <div className="product-card__price product-card__price_cur">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old">238 990</div>
                            <div className="product-card__discount">-10%</div>
                            <div className="product-card__size">140 x 200</div>
                        </div>
                        <div className="product-card__dscr">
                            <div className="product-card__name">Браун</div>
                            <div className="product-card__size">140 x 200</div>
                            <div className="product-card__hard matr-hard"> Средний / жёсткий</div>
                        </div>
                        <div className="product-card__actions">
                            <button className="product-card__add">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                    <article className="catalog__item product-card">
                        <div className="product-card__img">
                            <a href="#">
                                <img src="/img/product/product_similar/sofa-Afina.png"
                                     alt="Софа Афина"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount">-10%</div>
                        </div>
                        <div className="product-card__prices">
                            <div className="product-card__price product-card__price_cur">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old">238 990</div>
                            <div className="product-card__discount">-10%</div>
                        </div>
                        <div className="product-card__dscr">
                            <div className="product-card__name">Афина</div>
                        </div>
                        <div className="product-card__actions">
                            <button className="product-card__add">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                    <article className="catalog__item product-card ">
                        <div className="product-card__img ">
                            <a href="#">
                                <img src="/img/product/product_similar/pillow-wave.png "
                                     alt="Подушка Волна"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__prices ">
                            <div className="product-card__price product-card__price_cur ">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old ">238 990</div>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__dscr ">
                            <div className="product-card__name ">Волна</div>
                        </div>
                        <div className="product-card__actions ">
                            <button className="product-card__add ">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                    <article className="catalog__item product-card ">
                        <div className="product-card__img ">
                            <a href="#">
                                <img src="/img/product/product_similar/Bed-Afina.png"
                                     alt="Кровать Афина"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__prices ">
                            <div className="product-card__price product-card__price_cur ">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old ">238 990</div>
                            <div className="product-card__discount ">-10%</div>
                            <div className="product-card__size ">140 x 200</div>
                        </div>
                        <div className="product-card__dscr ">
                            <div className="product-card__name ">Афина</div>
                            <div className="product-card__size ">140 x 200</div>
                        </div>
                        <div className="product-card__actions ">
                            <button className="product-card__add ">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                    <article className="catalog__item product-card ">
                        <div className="product-card__img ">
                            <a href="#">
                                <img src="/img/product/product_similar/matr-braun.png"
                                     alt="Матрац Браун"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__prices ">
                            <div className="product-card__price product-card__price_cur ">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old ">238 990</div>
                            <div className="product-card__discount ">-10%</div>
                            <div className="product-card__size ">140 x 200</div>
                        </div>
                        <div className="product-card__dscr ">
                            <div className="product-card__name ">Браун</div>
                            <div className="product-card__size ">140 x 200</div>
                            <div className="product-card__hard matr-hard "> Средний / жёсткий</div>
                        </div>
                        <div className="product-card__actions ">
                            <button className="product-card__add ">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                    <article className="catalog__item product-card ">
                        <div className="product-card__img ">
                            <a href="#">
                                <img src="/img/product/product_similar/sofa-Afina.png"
                                     alt="Софа Афина"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__prices ">
                            <div className="product-card__price product-card__price_cur ">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old ">238 990</div>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__dscr ">
                            <div className="product-card__name ">Афина</div>
                        </div>
                        <div className="product-card__actions ">
                            <button className="product-card__add ">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                    <article className="catalog__item product-card ">
                        <div className="product-card__img ">
                            <a href="#">
                                <img src="/img/product/product_similar/pillow-wave.png "
                                     alt="Подушка Волна"/>
                            </a>
                            <FavoritesBtn/>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__prices ">
                            <div className="product-card__price product-card__price_cur ">125 550 <span>₽</span></div>
                            <div className="product-card__price product-card__price_old ">238 990</div>
                            <div className="product-card__discount ">-10%</div>
                        </div>
                        <div className="product-card__dscr ">
                            <div className="product-card__name ">Волна</div>
                        </div>
                        <div className="product-card__actions ">
                            <button className="product-card__add ">Добавить в заказ</button>
                            <FavoritesBtn className="product-card__fav_grey"> </FavoritesBtn>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}