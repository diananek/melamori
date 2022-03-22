import ProductCardFavoritesBtn from "./ProductCardFavoritesBtn";
import {useRouter} from "next/router";
import AddBasketBtn from "./AddBasketBtn";
import {getPageUrl} from "../lib/getPageUrl";

export default function BasketCard({data, className, collectionName}) {
    const serverUrl = process.env.serverUrl

    const id = data.id // id товара
    const imageId = data.imageId // id картинки
    const imageTitle = data.imageTitle // alt картинки
    const title = data.title // название товара
    const sizeData = data.size //данные о размере

    const router = useRouter()

    const sale = data.sale ? data.sale : 0
    const price = data.price * (1 - sale/100) // цена с учетом скидки

    const pageUrl = getPageUrl(collectionName) // получение url по имени коллекции

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