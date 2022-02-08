import MainLayout from "../../../components/MainLayout";
import {bedCollectionById} from "../../../graphql/queries";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import ProductFavoritesBtn from "../../../components/ProductFavoritesBtn";

export default function CatalogItem() {
    const serverUrl = process.env.serverUrl
    const productId = useRouter().asPath.split('/').pop()
    const { loading, error, data } = useQuery(bedCollectionById, {
        variables: { id: productId },
    })

    if(loading) {
        return "LOADING...."
    }
    if(error) {
        return "ERROR!"
    }

    const productData = data.bed_collection_by_id

    const priceList = productData.price_list[0].bed_prices_id

    const sleepSize = priceList.bed_size_relation.sleep_size
    const bedSizes = priceList.bed_size_relation.bed_size.split('*')

    const clothCategory = priceList.bed_cloth_category_relation.category

    const imageId = productData.image.id
    const imageTitle = productData.image.title
    const title = productData.title

    const saleStatus = priceList.status
    const price = priceList.price
    return(
        <MainLayout>
                <div className="product">
                    <div className="container product__grid">
                        <div className="product__img">
                            <img src={serverUrl + imageId} alt={imageTitle}/>
                        </div>
                        <div className="product__dscr dscr">
                            <div className="dscr__grid">
                                <h2 className="product__title title">{title}</h2>
                                <div className="product__category">Кровать <a href="#" className="product__textile link">106
                                    вариантов тканей</a></div>
                                <div className="product__prices">
                                    <div className="product__price price price_cur">{price} <span>₽</span></div>
                                    {saleStatus !== "non-active" ?
                                        <div className="product__price price price_old">200 000</div>
                                        :undefined}
                                    {saleStatus !== "non-active" ?
                                        <div className="product__discount">-40%</div>
                                        :undefined}
                                </div>
                                <div className="product__actions">
                                    <button className="product__btn">Добавить в заказ</button>
                                    <ProductFavoritesBtn> </ProductFavoritesBtn>
                                </div>
                            </div>
                            <div className="product__caution" data-da=".product__grid, 1920, 2">
                                <div className="container">
                                    Вы оплачиваете товар только после разговора с менеджером. Оформляя заказ на сайте,
                                    вы оставляете заявку на звонок
                                </div>
                            </div>
                        </div>

                        <div className="product__info info">
                            <div className="info__container ">
                                <p>18 месяцев гарантия</p>
                                <p>От 7-ми дней срок изготовления </p>
                                <a href="#" className="product__offer link ">Бесплатная консультация с менеджером</a>
                            </div>
                        </div>
                        <form className="product__features features">
                            <div className="features__item ">
                                <div className="features__name name">Размер спального места</div>
                                <div className="features__options ">
                                    <button className="features__option features__option_selected ">{sleepSize}</button>
                                    <button className="features__option ">Свой</button>
                                </div>
                            </div>
                            <div className="features__item ">
                                <div className="features__name name">Категория ткани</div>
                                <div className="features__options">
                                    <button className="features__option features__option_selected">{clothCategory}</button>
                                </div>
                            </div>

                            <div className="features__item ">
                                <div className="features__name name">Украшения</div>
                                <div className="features__options ">
                                    <button className="features__option features__option_selected ">Пуговицы</button>
                                    <button className="features__option ">Стразы</button>
                                </div>
                            </div>
                        </form>
                        <div className="product__extra features">
                            <div className="features__item">
                                <div className="features__name name">Доп. услуги</div>
                                <label className="features__checkbox checkbox">
                                    <input className="checkbox__input" type="checkbox"/>
                                        <span className="checkbox__box"></span>
                                        Подъёмный механизм
                                </label>
                            </div>
                        </div>
                        <div className="product__props props">
                            <div className="props__item ">
                                <div className="props__name ">Ширина</div>
                                <div className="props__val ">{bedSizes[0] + ' см'}</div>
                            </div>
                            <div className="props__item ">
                                <div className="props__name ">Высота</div>
                                <div className="props__val ">{bedSizes[2] + ' см'}</div>
                            </div>
                            <div className="props__item ">
                                <div className="props__name ">Длина</div>
                                <div className="props__val ">{bedSizes[1] + ' см'}</div>
                            </div>
                            <div className="props__item ">
                                <div className="props__name ">Матрац</div>
                                <div className="props__val ">Не входит в комплектацию</div>
                            </div>
                            <div className="props__item ">
                                <div className="props__name ">Дополнительно</div>
                                <div className="props__val ">Ортопедическое основание,<br/> деление ящика на
                                    секции,<br/> накладные латы</div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="similar-products">
                    <div className="container">
                        <div className="similar-products__title">Похожие товары</div>
                        <ul className="similar-products__items">
                            <li className="similar-products__item product-card">
                                <div className="product-card__img">
                                    <img src="../melamori-next-app/public/img/product/product_similar/Bed-Afina.png"
                                         alt="Кровать Афина"/>
                                        <button className="product-card__fav"></button>
                                        <div className="product-card__discount">-10%</div>
                                </div>
                                <div className="product-card__prices">
                                    <div className="product-card__price product-card__price_cur">125 550 <span>₽</span>
                                    </div>
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
                                    <button className="product-card__fav product-card__fav_grey"></button>
                                </div>
                            </li>
                            <li className="similar-products__item product-card">
                                <div className="product-card__img">
                                    <img src="../melamori-next-app/public/img/product/product_similar/matr-braun.png"
                                         alt="Матрац Браун"/>
                                        <button className="product-card__fav"></button>
                                        <div className="product-card__discount">-10%</div>
                                </div>
                                <div className="product-card__prices">
                                    <div className="product-card__price product-card__price_cur">125 550 <span>₽</span>
                                    </div>
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
                                    <button className="product-card__fav product-card__fav_grey"></button>
                                </div>

                            </li>
                            <li className="similar-products__item product-card">
                                <div className="product-card__img">
                                    <img src="../melamori-next-app/public/img/product/product_similar/sofa-Afina.png"
                                         alt="Софа Афина"/>
                                        <button className="product-card__fav"></button>
                                        <div className="product-card__discount">-10%</div>
                                </div>
                                <div className="product-card__prices">
                                    <div className="product-card__price product-card__price_cur">125 550 <span>₽</span>
                                    </div>
                                    <div className="product-card__price product-card__price_old">238 990</div>
                                    <div className="product-card__discount">-10%</div>
                                </div>
                                <div className="product-card__dscr">
                                    <div className="product-card__name">Афина</div>
                                </div>
                                <div className="product-card__actions">
                                    <button className="product-card__add">Добавить в заказ</button>
                                    <button className="product-card__fav product-card__fav_grey"></button>
                                </div>
                            </li>
                            <li className="similar-products__item product-card">
                                <div className="product-card__img">
                                    <img src="../melamori-next-app/public/img/product/product_similar/pillow-wave.png"
                                         alt="Кровать Афина"/>
                                        <button className="product-card__fav"></button>
                                        <div className="product-card__discount">-10%</div>
                                </div>
                                <div className="product-card__prices">
                                    <div className="product-card__price product-card__price_cur">125 550 <span>₽</span>
                                    </div>
                                    <div className="product-card__price product-card__price_old">238 990</div>
                                    <div className="product-card__discount">-10%</div>
                                </div>
                                <div className="product-card__dscr">
                                    <div className="product-card__name">Волна</div>
                                </div>
                                <div className="product-card__actions">
                                    <button className="product-card__add">Добавить в заказ</button>
                                    <button className="product-card__fav product-card__fav_grey"></button>
                                </div>
                            </li>

                        </ul>
                    </div>
                </section>
        </MainLayout>
    )
}