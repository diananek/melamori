import Offers from "./Offers";
import Catalog from "./Catalog";
import MainLayout from "./MainLayout";

export default function CatalogPage({title, collectionName, data, status}) {
    return (
        <MainLayout>
            <div className="container">
                <div className={"page__name"}>
                    <h1 className={"page__title"}>{title}</h1>
                    <div className={"page__goods-count"}>56 товаров</div>
                </div>
            </div>
            <Offers/>
            <Catalog productsData={data} status={status}
                     collectionName={collectionName} title={title}/>
        </MainLayout>
    )
}