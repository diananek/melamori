import MainLayout from "../../../components/MainLayout";
import {bedCollection, bedCollectionById} from "../../../graphql/queries";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import ProductFavoritesBtn from "../../../components/ProductFavoritesBtn";
import ProductCard from "../../../components/ProductCard";
import {getKeys} from "../../../lib/getKeys";
import AddBasketBtn from "../../../components/AddBasketBtn";
import {getSizesAndCategories} from "../../../lib/getSizesAndCategories";
import ProductOptions from "../../../components/ProductOptions";
import {useReducer} from "react";
import Prices from "../../../components/Prices";


export default function BedItem() {
    const router = useRouter();
    const serverUrl = process.env.serverUrl;
    const productId = router.asPath.split('/').pop();
    const productInitState = {
        sleepSize:null,
        bedSize: null,
        priceObj: {},
    };
    function productReducer(state, action){
        switch (action.type) {
            case 'add_price':
                return {...state, price: action.value};
            case 'add_bed-size':
                return {...state, bedSize: action.value};
            case 'add_sleep-size':
                return {...state, sleepSize: action.value};
        }
    }
    const [productState, dispatch] = useReducer(productReducer, productInitState);


    const { loading: itemLoading, error: itemError, data: itemData } = useQuery(bedCollectionById, {
        variables: { id: productId },
    });

    const { loading: collectionLoading, error: collectionError, data: collectionData } = useQuery(bedCollection, {
        variables: { limit: 4 },
    });

    if(itemLoading || collectionLoading) {
        return("LOADING....")
    }
    if(itemError || collectionError) {
        router.push('/404')
        return("ERROR....")

    }

    const keys = getKeys("bed_collection")
    const productData = itemData ? itemData.bed_collection_by_id : undefined
    const [sizes, clothCategories] = getSizesAndCategories(productData, keys)
    const priceList = productData.price_list

    // dispatch({type: 'add_sleep-size', value: sizes[0].sleep_size})
    // dispatch({type: 'add_price', value: priceList[0].bed_prices_id})
    // console.log(prices.get(getTuple(clothCategories[0], sizes[0])))
    const imageId = productData.image ? productData.image.id: null
    const imageTitle = productData.image ? productData.image.title: null
    const title = productData.title

    // const saleStatus = productState.price.status
    // const sale = productState.price.sale_percentage ? productState.price.sale_percentage : 0
    // const price = productState.price.price * (1 - sale/100)

    const collection = collectionData.bed_collection
    return(
        <MainLayout>
                <div className="product">
                    <div className="container product__grid">
                        <div className="product__img">
                            {imageId ? <img src={serverUrl + imageId} alt={imageTitle}
                                            style={{background: `no-repeat center/ cover url(${serverUrl + imageId})`}}/>
                                : <div className='product__img-plug'/>}
                        </div>
                        <div className="product__dscr dscr">
                            <div className="dscr__grid">
                                <h2 className="product__title title">{title}</h2>
                                <div className="product__category">Кровать <a href="#" className="product__textile link">106
                                    вариантов тканей</a></div>
                                <Prices productState={productState} dispatch={dispatch} sizes={sizes} priceList={priceList}/>
                                <div className="product__actions">
                                    <AddBasketBtn className="product__btn" id={productId} collectionName={"bed_collection"}
                                                  data={itemData.bed_collection_by_id}/>
                                    <ProductFavoritesBtn id={productId} collectionName={"bed_collection"} data={itemData.bed_collection_by_id}>
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
                                <a href="#" className="product__offer link">Бесплатная консультация с менеджером</a>
                            </div>
                        </div>
                        <form className="product__features features">
                             <div className="features__item">
                                 <div className="features__name name">Размер спального места</div>
                                 <ProductOptions data={sizes} valueName={'sleep_size'}/>
                             </div>
                             <div className="features__item">
                                 <div className="features__name name">Категория ткани</div>
                                 <ProductOptions data={clothCategories} valueName={'category'}/>
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
                            {/*<div className="props__item ">*/}
                            {/*    <div className="props__name ">Ширина</div>*/}
                            {/*    <div className="props__val ">{bedSizeList[0] + ' см'}</div>*/}
                            {/*</div>*/}
                            {/*<div className="props__item ">*/}
                            {/*    <div className="props__name ">Высота</div>*/}
                            {/*    <div className="props__val ">{bedSizeList[2] + ' см'}</div>*/}
                            {/*</div>*/}
                            {/*<div className="props__item ">*/}
                            {/*    <div className="props__name ">Длина</div>*/}
                            {/*    <div className="props__val ">{bedSizeList[1] + ' см'}</div>*/}
                            {/*</div>*/}
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