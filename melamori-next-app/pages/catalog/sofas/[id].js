import MainLayout from "../../../components/MainLayout";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import {softFurnitureCollection, sofaCollectionById} from "../../../graphql/queries";
import {getKeys} from "../../../lib/getKeys";
import ProductFavoritesBtn from "../../../components/ProductFavoritesBtn";
import ProductCard from "../../../components/ProductCard";
import AddBasketBtn from "../../../components/AddBasketBtn";

export default function SofaItem() {
    const router = useRouter()

    const serverUrl = process.env.serverUrl
    const productId = useRouter().asPath.split('/').pop()
    const { loading: itemLoading, error: itemError, data: itemData } = useQuery(sofaCollectionById, {
        variables: { id: productId },
    })

    const { loading: collectionLoading, error: collectionError, data: collectionData } = useQuery(softFurnitureCollection, {
        variables: { limit: 4 },
    })

    if(itemLoading || collectionLoading) {
        return "LOADING...."
    }
    if(itemError || collectionError) {
        router.push('/404')
        return 0
    }
    const productData = itemData.soft_furniture_by_id

    const priceList = productData.price_list[0].sofa_prices_id

    const sleepSize = priceList.sofa_size_relation.sleep_size
    const sofaSizes = priceList.sofa_size_relation.sofa_size.split('х')

    const clothCategory = priceList.sofa_cloth_category_relation.category

    const imageId = productData.image.id
    const imageTitle = productData.image.title
    const title = productData.title

    const saleStatus = priceList.status
    const sale = priceList.sale_percentage ? priceData.sale_percentage : 0
    const price = priceList.price * (1 - sale/100)

    const collection = collectionData.soft_furniture
    const keys = getKeys("soft_furniture")
    return(
        <MainLayout>
            <div className="product">
                <div className="container product__grid product__grid_sofa">
                    <div className="product__img" style={{background: `no-repeat center/ cover url(${serverUrl + imageId})`}}>
                        <img src={serverUrl + imageId} alt={imageTitle}/>
                    </div>
                    <div className="product__dscr dscr">
                        <div className="dscr__grid">
                            <h2 className="product__title title">{title}</h2>
                            <div className="product__category">Мягкая мебель</div>
                            <div className="product__prices">
                                <div className="product__price price price_cur">от {price} <span>₽</span></div>
                                {saleStatus !== "non-active" ?
                                    <div className="product__price price price_old">от {priceList.price}</div>
                                    :undefined}
                                {saleStatus !== "non-active" ?
                                    <div className="product__discount">-{sale}%</div>
                                    :undefined}
                            </div>
                            <div className="product__actions">
                                <AddBasketBtn className="product__btn" id={productId} collectionName={"soft_furniture"} data={productData}/>
                                <ProductFavoritesBtn id={productId} collectionName={"soft_furniture"} data={productData}> </ProductFavoritesBtn>
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
                            <a href="# " className="product__offer link "> Бесплатная консультация с менеджером</a>
                        </div>
                    </div>
                    <form className="product__features features">
                        <div className="features__item ">
                            <div className="features__name name">Категория ткани</div>
                            <div className="features__options">
                                <button className="features__option features__option_selected">{clothCategory}</button>
                            </div>
                        </div>
                    </form>
                    <div className="product__props props">
                        <div className="props__item ">
                            <div className="props__name ">Ширина</div>
                            <div className="props__val ">{sofaSizes[0] + ' см'}</div>
                        </div>
                        <div className="props__item ">
                            <div className="props__name ">Высота</div>
                            <div className="props__val ">{sofaSizes[2] + ' см'}</div>
                        </div>
                        <div className="props__item ">
                            <div className="props__name ">Длина</div>
                            <div className="props__val ">{sofaSizes[1] + ' см'}</div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">Ширина в разложеном виде</div>
                            <div className="props__val">182 см</div>
                        </div>
                        <div className="props__item">
                            <div className="props__name">Дополнительно</div>
                            <div className="props__val">Трансформируется
                            </div>
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
                                             className={"catalog__item"} collectionName={'soft_furniture'}/>
                            )
                        }
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}