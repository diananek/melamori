import Offers from "./Offers";
import Catalog from "./Catalog";
import MainLayout from "./MainLayout";

export default function CatalogPage({title, collectionName, data, status, onLoadMore}) {
    return (
        <MainLayout>
            <div className="container">
                <div className={"page__name"}>
                    <h1 className={"page__title"}>{title}</h1>
                    <div className={"page__goods-count"}>56 товаров</div>
                </div>
            </div>
            <Offers/>
            <button style={{width: '60px', height: '30px', backgroundColor: 'tomato'}} onClick={()=> onLoadMore()}>Click</button>
            <Catalog productsData={data} status={status}
                     collectionName={collectionName} title={title} onLoadMore={onLoadMore}/>
        </MainLayout>
    )
}