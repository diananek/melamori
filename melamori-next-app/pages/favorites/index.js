import MainLayout from "../../components/MainLayout";
import ProductCard from "../../components/ProductCard";
import {useAppContext} from "../../context/state";
import {getKeys} from "../../lib/getKeys";

export default function FavoritesPage() {
    const ctx = useAppContext()
    const cookies = ctx.cookieFav
    const favoritesCount = cookies.length

    return(
        <MainLayout title={'Избранное'}>
            <div className="container">
                <div className={"page__name page__name_actions"}>
                    <h1 className={"page__title"}>Избранное</h1>
                    <div className={"page__goods-count"}>{favoritesCount} товаров</div>
                </div>
            </div>
            <div className="catalog">
                <div className="catalog__container container">
                    <div className="catalog__grid catalog__grid_actions">
                        {
                            cookies.map((item) =>
                                <ProductCard collectionName={item["__typename"]} key={item.id}
                                             productData={item} keys={getKeys(item["__typename"])} className={"catalog__item"}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}