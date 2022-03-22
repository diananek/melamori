import ProductCardFavoritesBtn from "./ProductCardFavoritesBtn";
import {useRouter} from "next/router";
import AddBasketBtn from "./AddBasketBtn";
import {getPageUrl} from "../lib/getPageUrl";

export default function ProductCard({productData, keys, className, collectionName}) {
    const serverUrl = process.env.serverUrl // адрес сервера с картинками
    const id = productData.id // id товара

    const imageId = productData.image ? productData.image.id: null // id картинки
    const imageTitle = productData.image ? productData.image.title: null // alt картинки
    const title = productData.title  // название товара

    const priceListElement = productData.price_list[0] // первый объект списка цен
    const priceData = priceListElement[keys.prices] // получение необходимого объекта по ключу

    const router = useRouter()

    const sale = priceData.sale_percentage ? priceData.sale_percentage : 0
    const price = priceData.price * (1 - sale/100) // цена с учетом скидки

    const pageUrl = getPageUrl(collectionName)
    const handler = (event)=>{
        if(event.target.closest(".product-card__dscr") || event.target.closest(".product-card__img")) {
            router.push(pageUrl + id)
        }
    }
    return(
        <article key={id} className={className + " product-card"} onClick={(e)=> handler(e)}>
            <div className="product-card__img">
                {imageId ? <img src={serverUrl + imageId}
                                alt={imageTitle}/>: <div className="product-card__img-plug"/>}
                <ProductCardFavoritesBtn/>
                {priceData.status !== "non-active" ? <div className="product-card__discount">-{sale}%</div> : undefined}
            </div>
            <div className="product-card__prices">
                <div className="product-card__price product-card__price_cur"> от {price} <span>₽</span></div>
                {priceData.status !== "non-active" ? <div className="product-card__price product-card__price_old">от {priceData.price}</div> : undefined}
                {priceData.status !== "non-active" ? <div className="product-card__discount">-{sale}%</div> : undefined}
            </div>
            <div className="product-card__dscr">
                <div className="product-card__name">{title}</div>
            </div>
            <div className="product-card__actions">
                <AddBasketBtn className="product-card__add" id={id} collectionName={collectionName} data={productData}
                              price={priceData.price} sale={sale} saleStatus={priceData.status}/>
                <ProductCardFavoritesBtn className="product-card__fav_grey" id={id} collectionName={collectionName}
                                         data={productData}> </ProductCardFavoritesBtn>
            </div>
        </article>
    )
}