import ProductCard from "./ProductCard";
import {useRouter} from "next/router";
import {getKeys} from "../lib/getKeys";
import Sorting from "./Sorting";


export default function Catalog({title, productsData, status, collectionName, onLoadMore}) {
    if(status === "loading") {
        return "LOADING...."
    }
    if(status === "error") {
        return "ERROR!"
    }

    let products = productsData[collectionName]
    const keys = getKeys(collectionName)
    const path = useRouter().asPath
    return(
        <div className="catalog">
            <div className="catalog__container container">
                <div className="catalog__dscr">
                    <div className={"catalog__name"}>
                        <div className="catalog__title">{title}</div>
                        {path !== "/" ?
                            <div className={"catalog__goods-count"}>56 товаров</div>
                            : undefined}
                    </div>
                    {path !== "/" ? <Sorting/> : undefined}
                </div>
                <div className="catalog__grid">
                    {
                        products.map((item) =>
                            <ProductCard collectionName={collectionName} key={item.id} productData={item} keys={keys} className={"catalog__item"}/>
                        )
                    }
                </div>
            </div>
        </div>
    )


}