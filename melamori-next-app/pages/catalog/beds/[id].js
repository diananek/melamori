import MainLayout from "../../../components/MainLayout";
import {bedCollection, bedCollectionById} from "../../../graphql/queries";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import ProductFavoritesBtn from "../../../components/ProductFavoritesBtn";
import ProductCard from "../../../components/ProductCard";
import {getKeys} from "../../../lib/getKeys";
import AddBasketBtn from "../../../components/AddBasketBtn";

export default function CatalogItem() {
    const serverUrl = process.env.serverUrl
    const productId = useRouter().asPath.split('/').pop()
    const { loading: itemLoading, error: itemError, data: itemData } = useQuery(bedCollectionById, {
        variables: { id: productId },
    })

    const { loading: collectionLoading, error: collectionError, data: collectionData } = useQuery(bedCollection, {
        variables: { offset: 4 },
    })

    if(itemLoading || collectionLoading) {
        return "LOADING...."
    }
    if(itemError || collectionError) {
        router.push('/404')
        return
    }

    const productData = itemData.bed_collection_by_id

    const priceList = productData.price_list[0].bed_prices_id

    const sleepSize = priceList.bed_size_relation.sleep_size
    const bedSizes = priceList.bed_size_relation.bed_size.split('*')

    const clothCategory = priceList.bed_cloth_category_relation.category

    const imageId = productData.image.id
    const imageTitle = productData.image.title
    const title = productData.title

    const saleStatus = priceList.status
    const price = priceList.price

    const collection = collectionData.bed_collection
    const keys = getKeys("bed_collection")
    return(
        <MainLayout>
                <div className="product">
                    <div className="container product__grid">
                        <div className="product__img">
                            <img src={serverUrl + imageId} alt={imageTitle} style={{background: `no-repeat center/ cover url(${serverUrl + imageId})`}}/>
                        </div>
                        <div className="product__dscr dscr">
                            <div className="dscr__grid">
                                <h2 className="product__title title">{title}</h2>
                                <div className="product__category">Кровать <a href="#" className="product__textile link">106
                                    вариантов тканей</a></div>
                                <div className="product__prices">
                                    <div className="product__price price price_cur">{price} <span>₽</span></div>
                                    {saleStatus !== "non-active" ?
                                        <div className="product__price price price_old">{priceList.price}</div>
                                        :undefined}
                                    {saleStatus !== "non-active" ?
                                        <div className="product__discount">-{sale}%</div>
                                        :undefined}
                                </div>
                                <div className="product__actions">
                                    <AddBasketBtn className="product__btn" id={productId} collectionName={"bed_collection"}>Добавить в заказ</AddBasketBtn>
                                    <ProductFavoritesBtn id={productId} collectionName={"bed_collection"} data={itemData}>
                                    </ProductFavoritesBtn>
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
                                <div className="features__options">
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
                                        <span className="checkbox__box"> </span>
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
                        <div className="similar-products__items">
                            {
                                collection.map((item) =>
                                    <ProductCard key={item.id} productData={item} keys={keys}
                                                 className={"catalog__item"} collectionName={'bed_collection'}/>
                                )
                            }
                        </div>
                    </div>
                </section>
        </MainLayout>
    )
}