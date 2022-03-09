import ProductCardFavoritesBtn from "./ProductCardFavoritesBtn";
import {useRouter} from "next/router";
import AddBasketBtn from "./AddBasketBtn";
import {getPageUrl} from "../lib/getPageUrl";
import {useAppContext} from "../context/state";

export default function BasketCard({data, className, collectionName}) {
    const serverUrl = process.env.serverUrl

    const id = data.id
    const imageId = data.imageId
    const imageTitle = data.imageTitle
    const title = data.title
    const sizeData = data.size

    const router = useRouter()

    const sale = data.sale ? data.sale : 0
    const price = data.price * (1 - sale/100)

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
                {data.saleStatus !== "non-active" ? <div className="product-card__discount">-{sale}%</div> : undefined}
            </div>
            <div className="product-card__prices">
                <div className="product-card__price product-card__price_cur"> от {price} <span>₽</span></div>
                {data.saleStatus !== "non-active" ? <div className="product-card__price product-card__price_old">от {price}</div> : undefined}
                {data.saleStatus !== "non-active" ? <div className="product-card__discount">-{sale}%</div> : undefined}
                <div className="product-card__size">{sizeData}</div>
            </div>
            <div className="product-card__dscr">
                <div className="product-card__name">{title}</div>
                <div className="product-card__size">{sizeData}</div>
            </div>
            <div className="product-card__actions">
                <AddBasketBtn className="product-card__add" id={id} collectionName={collectionName}/>
                <ProductCardFavoritesBtn className="product-card__fav_grey" id={id} collectionName={collectionName} data={data}> </ProductCardFavoritesBtn>
            </div>
        </article>
    )
}