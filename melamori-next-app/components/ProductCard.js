import ProductCardFavoritesBtn from "./ProductCardFavoritesBtn";
import {useRouter} from "next/router";
import AddBasketBtn from "./AddBasketBtn";
import {getPageUrl} from "../lib/getPageUrl";

export default function ProductCard({productData, keys, className, collectionName}) {
    const serverUrl = process.env.serverUrl
    const id = productData.id
    const imageId = productData.image.id
    const imageTitle = productData.image.title
    const title = productData.title

    const priceList = productData.price_list[0]
    const priceData = priceList[keys.prices]

    const sizeData = priceData[keys.sizeRelation]
    const router = useRouter()

    const sale = priceData.sale_percentage ? priceData.sale_percentage : 0
    const price = priceData.price * (1 - sale/100)

    const pageUrl = getPageUrl(collectionName)
    const handler = (event)=>{
        if(event.target.closest(".product-card__dscr") || event.target.closest(".product-card__img")) {
            router.push(pageUrl + id)
        }
    }
    return(
        <article key={id} className={className + " product-card"} onClick={(e)=> handler(e)}>
            <div className="product-card__img">
                <img src={serverUrl + imageId}
                     alt={imageTitle}/>
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