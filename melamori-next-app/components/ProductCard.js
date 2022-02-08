import ProductCardFavoritesBtn from "./ProductCardFavoritesBtn";
import {useRouter} from "next/router";

export default function ProductCard({productData, keys, className}) {
    const serverUrl = process.env.serverUrl
    const id = productData.id
    const imageId = productData.image.id
    const imageTitle = productData.image.title
    const title = productData.title

    const priceList = productData.price_list[0]
    const priceData = priceList[keys.prices]

    const sizeData = priceData[keys.sizeRelation]
    const router = useRouter()
    const pageUrl = '/catalog/beds/'

    const handler = (event)=>{
        if(event.target.closest(".product-card__dscr") || event.target.closest(".product-card__img")) {
            router.push(pageUrl + id)
        }
    }
    return(
        <article key={id} className={className + " product-card"} onClick={(e)=> handler(e)}>
            <div className="product-card__img">
                <img src={serverUrl+imageId}
                     alt={imageTitle}/>
                <ProductCardFavoritesBtn/>
                {priceData.status !== "non-active" ? <div className="product-card__discount">-10%</div> : undefined}
            </div>
            <div className="product-card__prices">
                <div className="product-card__price product-card__price_cur">{priceData.price} <span>₽</span></div>
                {priceData.status !== "non-active" ? <div className="product-card__price product-card__price_old">238 990</div> : undefined}
                {priceData.status !== "non-active" ? <div className="product-card__discount">-10%</div> : undefined}
                <div className="product-card__size">{sizeData.sleep_size}</div>
            </div>
            <div className="product-card__dscr">
                <div className="product-card__name">{title}</div>
                <div className="product-card__size">{sizeData.sleep_size}</div>
            </div>
            <div className="product-card__actions">
                <button className="product-card__add">Добавить в заказ</button>
                <ProductCardFavoritesBtn className="product-card__fav_grey"> </ProductCardFavoritesBtn>
            </div>
        </article>
    )
}